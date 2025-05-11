'use client';

import React, { useEffect, useState } from "react";
import { generateUUID } from "@/lib/utils";
import { Messages } from "./messages";
import type { Attachment, UIMessage } from 'ai';
import { useChat } from '@ai-sdk/react';
import { toast } from "sonner";
import useSWR, { useSWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';
import { useAutoResume } from "@/hooks/use-auto-resume";
import { InputBox } from "./input-box";
import { ChatHeader } from "./chat-header";
import { getChatHistoryPaginationKey } from '@/components/sidebar/nav-main';
import { Model } from "@/lib/ai/models";
import { AvailableProviders } from "@/lib/ai/types";
export interface InitialModelData {
    serverModelList: Array<Model>;
    serverAvailableProviders: AvailableProviders;
    defaultModel: Model;
}

export function ChatContainer({
    id,
    title = "chat",
    initialMessages = [],
    initialModelData,
    isLoading = false,
    className,
    autoResume = true,
}: {
    id: string;
    title?: string;
    initialMessages: Array<UIMessage>;
    initialModelData: InitialModelData;
    isLoading?: boolean;
    className?: string;
    autoResume?: boolean;
}) {
    const { mutate } = useSWRConfig();

    const [selectedModel, setSelectedModel] = useState<Model>(() => {
        if (typeof document !== 'undefined') {
            const cookieModelId = document.cookie
                .split('; ')
                .find(row => row.startsWith('chat-model='))
                ?.split('=')[1];

            if (cookieModelId) {
                const savedModel = initialModelData.serverModelList.find(
                    model => model.id === cookieModelId
                );

                if (savedModel) {
                    return savedModel;
                }
            }
        }

        return initialModelData.defaultModel;
    });

    const {
        messages,
        setMessages,
        handleSubmit,
        input,
        setInput,
        append,
        status,
        stop,
        reload,
        experimental_resume,
        data,
    } = useChat({
        id,
        initialMessages,
        experimental_throttle: 100,
        sendExtraMessageFields: true,
        generateId: generateUUID,
        experimental_prepareRequestBody: (body) => {
            const lastMessage = body.messages.at(-1);
            const textContent = lastMessage?.parts
                ?.filter(part => part.type === 'text')
                .map(part => part.text)
                .join('\n') || '';

            return {
                id,
                message: {
                    ...lastMessage,
                    content: textContent,
                    createdAt: lastMessage?.createdAt || new Date(),
                },
                selectedChatModel: {
                    ...selectedModel,
                    isReasoning: selectedModel.isReasoning ?? false,
                    isVision: selectedModel.isVision ?? false,
                },
            };
        },
        onFinish: () => {
            mutate(unstable_serialize(getChatHistoryPaginationKey));
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const [attachments, setAttachments] = useState<Array<Attachment>>([]);

    useAutoResume({
        autoResume,
        initialMessages,
        experimental_resume,
        data,
        setMessages,
    });

    return (
        <>
            <div className="flex flex-col min-w-0 h-dvh bg-background">
                <ChatHeader
                    selectedModel={selectedModel}
                    initModelData={initialModelData}
                    setSelectedModel={setSelectedModel}
                />

                <Messages
                    chatId={id}
                    status={status}
                    messages={messages}
                    setMessages={setMessages}
                    reload={reload}
                    isReadonly={false}
                />

                <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
                    <InputBox
                        chatId={id}
                        input={input}
                        setInput={setInput}
                        handleSubmit={handleSubmit}
                        status={status}
                        stop={stop}
                        attachments={attachments}
                        setAttachments={setAttachments}
                        messages={messages}
                        setMessages={setMessages}
                        append={append}
                    />
                </form>
            </div>
        </>
    );
} 