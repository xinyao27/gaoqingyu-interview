import { cookies, headers } from 'next/headers';
import { ChatContainer } from "@/components/chat/chat-container";
import { DEFAULT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { getModelList, getAvailableProviders } from './models-setup';
import { RedirectToSignIn } from '@daveyplate/better-auth-ui';

export default async function Page() {
    const id = generateUUID();

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
                    initialMessages={[]}
                    initialModelData={{
                        serverModelList: modelList,
                        serverAvailableProviders: availableProviders,
                        defaultModel: DEFAULT_MODEL
                    }}
                    autoResume={false}
                />
            </>
        );
    }

    return (
        <>
            <RedirectToSignIn />
            <ChatContainer
                key={id}
                id={id}
                initialMessages={[]}
                initialModelData={{
                    serverModelList: modelList,
                    serverAvailableProviders: availableProviders,
                    defaultModel: DEFAULT_MODEL
                }}
                autoResume={false}
            />
        </>
    );
}
