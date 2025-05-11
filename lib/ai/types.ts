export interface BaseProviderConfig {
    enabled: boolean;
    label: string;
}

export interface OpenAIProviderConfig extends BaseProviderConfig {
    apiKey: string;
    baseUrl?: string;
    organization?: string;
}

export interface AnthropicProviderConfig extends BaseProviderConfig {
    apiKey: string;
    baseUrl?: string;
}

export interface GoogleAIProviderConfig extends BaseProviderConfig {
    apiKey: string;
}

export interface DeepSeekProviderConfig extends BaseProviderConfig {
    apiKey: string;
    baseUrl?: string;
}

export interface OllamaProviderConfig extends BaseProviderConfig {
    baseUrl: string;
}

export interface XAIProviderConfig extends BaseProviderConfig {
    apiKey: string;
}

export interface AzureOpenAIProviderConfig extends BaseProviderConfig {
    apiKey: string;
    endpoint: string;
    apiVersion: string;
}

export interface GitHubCopilotProviderConfig extends BaseProviderConfig {
    apiKey: string;
}

export interface GroqProviderConfig extends BaseProviderConfig {
    apiKey: string;
}

export interface MistralProviderConfig extends BaseProviderConfig {
    apiKey: string;
}

export interface OpenRouterProviderConfig extends BaseProviderConfig {
    apiKey: string;
}

export interface PerplexityProviderConfig extends BaseProviderConfig {
    apiKey: string;
}

export interface TogetherProviderConfig extends BaseProviderConfig {
    apiKey: string;
}

export enum ProviderType {
    OPENAI = 'openai',
    ANTHROPIC = 'anthropic',
    GOOGLE_AI = 'google-ai',
    DEEPSEEK = 'deepseek',
    OLLAMA = 'ollama',
    XAI = 'xai',
    AZURE_OPENAI = 'azure-openai',
    GITHUB_COPILOT = 'github-copilot',
    GROQ = 'groq',
    MISTRAL = 'mistral',
    OPENROUTER = 'openrouter',
    PERPLEXITY = 'perplexity',
    TOGETHER = 'together',
}

export interface ProviderConfigs {
    [ProviderType.OPENAI]?: OpenAIProviderConfig;
    [ProviderType.ANTHROPIC]?: AnthropicProviderConfig;
    [ProviderType.GOOGLE_AI]?: GoogleAIProviderConfig;
    [ProviderType.DEEPSEEK]?: DeepSeekProviderConfig;
    [ProviderType.OLLAMA]?: OllamaProviderConfig;
    [ProviderType.XAI]?: XAIProviderConfig;
    [ProviderType.AZURE_OPENAI]?: AzureOpenAIProviderConfig;
    [ProviderType.GITHUB_COPILOT]?: GitHubCopilotProviderConfig;
    [ProviderType.GROQ]?: GroqProviderConfig;
    [ProviderType.MISTRAL]?: MistralProviderConfig;
    [ProviderType.OPENROUTER]?: OpenRouterProviderConfig;
    [ProviderType.PERPLEXITY]?: PerplexityProviderConfig;
    [ProviderType.TOGETHER]?: TogetherProviderConfig;
}

export interface AvailableProviders {
    [ProviderType.OPENAI]: boolean;
    [ProviderType.ANTHROPIC]: boolean;
    [ProviderType.GOOGLE_AI]: boolean;
    [ProviderType.DEEPSEEK]: boolean;
    [ProviderType.OLLAMA]: boolean;
    [ProviderType.XAI]: boolean;
    [ProviderType.AZURE_OPENAI]: boolean;
    [ProviderType.GITHUB_COPILOT]: boolean;
    [ProviderType.GROQ]: boolean;
    [ProviderType.MISTRAL]: boolean;
    [ProviderType.OPENROUTER]: boolean;
    [ProviderType.PERPLEXITY]: boolean;
    [ProviderType.TOGETHER]: boolean;
}

export const API_KEYS = {
    [ProviderType.OPENAI]: 'OPENAI_API_KEY',
    [ProviderType.ANTHROPIC]: 'ANTHROPIC_API_KEY',
    [ProviderType.GOOGLE_AI]: 'GOOGLE_AI_API_KEY',
    [ProviderType.DEEPSEEK]: 'DEEPSEEK_API_KEY',
    [ProviderType.XAI]: 'XAI_API_KEY',
    [ProviderType.AZURE_OPENAI]: 'AZURE_OPENAI_API_KEY',
    [ProviderType.GITHUB_COPILOT]: 'GITHUB_COPILOT_API_KEY',
    [ProviderType.GROQ]: 'GROQ_API_KEY',
    [ProviderType.MISTRAL]: 'MISTRAL_API_KEY',
    [ProviderType.OPENROUTER]: 'OPENROUTER_API_KEY',
    [ProviderType.PERPLEXITY]: 'PERPLEXITY_API_KEY',
    [ProviderType.TOGETHER]: 'TOGETHER_API_KEY',
    // Ollama doesn't have an API key, it uses baseUrl instead
} as const;


export type ApiKeyField = typeof API_KEYS[keyof typeof API_KEYS];

export const DEFAULT_ENDPOINTS = {
    [ProviderType.OPENAI]: 'https://api.openai.com/v1',
    [ProviderType.ANTHROPIC]: 'https://api.anthropic.com',
    [ProviderType.DEEPSEEK]: 'https://api.deepseek.com',
    [ProviderType.OLLAMA]: 'http://localhost:11434',
} as const;

export interface OllamaModelList {
    name: string;
    model: string;
    modified_at: string;
    size: number;
    digest: string;
    details: {
        parent_model: string;
        format: string;
        family: string;
        families: Array<string>;
        parameter_size: string;
        quantization_level: string;
    }
}