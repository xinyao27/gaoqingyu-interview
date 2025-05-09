"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { saveChatModelAsCookie } from "@/app/chat/actions"

export type ModelOption = {
    value: string
    label: string
    category: "anthropic" | "deepseek" | "ollama"
    isVision?: boolean
}

// 模型列表
const modelOptions: ModelOption[] = [
    {
        value: "claude-3.7-sonnet",
        label: "Claude 3.7 Sonnet",
        category: "anthropic",
        isVision: true
    },
    {
        value: "claude-3.7-sonnet-thinking",
        label: "Claude 3.7 Sonnet Thinking",
        category: "anthropic",
    },
    {
        value: "claude-3.5-sonnet",
        label: "Claude 3.5 Sonnet",
        category: "anthropic",
        isVision: true
    },
    {
        value: "claude-3.5-haiku",
        label: "Claude 3.5 Haiku",
        category: "anthropic",
        isVision: true
    },
    {
        value: "claude-3-haiku",
        label: "Claude 3 Haiku",
        category: "anthropic",
        isVision: true
    },
    {
        value: "deepseek-chat",
        label: "DeepSeek Chat",
        category: "deepseek",
    },
    {
        value: "deepseek-reasoner",
        label: "DeepSeek Reasoner",
        category: "deepseek",
    },
    {
        value: "llama3.2:latest",
        label: "llama3.2:latest",
        category: "ollama",
    },
    {
        value: "nomic-embed-text:latest",
        label: "nomic-embed-text:latest",
        category: "ollama",
    },
    {
        value: "qwen2:latest",
        label: "qwen2:latest",
        category: "ollama",
    },
    {
        value: "qwen2.5-coder:14b",
        label: "qwen2.5-coder:14b",
        category: "ollama",
    },
    {
        value: "qwen2.5-coder:32b",
        label: "qwen2.5-coder:32b",
        category: "ollama",
    },
    {
        value: "qwen2m:latest",
        label: "qwen2m:latest",
        category: "ollama",
    },
    {
        value: "qwq:32b",
        label: "qwq:32b",
        category: "ollama",
    },
    {
        value: "qwq:latest",
        label: "qwq:latest",
        category: "ollama",
    },
]

interface ModelSelectorProps {
    selectedModel: string
    onModelChange: (model: string) => void
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
    const [open, setOpen] = React.useState(false)

    const handleSelectModel = async (value: string) => {
        if (value === selectedModel) return

        onModelChange(value)
        setOpen(false)

        try {
            await saveChatModelAsCookie(value)
        } catch (error) {
            console.error("Error saving model selection:", error)
            toast.error("Failed to save model preference")
        }
    }

    // 按类别分组的模型列表
    const anthropicModels = modelOptions.filter(model => model.category === "anthropic")
    const deepseekModels = modelOptions.filter(model => model.category === "deepseek")
    const ollamaModels = modelOptions.filter(model => model.category === "ollama")

    const selectedModelName = modelOptions.find(model => model.value === selectedModel)?.label || selectedModel

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{selectedModelName}</span>
                        <span className="text-xs text-muted-foreground">Anthropic</span>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="search model" className="h-9" />
                    <CommandList className="max-h-[400px]">
                        <CommandEmpty>没有找到匹配的模型</CommandEmpty>

                        <CommandGroup heading="Anthropic">
                            {anthropicModels.map((model) => (
                                <CommandItem
                                    key={model.value}
                                    value={model.value}
                                    onSelect={handleSelectModel}
                                    className="flex items-center justify-between"
                                >
                                    <span>{model.label}</span>
                                    {selectedModel === model.value && (
                                        <Check className="h-4 w-4 text-green-500" />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>

                        <CommandGroup heading="DeepSeek">
                            {deepseekModels.map((model) => (
                                <CommandItem
                                    key={model.value}
                                    value={model.value}
                                    onSelect={handleSelectModel}
                                >
                                    <span>{model.label}</span>
                                    {selectedModel === model.value && (
                                        <Check className="ml-auto h-4 w-4 text-green-500" />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>

                        <CommandGroup heading="Ollama">
                            {ollamaModels.map((model) => (
                                <CommandItem
                                    key={model.value}
                                    value={model.value}
                                    onSelect={handleSelectModel}
                                >
                                    <span>{model.label}</span>
                                    {selectedModel === model.value && (
                                        <Check className="ml-auto h-4 w-4 text-green-500" />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
