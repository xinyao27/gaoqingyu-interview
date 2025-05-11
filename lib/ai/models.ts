import { ProviderType, OllamaModelList } from './types'
export const DEFAULT_MODEL: Model = {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'OpenAI\'s powerful multimodal model with structured output support',
    provider: ProviderType.OPENAI
};

export interface Model {
    id: string;
    name: string;
    description: string;
    provider?: string;
    isReasoning?: boolean;
    isVision?: boolean;
}

export const models: Array<Model> = [
    // OpenAI Models
    {
        id: 'gpt-4o',
        name: 'GPT-4o',
        description: 'OpenAI\'s powerful multimodal model with structured output support',
        provider: ProviderType.OPENAI
    },
    {
        id: 'gpt-4.1',
        name: 'GPT-4.1',
        description: 'OpenAI\'s advanced large language model',
        provider: ProviderType.OPENAI
    },
    {
        id: 'gpt-4.1-mini',
        name: 'GPT-4.1 Mini',
        description: 'Smaller version of GPT-4.1, good balance of performance and cost',
        provider: ProviderType.OPENAI
    },
    {
        id: 'gpt-4.1-nano',
        name: 'GPT-4.1 Nano',
        description: 'Smallest version of GPT-4.1, excellent cost-effectiveness',
        provider: ProviderType.OPENAI
    },
    {
        id: 'o3',
        name: 'o3',
        description: 'OpenAI o3 model with added reasoning capabilities',
        provider: ProviderType.OPENAI,
        isReasoning: true
    },
    {
        id: 'o4-mini',
        name: 'o4-mini',
        description: 'OpenAI o4-mini model with added reasoning capabilities',
        provider: ProviderType.OPENAI,
        isReasoning: true
    },
    {
        id: 'o4-mini-high',
        name: 'o4-mini-high',
        description: 'OpenAI o4-mini-high model with added reasoning capabilities',
        provider: ProviderType.OPENAI,
        isReasoning: true
    },

    // Anthropic Models
    {
        id: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        description: 'Anthropic\'s latest Claude 3.5 Sonnet model',
        provider: ProviderType.ANTHROPIC
    },
    {
        id: 'claude-3-5-sonnet-20240620',
        name: 'Claude 3.5 Sonnet (2024-06-20)',
        description: 'Specific version of Claude 3.5 Sonnet',
        provider: ProviderType.ANTHROPIC
    },
    {
        id: 'claude-3-5-haiku',
        name: 'Claude 3.5 Haiku',
        description: 'Lightweight Haiku model of Claude 3.5',
        provider: ProviderType.ANTHROPIC
    },
    {
        id: 'claude-3-7-sonnet',
        name: 'Claude 3.7 Sonnet',
        description: 'Anthropic\'s most powerful Claude 3.7 Sonnet model',
        provider: ProviderType.ANTHROPIC
    },

    // Google Models
    {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        description: 'Google\'s Gemini 1.5 professional version',
        provider: ProviderType.GOOGLE_AI
    },
    {
        id: 'gemini-1.5-flash',
        name: 'Gemini 1.5 Flash',
        description: 'Google\'s Gemini 1.5 fast version',
        provider: ProviderType.GOOGLE_AI
    },
    {
        id: 'gemini-2.0-flash-exp',
        name: 'Gemini 2.0 Flash Exp',
        description: 'Google\'s Gemini 2.0 experimental version',
        provider: ProviderType.GOOGLE_AI
    },

    // DeepSeek Models
    {
        id: 'deepseek-chat',
        name: 'DeepSeek Chat',
        description: 'DeepSeek\'s general chat model',
        provider: ProviderType.DEEPSEEK
    },
    {
        id: 'deepseek-reasoner',
        name: 'DeepSeek Reasoner',
        description: 'DeepSeek\'s specialized reasoning model',
        provider: ProviderType.DEEPSEEK,
        isReasoning: true
    },

    // xAI Models
    {
        id: 'xai-gpt-4o',
        name: 'xAI GPT-4o',
        description: 'GPT-4o provided by xAI',
        provider: ProviderType.XAI
    },
    {
        id: 'grok-3',
        name: 'Grok 3',
        description: 'xAI\'s Grok 3 model',
        provider: ProviderType.XAI
    },
    {
        id: 'grok-3-mini',
        name: 'Grok 3 Mini',
        description: 'Lightweight version of Grok 3',
        provider: ProviderType.XAI
    },
    {
        id: 'grok-3-fast',
        name: 'Grok 3 Fast',
        description: 'Speed-optimized version of Grok 3',
        provider: ProviderType.XAI
    },
    {
        id: 'grok-3-mini-fast',
        name: 'Grok 3 Mini Fast',
        description: 'Fast version of Grok 3 Mini',
        provider: ProviderType.XAI
    },

    // Mistral Models
    {
        id: 'mistral-small-latest',
        name: 'Mistral Small',
        description: 'Mistral\'s latest small model',
        provider: ProviderType.MISTRAL
    },
    {
        id: 'mistral-medium-latest',
        name: 'Mistral Medium',
        description: 'Mistral\'s latest medium model',
        provider: ProviderType.MISTRAL
    },
    {
        id: 'mistral-large-latest',
        name: 'Mistral Large',
        description: 'Mistral\'s latest large model',
        provider: ProviderType.MISTRAL
    },
    {
        id: 'mistral-small-3.1',
        name: 'Mistral Small 3.1',
        description: 'Mistral Small version 3.1',
        provider: ProviderType.MISTRAL
    },
    {
        id: 'mistral-medium-3',
        name: 'Mistral Medium 3',
        description: 'Mistral Medium version 3',
        provider: ProviderType.MISTRAL
    },
    {
        id: 'mistral-large-2',
        name: 'Mistral Large 2',
        description: 'Mistral Large version 2',
        provider: ProviderType.MISTRAL
    },
    {
        id: 'codestral-latest',
        name: 'Codestral (Latest)',
        description: 'Mistral\'s code-optimized model',
        provider: ProviderType.MISTRAL
    },
    {
        id: 'pixtral-large-latest',
        name: 'Pixtral Large (Latest)',
        description: 'Mistral\'s Pixtral vision model',
        provider: ProviderType.MISTRAL
    },

    // Groq Models
    {
        id: 'llama-3-8b-instant',
        name: 'Llama 3 8B Instant',
        description: 'Llama 3 8B fast model provided by Groq',
        provider: ProviderType.GROQ
    },
    {
        id: 'llama-3.1-8b-instant',
        name: 'Llama 3.1 8B Instant',
        description: 'Llama 3.1 8B fast model provided by Groq',
        provider: ProviderType.GROQ
    },
    {
        id: 'llama-3.3-70b-versatile',
        name: 'Llama 3.3 70B Versatile',
        description: 'Llama 3.3 70B versatile model provided by Groq',
        provider: ProviderType.GROQ
    },
    {
        id: 'llama-4-scout-17b-16e-instruct',
        name: 'Llama 4 Scout 17B (16e)',
        description: 'Llama 4 Scout 17B instruction model provided by Groq',
        provider: ProviderType.GROQ
    },
    {
        id: 'mixtral-8x7b-32768',
        name: 'Mixtral 8x7B (32k)',
        description: 'Mixtral model with 32k context length provided by Groq',
        provider: ProviderType.GROQ
    },
    {
        id: 'gemma2-9b-it',
        name: 'Gemma 2 9B IT',
        description: 'Gemma 2 9B instruction-tuned model provided by Groq',
        provider: ProviderType.GROQ
    },

    // Perplexity Models
    {
        id: 'sonar-pro',
        name: 'Sonar Pro',
        description: 'Perplexity\'s Sonar professional model',
        provider: ProviderType.PERPLEXITY
    },
    {
        id: 'sonar-small',
        name: 'Sonar Small',
        description: 'Perplexity\'s small Sonar model',
        provider: ProviderType.PERPLEXITY
    },
    {
        id: 'sonar-medium',
        name: 'Sonar Medium',
        description: 'Perplexity\'s medium Sonar model',
        provider: ProviderType.PERPLEXITY
    },
    {
        id: 'perplexity-deepseek-r1',
        name: 'DeepSeek R1 (Perplexity)',
        description: 'DeepSeek R1 model provided by Perplexity',
        provider: ProviderType.PERPLEXITY
    },
];