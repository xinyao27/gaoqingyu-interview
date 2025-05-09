"use client"

import * as React from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModelSelector } from "./model-selector"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { memo } from "react"

interface ChatHeaderProps {
    className?: string
    selectedModel: string
    onModelChange: (model: string) => void
}

function PureChatHeader({
    className,
    selectedModel,
    onModelChange,
}: ChatHeaderProps) {
    const router = useRouter();
    return (
        <header
            className={cn(
                "sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 px-4 py-2 backdrop-blur-sm",
                className
            )}
        >
            <div className="flex-1">
                <ModelSelector
                    selectedModel={selectedModel}
                    onModelChange={onModelChange}
                />
            </div>
            <div>
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-2 flex items-center gap-1.5"
                    onClick={() => {
                        router.push('/');
                        router.refresh();
                    }}
                >
                    <PlusIcon size={16} />
                    <span>New Chat</span>
                </Button>
            </div>
        </header>
    )
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
    return prevProps.selectedModel === nextProps.selectedModel;
});

