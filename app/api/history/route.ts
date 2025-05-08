import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { db } from '@/database/queries';
import { chat } from '@/database/schema';
import { desc, lt, eq } from 'drizzle-orm';

const app = new Hono().basePath('/api/history');

app.get('/', async (c) => {
    try {
        const { searchParams } = new URL(c.req.url);
        const limit = parseInt(searchParams.get('limit') || '20', 10);
        const endingBefore = searchParams.get('ending_before');

        let chats;

        if (endingBefore) {
            const targetChats = await db
                .select()
                .from(chat)
                .where(eq(chat.id, endingBefore));

            const targetChat = targetChats[0];

            if (targetChat) {
                chats = await db
                    .select()
                    .from(chat)
                    .where(lt(chat.createdAt, targetChat.createdAt))
                    .orderBy(desc(chat.createdAt))
                    .limit(limit + 1);
            } else {
                chats = await db
                    .select()
                    .from(chat)
                    .orderBy(desc(chat.createdAt))
                    .limit(limit + 1);
            }
        } else {
            chats = await db
                .select()
                .from(chat)
                .orderBy(desc(chat.createdAt))
                .limit(limit + 1);
        }

        const hasMore = chats.length > limit;

        if (hasMore) {
            chats.pop(); // Remove the extra record
        }

        return c.json({
            chats,
            hasMore,
        });
    } catch (error) {
        console.error('Error while fetching chat history:', error);
        return c.json({ error: 'An error occurred while fetching chat history' }, 500);
    }
});

export const GET = handle(app); 