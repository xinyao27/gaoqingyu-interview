'use server';

import { generateText } from "ai";

import { cookies } from 'next/headers';
import { myProvider } from "@/lib/ai/providers";
import { UIMessage } from "ai";

import { deleteMessagesByChatIdAfterTimestamp, getMessageById } from '@/database/queries';

export async function saveChatModelAsCookie(model: string) {
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'chat-model',
        value: model,
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1年
        httpOnly: false, // 允许JavaScript访问
        sameSite: 'strict'
    });
}

export async function generateTitleFromUserMessage({
    message,
}: {
    message: UIMessage;
}) {
    // const { text: title } = await generateText({
    //     model: myProvider.languageModel('title-model'),
    //     system: `\n
    //   - you will generate a short title based on the first message a user begins a conversation with
    //   - ensure it is not more than 80 characters long
    //   - the title should be a summary of the user's message
    //   - do not use quotes or colons`,
    //     prompt: JSON.stringify(message),
    // });

    return 'new chat';
}

export async function deleteTrailingMessages({ id }: { id: string }) {
    const [message] = await getMessageById({ id });

    await deleteMessagesByChatIdAfterTimestamp({
        chatId: message.chatId,
        timestamp: message.createdAt,
    });
}