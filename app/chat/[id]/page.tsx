import React from "react";
import { ChatContainer } from "@/components/chat/chat-container";
import { notFound, redirect } from 'next/navigation';

import { cookies } from "next/headers";
import { generateUUID } from "@/lib/utils";
import { DEFAULT_MODEL, Model } from "@/lib/ai/models";
import { RedirectToSignIn } from "@daveyplate/better-auth-ui";
import { getModelList, getAvailableProviders } from "../models-setup";
import { getChatById, getMessagesByChatId } from '@/database/queries'
import { DBMessage } from '@/database/schema'
import type { Attachment, UIMessage } from 'ai';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
    const chat = await getChatById({ id });

    if (!chat) {
        notFound();
    }

    const messagesFromDb = await getMessagesByChatId({
        id,
    });

    function convertToUIMessages(messages: Array<DBMessage>): Array<UIMessage> {
        return messages.map((message) => ({
            id: message.id,
            parts: message.parts as UIMessage['parts'],
            role: message.role as UIMessage['role'],
            // Note: content will soon be deprecated in @ai-sdk/react
            content: '',
            createdAt: message.createdAt,
            experimental_attachments:
                (message.attachments as Array<Attachment>) ?? [],
        }));
    }

    const cookieStore = await cookies();
    const modelIdFromCookie = cookieStore.get('chat-model');

    const modelList = await getModelList();
    const availableProviders = await getAvailableProviders();

    if (!modelIdFromCookie) {
        return (
            <>
                <RedirectToSignIn />
                <ChatContainer
                    key={id}
                    id={id}
                    initialMessages={convertToUIMessages(messagesFromDb)}
                    initialModelData={{
                        serverModelList: modelList,
                        serverAvailableProviders: availableProviders,
                        defaultModel: DEFAULT_MODEL
                    }}
                    autoResume={true}
                />
            </>
        );
    }

    return (
        <>
            <RedirectToSignIn />
            <ChatContainer
                id={id}
                initialMessages={convertToUIMessages(messagesFromDb)}
                initialModelData={{
                    serverModelList: modelList,
                    serverAvailableProviders: availableProviders,
                    defaultModel: modelList.find(model => model.id === modelIdFromCookie.value) as Model
                }}
                autoResume={true}
            />
        </>
    );
} 