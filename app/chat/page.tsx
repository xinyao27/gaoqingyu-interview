import React from "react";
import { ChatContainer } from "@/components/chat/chat-container";

import { cookies } from "next/headers";
import { generateUUID } from "@/lib/utils";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { RedirectToSignIn } from "@daveyplate/better-auth-ui";

export default async function Page() {
    const id = generateUUID();

    const cookieStore = await cookies();
    const modelIdFromCookie = cookieStore.get('chat-model');

    if (!modelIdFromCookie) {
        return (
            <>
                <RedirectToSignIn />
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
            <RedirectToSignIn />
            <ChatContainer
                id={id}
                initialMessages={[]}
                initialChatModel={modelIdFromCookie.value}
                autoResume={true}
            />
        </>
    );
} 