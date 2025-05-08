import 'server-only';

import {
    and,
    asc,
    count,
    desc,
    eq,
    gt,
    gte,
    inArray,
    lt,
    type SQL,
} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import {
    chat,
    message,
    type DBMessage,
    type Chat,
    stream,
} from './schema';

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
export const db = drizzle(client);

export async function saveChat({
    id,
    userId,
    title,
}: {
    id: string;
    userId: string;
    title: string;
}) {
    try {
        return await db.insert(chat).values({
            id,
            createdAt: new Date(),
            userId,
            title,
        });
    } catch (error) {
        console.error('Failed to save chat in database');
        throw error;
    }
}

export async function deleteChatById({ id }: { id: string }) {
    try {
        await db.delete(message).where(eq(message.chatId, id));
        await db.delete(stream).where(eq(stream.chatId, id));

        const [chatsDeleted] = await db
            .delete(chat)
            .where(eq(chat.id, id))
            .returning();
        return chatsDeleted;
    } catch (error) {
        console.error('Failed to delete chat by id from database');
        throw error;
    }
}

export async function getChatsByUserId({
    id,
    limit,
    startingAfter,
    endingBefore,
}: {
    id: string;
    limit: number;
    startingAfter: string | null;
    endingBefore: string | null;
}) {
    try {
        const extendedLimit = limit + 1;

        const query = (whereCondition?: SQL<any>) =>
            db
                .select()
                .from(chat)
                .where(
                    whereCondition
                        ? and(whereCondition, eq(chat.userId, id))
                        : eq(chat.userId, id),
                )
                .orderBy(desc(chat.createdAt))
                .limit(extendedLimit);

        let filteredChats: Array<Chat> = [];

        if (startingAfter) {
            const [selectedChat] = await db
                .select()
                .from(chat)
                .where(eq(chat.id, startingAfter))
                .limit(1);

            if (!selectedChat) {
                throw new Error(`Chat with id ${startingAfter} not found`);
            }

            filteredChats = await query(gt(chat.createdAt, selectedChat.createdAt));
        } else if (endingBefore) {
            const [selectedChat] = await db
                .select()
                .from(chat)
                .where(eq(chat.id, endingBefore))
                .limit(1);

            if (!selectedChat) {
                throw new Error(`Chat with id ${endingBefore} not found`);
            }

            filteredChats = await query(lt(chat.createdAt, selectedChat.createdAt));
        } else {
            filteredChats = await query();
        }

        const hasMore = filteredChats.length > limit;

        return {
            chats: hasMore ? filteredChats.slice(0, limit) : filteredChats,
            hasMore,
        };
    } catch (error) {
        console.error('Failed to get chats by user from database');
        throw error;
    }
}

export async function getChatById({ id }: { id: string }) {
    try {
        const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
        return selectedChat;
    } catch (error) {
        console.error('Failed to get chat by id from database');
        throw error;
    }
}

export async function saveMessages({
    messages,
}: {
    messages: Array<DBMessage>;
}) {
    try {
        return await db.insert(message).values(messages);
    } catch (error) {
        console.error('Failed to save messages in database', error);
        throw error;
    }
}

export async function getMessagesByChatId({ id }: { id: string }) {
    try {
        return await db
            .select()
            .from(message)
            .where(eq(message.chatId, id))
            .orderBy(asc(message.createdAt));
    } catch (error) {
        console.error('Failed to get messages by chat id from database', error);
        throw error;
    }
}

export async function getMessageById({ id }: { id: string }) {
    try {
        return await db.select().from(message).where(eq(message.id, id));
    } catch (error) {
        console.error('Failed to get message by id from database');
        throw error;
    }
}

export async function deleteMessagesByChatIdAfterTimestamp({
    chatId,
    timestamp,
}: {
    chatId: string;
    timestamp: Date;
}) {
    try {
        const messagesToDelete = await db
            .select({ id: message.id })
            .from(message)
            .where(
                and(eq(message.chatId, chatId), gte(message.createdAt, timestamp)),
            );

        const messageIds = messagesToDelete.map((message) => message.id);

        if (messageIds.length > 0) {
            return await db
                .delete(message)
                .where(
                    and(eq(message.chatId, chatId), inArray(message.id, messageIds)),
                );
        }
    } catch (error) {
        console.error(
            'Failed to delete messages by id after timestamp from database',
        );
        throw error;
    }
}

export async function createStreamId({
    streamId,
    chatId,
}: {
    streamId: string;
    chatId: string;
}) {
    try {
        await db
            .insert(stream)
            .values({ id: streamId, chatId, createdAt: new Date() });
    } catch (error) {
        console.error('Failed to create stream id in database');
        throw error;
    }
}

export async function getStreamIdsByChatId({ chatId }: { chatId: string }) {
    try {
        const streamIds = await db
            .select({ id: stream.id })
            .from(stream)
            .where(eq(stream.chatId, chatId))
            .orderBy(asc(stream.createdAt))
            .execute();

        return streamIds.map(({ id }) => id);
    } catch (error) {
        console.error('Failed to get stream ids by chat id from database');
        throw error;
    }
}
