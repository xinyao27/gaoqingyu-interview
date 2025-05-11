import { Model, models } from '@/lib/ai/models';
import { API_KEYS } from '@/lib/ai/types';
import { AvailableProviders } from '@/lib/ai/types';
import { ProviderType } from '@/lib/ai/types';
import { ollama, createOllama } from 'ollama-ai-provider';

export interface OllamaModel {
    name: string;
    model: string;
    modified_at: string;
    size: number;
    digest: string;
    details?: {
        parent_model?: string;
        format?: string;
        family?: string;
        families?: string[];
        parameter_size?: string;
        quantization_level?: string;
    };
}

const availableProviders: AvailableProviders = {
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

const modelList: Model[] = models;

async function listModels(): Promise<OllamaModel[]> {
    try {
        if (!process.env.OLLAMA_BASE_URL) {
            return [];
        }

        const response = await fetch(`${process.env.OLLAMA_BASE_URL}/api/tags`, {
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch models: ${response.status}`);
        }

        const data = await response.json();
        availableProviders[ProviderType.OLLAMA] = data.models.length > 0;
        return data.models || [];
    } catch (error) {
        console.error('Error listing Ollama models:', error);
        return [];
    }
}

export { ollama };

export async function getAvailableProviders() {
    for (const providerType in API_KEYS) {
        const typedProvider = providerType as keyof typeof API_KEYS;
        const envVarName = API_KEYS[typedProvider];
        availableProviders[typedProvider as ProviderType] =
            !!process.env[envVarName] && process.env[envVarName]!.trim() !== '';
    }

    return availableProviders;
}

export async function getModelList() {
    const ollamaModelList = await listModels();

    const list = ollamaModelList.map((model: OllamaModel) => {
        return {
            id: model.model,
            name: model.name,
            description: model.details?.parameter_size
                ? `${model.details.family || ''} ${model.details.parameter_size} ${model.details.quantization_level || ''}`
                : model.name,
            provider: ProviderType.OLLAMA,
            isReasoning: false,
            isVision: false
        };
    });

    return [...modelList, ...list];
}
