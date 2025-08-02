# AI Chat Platform

A modern AI chat platform built with Next.js 15, Supabase, and AI SDK 5.

## Features

- 🔐 Google OAuth authentication via Supabase
- 💬 Real-time AI chat with OpenAI GPT-4
- 📁 Chat history persistence with Supabase
- 🎨 Modern UI with shadcn/ui and Tailwind CSS
- ⚡ Streaming responses with AI SDK 5
- 🔒 Row-level security for user data

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + Google OAuth
- **AI**: OpenAI GPT-4 via AI SDK 5
- **UI**: shadcn/ui, Tailwind CSS
- **Language**: TypeScript

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd ai-chat-platform-new
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL migrations in `supabase/migrations/001_initial_schema.sql`
3. Enable Google OAuth in Authentication settings
4. Get your project URL and anon key from Project Settings > API

### 3. Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://yourproject.supabase.co/auth/v1/callback`
6. Add the client ID and secret to Supabase Auth settings

### 4. Set up environment variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/          # AI chat endpoint
│   ├── auth/
│   │   ├── login/         # Login page
│   │   └── callback/      # OAuth callback
│   └── page.tsx           # Main chat page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── chat/              # Chat components
│   └── layout/            # Layout components
├── lib/
│   ├── supabase/          # Supabase clients
│   ├── types/             # TypeScript types
│   └── utils.ts           # Utility functions
└── middleware.ts          # Auth middleware
```

## Database Schema

The app uses the following main tables:

- `profiles`: User profiles (extends Supabase Auth)
- `chats`: Chat sessions
- `messages`: Chat messages with AI SDK 5 parts structure
- `votes`: Message ratings
- `documents`: For future MCP integration

All tables have Row Level Security (RLS) enabled for data isolation.

## Development

### Adding new UI components

```bash
npx shadcn@latest add <component-name>
```

### Running type checks

```bash
npm run type-check
```

### Building for production

```bash
npm run build
```

## Future Enhancements

- [ ] File attachments and image support
- [ ] Multiple AI model support
- [ ] Chat sharing and collaboration
- [ ] MCP (Model Context Protocol) integration
- [ ] Voice input/output
- [ ] Mobile app
