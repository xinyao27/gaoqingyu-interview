# Simple Chatbot

A powerful chatbot application built with modern web technologies, supporting multiple AI models and rich interactive features.

[中文版](README_CN.md) | English

## Project Overview

Simple Chatbot is a full-featured AI chat application that allows users to converse with multiple AI models. The application supports models from various AI providers including OpenAI, Anthropic, Google AI, Mistral, Groq, and can also connect to locally run Ollama models.

### Features

- 🤖 Support for multiple AI models: Including GPT-4o, Claude 3.5/3.7, Gemini 1.5/2.0, Grok 3, Llama, and more
- 🔄 Real-time streaming responses: Providing immediate feedback through streaming
- 💬 Chat history: Save and manage all chat sessions
- 📊 Multi-model switching: Easily switch between different AI models during conversation
- 🔒 User authentication: Secure user authentication system integrated with Better Auth
- 🌐 Local model support: Connect to locally running Ollama models
- 📱 Responsive design: Adapts to various device screen sizes
- 🔍 Resumable session streams: Support for conversation flows with resumption capability

## Tech Stack

- **Frontend Framework**: Next.js 15
- **UI Components**: Shadcn + Tailwind CSS
- **State Management**: React Query
- **Database**: PostgreSQL + Drizzle ORM
- **Authentication**: Better Auth
- **AI Integration**: AI SDK (supporting multiple AI providers)
- **API Routes**: Hono

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- API key from at least one AI service provider (OpenAI, Anthropic, etc.)

### Environment Setup

1. Create a PostgreSQL database and configure your environment variables

Create a `.env` file and set the following variables:

```bash
# Authentication secret (generate at the link below)
BETTER_AUTH_SECRET=""

# Database connection string
DATABASE_URL="postgresql://username:password@localhost:5432/chatbot_db"

# AI provider API keys (add as needed)
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
GOOGLE_AI_API_KEY=""
MISTRAL_API_KEY=""
GROQ_API_KEY=""

# Optional: Ollama connection (local AI models)
OLLAMA_BASE_URL="http://localhost:11434"
```

You can generate a `BETTER_AUTH_SECRET` [here](https://www.better-auth.com/docs/installation#set-environment-variables).

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Generate schema and perform migrations

```bash
# Generate auth schema
npx @better-auth/cli generate

# Generate Drizzle schema
npx drizzle-kit generate

# Run database migrations
npx drizzle-kit migrate
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Database Management

The project provides the following database management commands:

```bash
# Generate database schema
npm run db:generate

# Execute database migrations
npm run db:migrate
```

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Issues and pull requests are welcome!

## License

[MIT](LICENSE)
