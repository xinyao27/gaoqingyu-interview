"use client"

import * as React from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModelSelector } from "./model-selector"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { memo } from "react"
import { UserButton } from "@daveyplate/better-auth-ui"
import { ModeToggle } from "../mode-toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useWindowSize } from "usehooks-ts"
import { PencilSquareIcon } from "../icons"
import { SidebarToggleButton } from "../sidebar-toggle-button"
import { useSidebar } from "../ui/sidebar"
import { NewChatButton } from "../new-chat-button"
import { Model } from "@/lib/ai/models"
import { InitialModelData } from "./chat-container"

interface ChatHeaderProps {
    className?: string
    selectedModel: Model
    setSelectedModel: (model: Model) => void
    initModelData: InitialModelData
}

function PureChatHeader({
    className,
    selectedModel,
    setSelectedModel,
    initModelData,
}: ChatHeaderProps) {

    const { width: windowWidth } = useWindowSize();
    const { open } = useSidebar();

    return (
        <header
            className={cn(
                "sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 px-4 py-2 backdrop-blur-sm",
                className
            )}
        >

            <div className="flex-1 flex items-center gap-2">
                {(!open || windowWidth < 768) && (
                    <>
                        <SidebarToggleButton />
                        <NewChatButton />
                    </>
                )}
                <ModelSelector
                    selectedModel={selectedModel}
                    initModelData={initModelData}
                    setSelectedModel={setSelectedModel}
                />
            </div>
            <div className="flex items-center gap-2">
                <ModeToggle />
                <UserButton />
            </div>
        </header>
    )
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
    return prevProps.selectedModel === nextProps.selectedModel;
});

