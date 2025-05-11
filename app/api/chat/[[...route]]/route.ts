import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import {
    appendClientMessage,
    appendResponseMessages,
    createDataStream,
    smoothStream,
    streamText,
} from 'ai';
import { type RequestHints, systemPrompt } from '@/lib/ai/prompts';
import {
    deleteChatById,
    getChatById,
    getMessagesByChatId,
    saveChat,
    saveMessages,
    createStreamId,
    getStreamIdsByChatId,
} from '@/database/queries';
import { generateUUID, getTrailingMessageId } from '@/lib/utils';
import { generateTitleFromUserMessage } from '@/app/chat/actions';
import { openai } from '@/lib/ai/providers';
import { postRequestBodySchema, type PostRequestBody } from './schema';
import { isProductionEnvironment } from '@/lib/constants';
import { geolocation } from '@vercel/functions';
import { after } from 'next/server';
import {
    createResumableStreamContext,
    type ResumableStreamContext,
} from 'resumable-stream';
import type { Chat } from '@/database/schema';
import { differenceInSeconds } from 'date-fns';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { ProviderType } from '@/lib/ai/types';
import { ollama } from 'ollama-ai-provider';

const app = new Hono().basePath('/api/chat')
let globalStreamContext: ResumableStreamContext | null = null;

function getStreamContext() {
    if (!globalStreamContext) {
        try {
            globalStreamContext = createResumableStreamContext({
                waitUntil: after,
            });
        } catch (error: any) {
            if (error.message.includes('REDIS_URL')) {
                console.log(
                    ' > Resumable streams are disabled due to missing REDIS_URL',
                );
            } else {
                console.error(error);
            }
        }
    }

    return globalStreamContext;
}

function handleStream(stream: ReadableStream | null, status = 200) {
    return new Response(stream, { status });
}

app.post('/', async (c) => {
    let requestBody: PostRequestBody;

    try {
        const json = await c.req.json();
        requestBody = postRequestBodySchema.parse(json);
    } catch (_) {
        return c.json({ error: 'Invalid request format' }, 400);
    }

    try {
        const { id, message, selectedChatModel } = requestBody;
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user) {
            return c.text('Unauthorized', 401);
        }

        const chat = await getChatById({ id });

        if (!chat) {
            const title = await generateTitleFromUserMessage({
                message,
            });

            await saveChat({
                id,
                userId: session.user.id,
                title,
            });
        } else {
            if (chat.userId !== session.user.id) {
                return c.text('Forbidden', 403);
            }
        }

        const previousMessages = await getMessagesByChatId({ id });

        const messages = appendClientMessage({
            // @ts-expect-error: todo add type conversion from DBMessage[] to UIMessage[]
            messages: previousMessages,
            message,
        });

        const { longitude, latitude, city, country } = geolocation(c.req.raw);

        const requestHints: RequestHints = {
            longitude,
            latitude,
            city,
            country,
        };

        await saveMessages({
            messages: [
                {
                    chatId: id,
                    id: message.id,
                    role: 'user',
                    parts: message.parts,
                    attachments: message.experimental_attachments ?? [],
                    createdAt: new Date(),
                },
            ],
        });

        const streamId = generateUUID();
        await createStreamId({ streamId, chatId: id });

        const stream = createDataStream({
            execute: (dataStream) => {
                const result = streamText({
                    model: selectedChatModel.provider === ProviderType.OLLAMA ? ollama(selectedChatModel.id) : openai.languageModel(selectedChatModel.id),
                    system: systemPrompt({ selectedChatModel, requestHints }),
                    messages,
                    maxSteps: 5,
                    // experimental_activeTools: [
                    //     'getWeather',
                    // ],
                    experimental_transform: smoothStream({ chunking: 'word' }),
                    experimental_generateMessageId: generateUUID,
                    // tools: {
                    //     getWeather,
                    // },
                    onFinish: async ({ response }) => {
                        if (session?.user?.id) {
                            try {
                                const assistantId = getTrailingMessageId({
                                    messages: response.messages.filter(
                                        (message) => message.role === 'assistant',
                                    ),
                                });

                                if (!assistantId) {
                                    throw new Error('No assistant message found!');
                                }

                                const [, assistantMessage] = appendResponseMessages({
                                    messages: [message],
                                    responseMessages: response.messages,
                                });

                                await saveMessages({
                                    messages: [
                                        {
                                            id: assistantId,
                                            chatId: id,
                                            role: assistantMessage.role,
                                            parts: assistantMessage.parts,
                                            attachments:
                                                assistantMessage.experimental_attachments ?? [],
                                            createdAt: new Date(),
                                        },
                                    ],
                                });
                            } catch (error) {
                                console.error('Failed to save chat', error);
                            }
                        }
                    },
                    experimental_telemetry: {
                        isEnabled: isProductionEnvironment,
                        functionId: 'stream-text',
                    },
                });

                result.consumeStream();

                result.mergeIntoDataStream(dataStream, {
                    sendReasoning: true,
                });
            },
            onError: (error: any) => {
                console.error('Stream error:', error);
                return 'Oops, an error occurred!';
            },
        });

        const streamContext = getStreamContext();

        if (streamContext) {
            return new Response(
                await streamContext.resumableStream(streamId, () => stream),
            );
        } else {
            return new Response(stream);
        }
    } catch (error) {
        console.error('Error processing chat request:', error);
        return c.json({ error: 'An error occurred while processing your request' }, 500);
    }
});

