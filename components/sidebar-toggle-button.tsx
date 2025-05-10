import { SidebarLeftIcon } from "@/components/icons";
import { useSidebar } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

export function SidebarToggleButton() {
    const { toggleSidebar } = useSidebar();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    data-testid="sidebar-toggle-button"
                    onClick={toggleSidebar}
                    variant="ghost"
                    className="md:px-2 md:h-fit"
                >
                    <SidebarLeftIcon size={16} />
                </Button>
            </TooltipTrigger>
            <TooltipContent align="start">Toggle Sidebar</TooltipContent>
        </Tooltip>
    )
}