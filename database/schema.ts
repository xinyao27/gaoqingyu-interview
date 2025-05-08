import { users } from "@/auth-schema";
import { InferSelectModel } from "drizzle-orm";
import {
    pgTable,
    varchar,
    timestamp,
    json,
    uuid,
    text,
    primaryKey,
    foreignKey,
    boolean,
} from "drizzle-orm/pg-core";

export * from "@/auth-schema"

export const chat = pgTable('Chat', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    createdAt: timestamp('createdAt').notNull(),
    title: text('title').notNull(),
    userId: uuid('userId')
        .notNull()
        .references(() => users.id),
    visibility: varchar('visibility', { enum: ['public', 'private'] })
        .notNull()
        .default('private'),
});

export type Chat = InferSelectModel<typeof chat>;

export const message = pgTable('Message', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    chatId: uuid('chatId')
        .notNull()
        .references(() => chat.id),
    role: varchar('role').notNull(),
    parts: json('parts').notNull(),
    attachments: json('attachments').notNull(),
    createdAt: timestamp('createdAt').notNull(),
});

export type DBMessage = InferSelectModel<typeof message>;

export const stream = pgTable(
    'Stream',
    {
        id: uuid('id').notNull().defaultRandom(),
        chatId: uuid('chatId').notNull(),
        createdAt: timestamp('createdAt').notNull(),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.id] }),
        chatRef: foreignKey({
            columns: [table.chatId],
            foreignColumns: [chat.id],
        }),
    }),
);

export type Stream = InferSelectModel<typeof stream>;
