import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { put } from '@vercel/blob';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// Use Blob instead of File since File is not available in Node.js environment
const FileSchema = z.object({
    file: z
        .instanceof(Blob)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: 'File size should be less than 5MB',
        })
        // Update the file type based on the kind of files you want to accept
        .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
            message: 'File type should be JPEG or PNG',
        }),
});

const app = new Hono().basePath('/api/files/upload');

app.post('/', async (c) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return c.json({ error: 'Unauthorized' }, 401);
        }

        const formData = await c.req.raw.formData();
        const file = formData.get('file') as Blob;

        if (!file) {
            return c.json({ error: 'No file uploaded' }, 400);
        }

        const validatedFile = FileSchema.safeParse({ file });

        if (!validatedFile.success) {
            const errorMessage = validatedFile.error.errors
                .map((error) => error.message)
                .join(', ');

            return c.json({ error: errorMessage }, 400);
        }

        // Get filename from formData since Blob doesn't have name property
        const filename = (formData.get('file') as File).name;
        const fileBuffer = await file.arrayBuffer();

        try {
            const data = await put(`${filename}`, fileBuffer, {
                access: 'public',
            });

            return c.json(data);
        } catch (error) {
            return c.json({ error: 'Upload failed' }, 500);
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return c.json(
            { error: 'Failed to process request' },
            500
        );
    }
});

export const POST = handle(app);
