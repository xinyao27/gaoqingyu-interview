import {
    customProvider,
    extractReasoningMiddleware,
    wrapLanguageModel,
} from 'ai';
import { openai as originalOpenAI } from '@ai-sdk/openai';
import { anthropic as originalAnthropic } from '@ai-sdk/anthropic';
import { google as originalGoogle } from '@ai-sdk/google';
import { deepseek as originalDeepseek } from '@ai-sdk/deepseek';
import { xai as originalXai } from '@ai-sdk/xai';
import { mistral as originalMistral } from '@ai-sdk/mistral';
import { groq as originalGroq } from '@ai-sdk/groq';
import { fireworks as originalFireworks } from '@ai-sdk/fireworks';
import { perplexity as originalPerplexity } from '@ai-sdk/perplexity';
import { togetherai as originalTogetherAI } from '@ai-sdk/togetherai';
import { AvailableProviders, ProviderType, API_KEYS, DEFAULT_ENDPOINTS, OllamaModelList } from './types';
import { Model } from './models';

// Create enhanced reasoning model
const fireworksReasoningModel = wrapLanguageModel({
    model: originalFireworks('qwq-32b'),
    middleware: [
        extractReasoningMiddleware({
            tagName: 'think',
            separator: '\n'
        }),
    ],
});

const deepseekReasoningModel = wrapLanguageModel({
    model: originalDeepseek('deepseek-reasoner'),
    middleware: [
        extractReasoningMiddleware({
            tagName: 'think',
            separator: '\n'
        }),
    ],
});

const togetheraiReasoningModel = wrapLanguageModel({
    model: originalTogetherAI('deepseek/DeepSeek-R1'),
    middleware: [
        extractReasoningMiddleware({
            tagName: 'think',
            separator: '\n'
        }),
    ],
});

export const myProvider = customProvider({
    languageModels: {
        'title-model': originalOpenAI('gpt-4o'),
        'artifact-model': originalOpenAI('gpt-4o'),
    },
    imageModels: {
        'small-model': originalOpenAI.image('gpt-4o'),
    },
});

export const openai = customProvider({
    languageModels: {
        'gpt-4o': originalOpenAI('gpt-4o', { structuredOutputs: true }),
        'gpt-4.1': originalOpenAI('gpt-4.1'),
        'gpt-4.1-mini': originalOpenAI('gpt-4.1-mini'),
        'gpt-4.1-nano': originalOpenAI('gpt-4.1-nano'),
        'o3': wrapLanguageModel({
            model: originalOpenAI('o3'),
            middleware: [
                extractReasoningMiddleware({
                    tagName: 'think',
                    separator: '\n'
                })
            ]
        }),
        'o4-mini': wrapLanguageModel({
            model: originalOpenAI('o4-mini'),
            middleware: [
                extractReasoningMiddleware({
                    tagName: 'think',
                    separator: '\n'
                })
            ]
        }),
        'o4-mini-high': wrapLanguageModel({
            model: originalOpenAI('o4-mini-high'),
            middleware: [
                extractReasoningMiddleware({
                    tagName: 'think',
                    separator: '\n'
                })
            ]
        })
    },
    fallbackProvider: originalOpenAI,
});

export const anthropic = customProvider({
    languageModels: {
        'claude-3-5-sonnet': originalAnthropic('claude-3-5-sonnet-20241022'),
        'claude-3-5-sonnet-20240620': originalAnthropic('claude-3-5-sonnet-20240620'),
        'claude-3-5-haiku': originalAnthropic('claude-3-5-haiku-20241022'),
        'claude-3-7-sonnet': originalAnthropic('claude-3-7-sonnet-20250219'),
    },
    fallbackProvider: originalAnthropic,
});

export const google = customProvider({
    languageModels: {
        'gemini-1.5-pro': originalGoogle('gemini-1.5-pro'),
        'gemini-1.5-flash': originalGoogle('gemini-1.5-flash'),
        'gemini-2.0-flash-exp': originalGoogle('gemini-2.0-flash-exp'),
    },
    fallbackProvider: originalGoogle,
});

export const deepseek = customProvider({
    languageModels: {
        'deepseek-chat': originalDeepseek('deepseek-chat'),
        'deepseek-reasoner': deepseekReasoningModel,
    },
    fallbackProvider: originalDeepseek,
});

export const xai = customProvider({
    languageModels: {
        'xai-gpt-4o': originalXai('gpt-4o'),
        'grok-3': originalXai('grok-3'),
        'grok-3-mini': originalXai('grok-3-mini'),
        'grok-3-fast': originalXai('grok-3-fast'),
        'grok-3-mini-fast': originalXai('grok-3-mini-fast'),
    },
});

export const mistral = customProvider({
    languageModels: {
        'mistral-small-latest': originalMistral('mistral-small-latest'),
        'mistral-medium-latest': originalMistral('mistral-medium-latest'),
        'mistral-large-latest': originalMistral('mistral-large-latest'),
        'mistral-small-3.1': originalMistral('mistral-small-2503'),
        'mistral-medium-3': originalMistral('mistral-medium-2505'),
        'mistral-large-2': originalMistral('mistral-large-2407'),
        'codestral-latest': originalMistral('codestral-latest'),
        'pixtral-large-latest': originalMistral('pixtral-large-latest'),
    },
    fallbackProvider: originalMistral,
});

export const groq = customProvider({
    languageModels: {
        'llama-3-8b-instant': originalGroq('llama-3-8b-instant'),
        'llama-3.1-8b-instant': originalGroq('llama-3.1-8b-instant'),
        'llama-3.3-70b-versatile': originalGroq('llama-3.3-70b-versatile'),
        'llama-4-scout-17b-16e-instruct': originalGroq('meta-llama/llama-4-scout-17b-16e-instruct'),
        'mixtral-8x7b-32768': originalGroq('mixtral-8x7b-32768'),
        'gemma2-9b-it': originalGroq('gemma2-9b-it'),
    },
    fallbackProvider: originalGroq,
});

export const perplexity = customProvider({
    languageModels: {
        'sonar-pro': originalPerplexity('sonar-pro'),
        'sonar-small': originalPerplexity('sonar-small'),
        'sonar-medium': originalPerplexity('sonar-medium'),
        'deepseek-r1': originalPerplexity('deepseek-r1'),
    },
    fallbackProvider: originalPerplexity,
});
