import { NextResponse } from 'next/server';
import { getAvailableProviders } from '@/app/chat/models-setup';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const dynamic = 'force-dynamic';

const app = new Hono().basePath('/api/providers');

app.get('/', async (c) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        return c.json({ error: "Unauthorized access" }, 401);
    }

    try {
        const result = await getAvailableProviders();

        return c.json(result);
    } catch (error) {
        return c.json(
            { error: "Failed to fetch providers" },
            500
        );
    }
})

export const GET = handle(app); 