import { Button } from "./ui/button";

import { PencilSquareIcon, SidebarLeftIcon } from "@/components/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useRouter } from "next/navigation";
import { useSidebar } from "./ui/sidebar";
export function NewChatButton() {
    const router = useRouter();
    const { setOpenMobile } = useSidebar();
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    data-testid="new-chat-button"
                    onClick={() => {
                        router.push('/');
                        router.refresh();
                        setOpenMobile(false);
                    }}
                    variant="ghost"
                    className="md:px-2 md:h-fit"
                >
                    <PencilSquareIcon size={16} />
                </Button>
            </TooltipTrigger>
            <TooltipContent align="start">New Chat</TooltipContent>
        </Tooltip>
    )
}