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
import { Model } from "@/lib/ai/models"
import { ProviderType } from "@/lib/ai/types"
import { AvailableProviders } from "@/lib/ai/types"
import { startTransition, useMemo } from "react"
import { InitialModelData } from "./chat-container"

interface ModelSelectorProps {
    selectedModel: Model
    initModelData: InitialModelData
    setSelectedModel: (model: Model) => void
}

export function ModelSelector({ selectedModel, initModelData, setSelectedModel }: ModelSelectorProps) {
    const [open, setOpen] = React.useState(false)
    const [optimisticModelId, setOptimisticModelId] = React.useOptimistic(selectedModel.id);
    const { serverModelList, serverAvailableProviders } = initModelData
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSelectModel = async (value: string) => {
        const selectedModelObj = serverModelList.find(model => model.id === value) as Model;

        if (!selectedModelObj) {
            toast.error("Unable to find selected model");
            return;
        }

        setSelectedModel(selectedModelObj);
        setOpen(false);

        try {
            await saveChatModelAsCookie(value);

            document.cookie = `chat-model=${value}; path=/; max-age=31536000; SameSite=Strict`;

            startTransition(() => {
                setOptimisticModelId(value);
            });
        } catch (error) {
            console.error("Error saving model selection:", error);
            toast.error("Unable to save model preference");
        }
    }

    const isModelAvailable = (model: Model) => {
        if (!serverModelList) return true;
        return model.provider ? serverAvailableProviders[model.provider as ProviderType] : true;
    }

    const selectedModelProvider = selectedModel.provider;
    const selectedChatModel = useMemo(
        () =>
            serverModelList.find(
                (model) => model.id === optimisticModelId,
            ),
        [optimisticModelId],
    );

    const anthropicModels = serverModelList.filter(model => model.provider === ProviderType.ANTHROPIC)
    const deepseekModels = serverModelList.filter(model => model.provider === ProviderType.DEEPSEEK)
    const xaiModels = serverModelList.filter(model => model.provider === ProviderType.XAI)
    const groqModels = serverModelList.filter(model => model.provider === ProviderType.GROQ)
    const openaiModels = serverModelList.filter(model => model.provider === ProviderType.OPENAI)
    const googleModels = serverModelList.filter(model => model.provider === ProviderType.GOOGLE_AI)
    const ollamaModels = serverModelList.filter(model => model.provider === ProviderType.OLLAMA)
    const selectedModelName = selectedChatModel?.name || selectedModel.name
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
                        {!isClient ? (
                            <span className="text-sm">{selectedModel.name}</span>
                        ) : (
                            <>
                                <span className="text-sm">{selectedModelName}</span>
                                {selectedModelProvider && (
                                    <span className="text-xs text-muted-foreground">
                                        {selectedModelProvider}
                                        {serverAvailableProviders && selectedModelProvider &&
                                            !serverAvailableProviders[selectedModelProvider as ProviderType] && (
                                                <span className="ml-1 text-xs text-red-500">(Unavailable)</span>
                                            )}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search models" className="h-9" />
                    <CommandList className="max-h-[400px]">
                        <CommandEmpty>No matching models found</CommandEmpty>


                        {serverAvailableProviders && !serverAvailableProviders[ProviderType.ANTHROPIC] ? null : (
                            <CommandGroup heading="Anthropic">
                                {anthropicModels.length > 0 ? anthropicModels.map((model) => (
                                    <CommandItem
                                        key={model.id}
                                        value={model.id}
                                        onSelect={handleSelectModel}
                                        className={cn(
                                            "flex items-center justify-between",
                                            !isModelAvailable(model) && "opacity-50 cursor-not-allowed"
                                        )}
                                        disabled={!isModelAvailable(model)}
                                    >
                                        <span>{model.name}</span>
                                        {selectedModel.id === model.id && (
                                            <Check className="h-4 w-4 text-green-500" />
                                        )}
                                    </CommandItem>
                                )) : null}
                            </CommandGroup>
                        )}

                        {serverAvailableProviders && !serverAvailableProviders[ProviderType.DEEPSEEK] ? null : (
                            <CommandGroup heading="DeepSeek">
                                {deepseekModels.length > 0 ? deepseekModels.map((model) => (
                                    <CommandItem
                                        key={model.id}
                                        value={model.id}
                                        onSelect={handleSelectModel}
                                        className={cn(
                                            !isModelAvailable(model) && "opacity-50 cursor-not-allowed"
                                        )}
                                        disabled={!isModelAvailable(model)}
                                    >
                                        <span>{model.name}</span>
                                        {selectedModel.id === model.id && (
                                            <Check className="ml-auto h-4 w-4 text-green-500" />
                                        )}
                                    </CommandItem>
                                )) : null}
                            </CommandGroup>
                        )}

                        {serverAvailableProviders && !serverAvailableProviders[ProviderType.OLLAMA] ? null : (
                            <CommandGroup heading="Ollama">
                                {ollamaModels.length > 0 ? ollamaModels.map((model) => (
                                    <CommandItem
                                        key={model.id}
                                        value={model.id}
                                        onSelect={handleSelectModel}
                                        className={cn(
                                            !isModelAvailable(model) && "opacity-50 cursor-not-allowed"
                                        )}
                                        disabled={!isModelAvailable(model)}
                                    >
                                        <span>{model.name}</span>
                                        {selectedModel.id === model.id && (
                                            <Check className="ml-auto h-4 w-4 text-green-500" />
                                        )}
                                    </CommandItem>
                                )) : null}
                            </CommandGroup>
                        )}

                        {serverAvailableProviders && !serverAvailableProviders[ProviderType.XAI] ? null : (
                            <CommandGroup heading="XAI">
                                {xaiModels.length > 0 ? xaiModels.map((model) => (
                                    <CommandItem
                                        key={model.id}
                                        value={model.id}
                                        onSelect={handleSelectModel}
                                        className={cn(
                                            !isModelAvailable(model) && "opacity-50 cursor-not-allowed"
                                        )}
                                        disabled={!isModelAvailable(model)}
                                    >
                                        <span>{model.name}</span>
                                        {selectedModel.id === model.id && (
                                            <Check className="ml-auto h-4 w-4 text-green-500" />
                                        )}
                                    </CommandItem>
                                )) : null}
                            </CommandGroup>
                        )}

                        {serverAvailableProviders && !serverAvailableProviders[ProviderType.GROQ] ? null : (
                            <CommandGroup heading="Groq">
                                {groqModels.length > 0 ? groqModels.map((model) => (
                                    <CommandItem
                                        key={model.id}
                                        value={model.id}
                                        onSelect={handleSelectModel}
                                        className={cn(
                                            !isModelAvailable(model) && "opacity-50 cursor-not-allowed"
                                        )}
                                        disabled={!isModelAvailable(model)}
                                    >
                                        <span>{model.name}</span>
                                        {selectedModel.id === model.id && (
                                            <Check className="ml-auto h-4 w-4 text-green-500" />
                                        )}
                                    </CommandItem>
                                )) : null}
                            </CommandGroup>
                        )}

                        {serverAvailableProviders && !serverAvailableProviders[ProviderType.OPENAI] ? null : (
                            <CommandGroup heading="OpenAI">
                                {openaiModels.length > 0 ? openaiModels.map((model) => (
                                    <CommandItem
                                        key={model.id}
                                        value={model.id}
                                        onSelect={handleSelectModel}
                                        className={cn(
                                            !isModelAvailable(model) && "opacity-50 cursor-not-allowed"
                                        )}
                                        disabled={!isModelAvailable(model)}
                                    >
                                        <span>{model.name}</span>
                                        {selectedModel.id === model.id && (
                                            <Check className="ml-auto h-4 w-4 text-green-500" />
                                        )}
                                    </CommandItem>
                                )) : null}
                            </CommandGroup>
                        )}

                        {serverAvailableProviders && !serverAvailableProviders[ProviderType.GOOGLE_AI] ? null : (
                            <CommandGroup heading="Google">
                                {googleModels.length > 0 ? googleModels.map((model) => (
                                    <CommandItem
                                        key={model.id}
                                        value={model.id}
                                        onSelect={handleSelectModel}
                                        className={cn(
                                            !isModelAvailable(model) && "opacity-50 cursor-not-allowed"
                                        )}
                                        disabled={!isModelAvailable(model)}
                                    >
                                        <span>{model.name}</span>
                                        {selectedModel.id === model.id && (
                                            <Check className="ml-auto h-4 w-4 text-green-500" />
                                        )}
                                    </CommandItem>
                                )) : null}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
