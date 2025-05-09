import React from "react";
import { ChatContainer } from "@/components/chat/chat-container";

import { cookies } from "next/headers";
import { generateUUID } from "@/lib/utils";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";

export default async function ChatDemo() {
    const id = generateUUID();

    const cookieStore = await cookies();
    const modelIdFromCookie = cookieStore.get('chat-model');

    // 模拟发送消息
    const handleSendMessage = async (message: string) => {
        // 在实际应用中，这里会调用API发送消息
        console.log("发送消息:", message);

        // 模拟延迟响应
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    };

    if (!modelIdFromCookie) {
        return (
            <>
                <ChatContainer
                    key={id}
                    id={id}
                    initialMessages={[]}
                    initialChatModel={DEFAULT_CHAT_MODEL}
                    autoResume={false}
                />
            </>
        );
    }

    return (
        <>
            <ChatContainer
                id={id}
                initialMessages={[]}
                initialChatModel={modelIdFromCookie.value}
                autoResume={true}
            />
        </>
    );
} 