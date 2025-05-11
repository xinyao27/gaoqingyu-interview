import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AvailableProviders, ProviderConfigs, ProviderType } from './types';
import { getProviderConfigs, saveProviderConfig, deleteProviderConfig, getEnabledProviderTypes } from './provider-storage';

const defaultAvailableProviders: AvailableProviders = {
    [ProviderType.OPENAI]: false,
    [ProviderType.ANTHROPIC]: false,
    [ProviderType.GOOGLE_AI]: false,
    [ProviderType.DEEPSEEK]: false,
    [ProviderType.OLLAMA]: false,
    [ProviderType.XAI]: false,
    [ProviderType.AZURE_OPENAI]: false,
    [ProviderType.GITHUB_COPILOT]: false,
    [ProviderType.GROQ]: false,
    [ProviderType.MISTRAL]: false,
    [ProviderType.OPENROUTER]: false,
    [ProviderType.PERPLEXITY]: false,
    [ProviderType.TOGETHER]: false,
};

interface ProviderContextType {
    providerConfigs: ProviderConfigs;
    availableProviders: AvailableProviders;
    refreshProviders: () => void;
    saveProvider: (providerType: ProviderType, config: any) => void;
    deleteProvider: (providerType: ProviderType) => void;
    selectedProvider: ProviderType | null;
    setSelectedProvider: (provider: ProviderType | null) => void;
    isLoading: boolean;
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

interface ProviderProviderProps {
    children: ReactNode;
}

export function ProviderProvider({ children }: ProviderProviderProps) {
    const [providerConfigs, setProviderConfigs] = useState<ProviderConfigs>({});
    const [availableProviders, setAvailableProviders] = useState<AvailableProviders>(defaultAvailableProviders);
    const [selectedProvider, setSelectedProvider] = useState<ProviderType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshProviders = () => {
        try {
            setIsLoading(true);
            const configs = getProviderConfigs();
            setProviderConfigs(configs);

            const updatedAvailableProviders = { ...defaultAvailableProviders };

            Object.entries(configs).forEach(([type, config]) => {
                if (config.enabled) {
                    updatedAvailableProviders[type as ProviderType] = true;
                }
            });

            setAvailableProviders(updatedAvailableProviders);

            if (selectedProvider === null) {
                const enabledTypes = getEnabledProviderTypes();
                if (enabledTypes.length > 0) {
                    setSelectedProvider(enabledTypes[0]);
                }
            }
        } catch (error) {
            console.error('刷新提供商配置失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveProvider = (providerType: ProviderType, config: any) => {
        saveProviderConfig(providerType, config);
        refreshProviders();
    };

    const deleteProvider = (providerType: ProviderType) => {
        deleteProviderConfig(providerType);

        if (selectedProvider === providerType) {
            const enabledTypes = getEnabledProviderTypes();
            setSelectedProvider(enabledTypes.length > 0 ? enabledTypes[0] : null);
        }

        refreshProviders();
    };

    useEffect(() => {
        refreshProviders();
    }, []);

    const contextValue: ProviderContextType = {
        providerConfigs,
        availableProviders,
        refreshProviders,
        saveProvider,
        deleteProvider,
        selectedProvider,
        setSelectedProvider,
        isLoading,
    };

    return (
        <ProviderContext.Provider value={contextValue}>
            {children}
        </ProviderContext.Provider>
    );
}

export function useProviderContext() {
    const context = useContext(ProviderContext);

    if (context === undefined) {
        throw new Error('useProviderContext必须在ProviderProvider内部使用');
    }

    return context;
}

export function useProvider(providerType: ProviderType) {
    const { providerConfigs, saveProvider, availableProviders } = useProviderContext();

    const config = providerConfigs[providerType];
    const isAvailable = availableProviders[providerType];

    const updateConfig = (newConfig: any) => {
        saveProvider(providerType, { ...config, ...newConfig });
    };

    return {
        config,
        isAvailable,
        updateConfig,
    };
}

export function useProviderAvailability() {
    const { availableProviders, isLoading } = useProviderContext();
    return { availableProviders, isLoading };
}

export function useAllProviders() {
    const { providerConfigs, availableProviders, refreshProviders } = useProviderContext();
    return { providerConfigs, availableProviders, refreshProviders };
} 