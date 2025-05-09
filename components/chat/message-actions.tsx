import type { Message } from 'ai';
import { useSWRConfig } from 'swr';
import { useCopyToClipboard } from 'usehooks-ts';

import { CopyIcon } from '../icons';
import { Button } from '../ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';
import { memo } from 'react';
import { toast } from 'sonner';

export function PureMessageActions({
    chatId,
    message,
    isLoading,
}: {
    chatId: string;
    message: Message;
    isLoading: boolean;
}) {
    const { mutate } = useSWRConfig();
    const [_, copyToClipboard] = useCopyToClipboard();

    if (isLoading) return null;
    if (message.role === 'user') return null;

    return (
        <TooltipProvider delayDuration={0}>
            <div className="flex flex-row gap-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="py-1 px-2 h-fit text-muted-foreground"
                            variant="outline"
                            onClick={async () => {
                                const textFromParts = message.parts
                                    ?.filter((part) => part.type === 'text')
                                    .map((part) => part.text)
                                    .join('\n')
                                    .trim();

                                if (!textFromParts) {
                                    toast.error("没有可复制的文本！");
                                    return;
                                }

                                await copyToClipboard(textFromParts);
                                toast.success('已复制到剪贴板！');
                            }}
                        >
                            <CopyIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>复制</TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
}

export const MessageActions = memo(
    PureMessageActions,
    (prevProps, nextProps) => {
        if (prevProps.isLoading !== nextProps.isLoading) return false;

        return true;
    },
); 