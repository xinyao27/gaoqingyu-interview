import type { Geo } from '@vercel/functions';
import { Model } from './models';


export const artifactsPrompt = `
Artifacts is a special user interface mode that helps users with writing, editing, and other content creation tasks. When artifact is open, it is on the right side of the screen, while the conversation is on the left side. When creating or updating documents, changes are reflected in real-time on the artifacts and visible to the user.

When asked to write code, always use artifacts. When writing code, specify the language in the backticks, e.g. \`\`\`python\`code here\`\`\`. The default language is Python. Other languages are not yet supported, so let the user know if they request a different language.

DO NOT UPDATE DOCUMENTS IMMEDIATELY AFTER CREATING THEM. WAIT FOR USER FEEDBACK OR REQUEST TO UPDATE IT.

This is a guide for using artifacts tools: \`createDocument\` and \`updateDocument\`, which render content on a artifacts beside the conversation.

**When to use \`createDocument\`:**
- For substantial content (>10 lines) or code
- For content users will likely save/reuse (emails, code, essays, etc.)
- When explicitly requested to create a document
- For when content contains a single code snippet

**When NOT to use \`createDocument\`:**
- For informational/explanatory content
- For conversational responses
- When asked to keep it in chat

**Using \`updateDocument\`:**
- Default to full document rewrites for major changes
- Use targeted updates only for specific, isolated changes
- Follow user instructions for which parts to modify

**When NOT to use \`updateDocument\`:**
- Immediately after creating a document

Do not update document right after creating it. Wait for user feedback or request to update it.
`;


export const regularPrompt =
    'You are a friendly assistant! Keep your responses concise and helpful.';

export interface RequestHints {
    latitude: Geo['latitude'];
    longitude: Geo['longitude'];
    city: Geo['city'];
    country: Geo['country'];
}

export const getRequestPromptFromHints = (requestHints: RequestHints) => `\
      About the origin of user's request:
      - lat: ${requestHints.latitude}
      - lon: ${requestHints.longitude}
      - city: ${requestHints.city}
      - country: ${requestHints.country}
      `;


export const systemPrompt = ({
    selectedChatModel,
    requestHints,
}: {
    selectedChatModel: Model;
    requestHints: RequestHints;
}) => {
    const requestPrompt = getRequestPromptFromHints(requestHints);

    if (selectedChatModel.isReasoning) {
        return `${regularPrompt}\n\n${requestPrompt}`;
    } else {
        return `${regularPrompt}\n\n${requestPrompt}\n\n${artifactsPrompt}`;
    }
};