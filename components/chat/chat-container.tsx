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
// import { getChatHistoryPaginationKey } from '@/lib/utils';

export function ChatContainer({
    id,
    title = "chat",
    initialMessages = [],
    initialChatModel,
    isLoading = false,
    className,
    autoResume,
}: {
    id: string;
    title?: string;
    initialMessages: Array<UIMessage>;
    initialChatModel: string;
    isLoading?: boolean;
    className?: string;
    autoResume?: boolean;
}) {
    const { mutate } = useSWRConfig();

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
        experimental_prepareRequestBody: (body) => ({
            id,
            message: body.messages.at(-1),
            selectedChatModel: initialChatModel,
        }),
        onFinish: () => {
            // mutate(unstable_serialize(getChatHistoryPaginationKey));
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        if (autoResume) {
            experimental_resume();
        }

        // note: this hook has no dependencies since it only needs to run once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [attachments, setAttachments] = useState<Array<Attachment>>([]);

    useAutoResume({
        autoResume: !!autoResume,
        initialMessages,
        experimental_resume,
        data,
        setMessages,
    });

    function setSelectedModel(model: string): void {
        // setInitialChatModel(model);
    }

    return (
        <>
            <div className="flex flex-col min-w-0 h-dvh bg-background">
                <ChatHeader
                    selectedModel={initialChatModel}
                    onModelChange={setSelectedModel}
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