"use client"

import * as React from "react"
import {
    AudioWaveform,
    Blocks,
    Calendar,
    Command,
    Home,
    Inbox,
    MessageCircleQuestion,
    PlusIcon,
    Search,
    Settings2,
    Sparkles,
    Trash2,
} from "lucide-react"
import NextLink from "next/link"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavSecondary } from "./nav-secondary"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarMenu,
    useSidebar,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { TooltipContent } from "@radix-ui/react-tooltip"
import { Tooltip } from "@radix-ui/react-tooltip"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { SidebarToggleButton } from "../sidebar-toggle-button"
import { NewChatButton } from "../new-chat-button"
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { setOpenMobile } = useSidebar();

    return (
        <Sidebar className="group-[data-side=left]:border-r-0" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <div className="flex flex-row justify-between items-center">
                        <NextLink
                            href="/"
                            onClick={() => {
                                setOpenMobile(false);
                            }}
                            className="flex flex-row gap-3 items-center"
                        >
                            <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
                                Chatbot
                            </span>
                        </NextLink>
                        <div className="flex flex-row gap-2">
                            <SidebarToggleButton />
                            <NewChatButton />
                        </div>
                    </div>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain />
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter>
            </SidebarFooter>
        </Sidebar>
    )
}