app.get('/', async (c) => {
    const streamContext = getStreamContext();
    const resumeRequestedAt = new Date();

    if (!streamContext) {
        return new Response(null, { status: 204 });
    }

    const { searchParams } = new URL(c.req.url);
    const chatId = searchParams.get('chatId');

    if (!chatId) {
        return c.json({ error: 'chatId is required' }, 400);
    }

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        return c.text('Unauthorized', 401);
    }

    let chat: Chat;

    try {
        chat = await getChatById({ id: chatId });
    } catch (error) {
        return c.json({ error: 'Not found' }, 404);
    }

    if (!chat) {
        return c.json({ error: 'Not found' }, 404);
    }

    const streamIds = await getStreamIdsByChatId({ chatId });

    if (!streamIds.length) {
        return c.text('No streams found', 404);
    }

    const recentStreamId = streamIds.at(-1);

    if (!recentStreamId) {
        return c.text('No recent stream found', 404);
    }

    const emptyDataStream = createDataStream({
        execute: () => { },
    });

    try {
        const stream = await streamContext.resumableStream(
            recentStreamId,
            () => emptyDataStream,
        );

        if (!stream) {
            const messages = await getMessagesByChatId({ id: chatId });
            const mostRecentMessage = messages.at(-1);

            if (!mostRecentMessage) {
                return handleStream(emptyDataStream);
            }

            if (mostRecentMessage.role !== 'assistant') {
                return handleStream(emptyDataStream);
            }

            const messageCreatedAt = new Date(mostRecentMessage.createdAt);

            if (differenceInSeconds(resumeRequestedAt, messageCreatedAt) > 15) {
                return handleStream(emptyDataStream);
            }

            const restoredStream = createDataStream({
                execute: (buffer) => {
                    buffer.writeData({
                        type: 'append-message',
                        message: JSON.stringify(mostRecentMessage),
                    });
                },
            });

            return handleStream(restoredStream);
        }

        return handleStream(emptyDataStream);
    } catch (error) {
        console.error('Error resuming stream:', error);
        return c.json({ error: 'An error occurred while processing the stream' }, 500);
    }
});

app.delete('/:id', async (c) => {
    const id = c.req.param('id');

    if (!id) {
        return c.json({ error: 'Not found' }, 404);
    }

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        return c.text('Unauthorized', 401);
    }

    try {
        const chat = await getChatById({ id });

        if (chat.userId !== session.user.id) {
            return c.text('Forbidden', 403);
        }

        const deletedChat = await deleteChatById({ id });

        return c.json(deletedChat, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'An error occurred while processing your request' }, 500);
    }
});

export const GET = handle(app)
export const POST = handle(app)
export const DELETE = handle(app); 