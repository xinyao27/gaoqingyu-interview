import {
    customProvider,
    extractReasoningMiddleware,
    wrapLanguageModel,
} from 'ai';
import { openai } from '@ai-sdk/openai';

export const myProvider = customProvider({
    languageModels: {
        'chat-model': openai('gpt-4o'),
        'chat-model-reasoning': wrapLanguageModel({
            model: openai('gpt-4o'),
            middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': openai('gpt-4o'),
        'artifact-model': openai('gpt-4o'),
    },
    imageModels: {
        'small-model': openai.image('gpt-4o'),
    },
});
