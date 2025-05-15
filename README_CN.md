# Simple Chatbot

一个基于现代Web技术构建的强大聊天机器人应用，支持多种AI模型和丰富的交互功能。

中文版 | [English](README.md)

## 项目概述

Simple Chatbot是一个功能齐全的AI聊天应用，允许用户与多种AI模型进行对话。该应用支持OpenAI、Anthropic、Google AI、Mistral、Groq等多种AI提供商的模型，也可以连接到本地运行的Ollama模型。

### 功能特点

- 🤖 支持多种AI模型：包括GPT-4o、Claude 3.5/3.7、Gemini 1.5/2.0、Grok 3、Llama等
- 🔄 实时流式响应：使用流式传输提供即时响应体验
- 💬 聊天历史记录：保存并管理所有聊天会话
- 📊 多模型切换：在对话中轻松切换不同的AI模型
- 🔒 用户认证：集成Better Auth提供安全的用户认证系统
- 🌐 支持本地模型：可以连接到本地运行的Ollama模型
- 📱 响应式设计：适应各种设备屏幕尺寸
- 🔍 可恢复的会话流：支持断点续传的对话流

## 技术栈

- **前端框架**：Next.js 15
- **UI组件**：Shadcn + Tailwind CSS
- **状态管理**：React Query
- **数据库**：PostgreSQL + Drizzle ORM
- **认证系统**：Better Auth
- **AI集成**：AI SDK (支持多种AI提供商)
- **API路由**：Hono

## 开始使用

### 前提条件

- Node.js 18+
- PostgreSQL数据库
- 至少一个AI服务提供商的API密钥（OpenAI、Anthropic等）

### 环境设置

1. 创建PostgreSQL数据库，然后配置环境变量

创建`.env`文件并设置以下变量：

```bash
# 认证密钥（可以在下面链接生成）
BETTER_AUTH_SECRET=""

# 数据库连接字符串
DATABASE_URL="postgresql://username:password@localhost:5432/chatbot_db"

# AI提供商API密钥（根据需要添加）
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
GOOGLE_AI_API_KEY=""
MISTRAL_API_KEY=""
GROQ_API_KEY=""

# 可选：Ollama连接（本地AI模型）
OLLAMA_BASE_URL="http://localhost:11434"
```

你可以在[这里](https://www.better-auth.com/docs/installation#set-environment-variables)生成`BETTER_AUTH_SECRET`。

2. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

3. 生成模式并执行数据库迁移

```bash
# 生成认证模式
npx @better-auth/cli generate

# 生成Drizzle模式
npx drizzle-kit generate

# 执行数据库迁移
npx drizzle-kit migrate
```

### 运行开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 数据库管理

项目提供了以下数据库管理命令：

```bash
# 生成数据库模式
npm run db:generate

# 执行数据库迁移
npm run db:migrate
```

## 部署

### 部署到Vercel

推荐使用[Vercel平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)部署此Next.js应用。

1. 将代码推送到GitHub仓库
2. 在Vercel中导入该仓库
3. 配置环境变量
4. 部署

有关更多详细信息，请查看[Next.js部署文档](https://nextjs.org/docs/app/building-your-application/deploying)。

## 贡献

欢迎提交问题和拉取请求！

## 许可证

[MIT](LICENSE) 