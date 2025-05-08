# Better Auth Next.js Starter (App Router)

[Demo](https://nextjs.better-auth-starter.com)

- [Pages Router](https://github.com/daveyplate/better-auth-nextjs-pages-starter)
- [TanStack Start](https://github.com/daveyplate/better-auth-tanstack-starter)

## Installation

First, create a PostgreSQL Database then configure your environment variables.

You can generate a `BETTER_AUTH_SECRET` [here](https://www.better-auth.com/docs/installation#set-environment-variables).

```bash
BETTER_AUTH_SECRET=""
DATABASE_URL=""
```

Then generate your schema and perform migrations with drizzle-kit.

```bash
npx @better-auth/cli generate
npx drizzle-kit generate
npx drizzle-kit migrate
```

- Twitter: [@daveycodez](https://x.com/daveycodez)

☕️ [Buy me a coffee](https://buymeacoffee.com/daveycodez)

## Features:

[Better Auth](https://better-auth.com)

[Better Auth UI](https://better-auth-ui.com)

[Better Auth TanStack](https://github.com/daveyplate/better-auth-tanstack)

[TanStack Query](https://tanstack.com/query)

[shadcn/ui](https://ui.shadcn.com)

[TailwindCSS](https://tailwindcss.com)

[Drizzle ORM](https://orm.drizzle.team)

[PostgreSQL](https://postgresql.org)

[Biome](https://biomejs.dev)

[Next.js](https://nextjs.org)

[Turborepo](https://turbo.build)

## Next.js

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
