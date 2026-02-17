# Backend Setup (Supabase + NestJS)

This repo now includes the admin backend at `backend/` (copied from your `adashboard-2-fullStack/back-end` source).

## What is included

- **Framework**: NestJS + TypeORM + JWT bearer auth
- **Modules**:
  - `auth`
  - `admins`
  - `users`
  - `roles`
  - `projects`
  - `tasks`
  - `settings`
  - `ai-chat`
  - `chat-sessions`
  - `helpers` (countries/upload)
  - `mcp`
- **WebSocket gateway**:
  - `auth/auth.gateway.ts`

## DB mode configured

`src/app.module.ts` now supports and defaults to:

- `DB_TYPE=postgres` (recommended)
- `DATABASE_URL=postgresql://...` (Supabase)
- `DB_SSL=true` (works with Supabase managed Postgres)

MySQL/SQLite paths remain available for local fallback.

## Required environment variables (production)

Use these in your backend host (Railway/Render/Fly/etc.):

- `NODE_ENV=production`
- `PORT=3001` (or platform-assigned port)
- `DB_TYPE=postgres`
- `DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
- `DB_SSL=true`
- `JWT_SECRET=<long-random-secret>`
- `JWT_EXPIRATION=7d`
- `CORS_ORIGIN=https://your-vercel-domain.vercel.app`

Optional feature keys:

- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_ENDPOINT`
- `R2_BUCKET_NAME`
- `R2_PUBLIC_URL`
- `DEEPSEEK_API_KEY`
- `GOOGLE_API_KEY`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`

## Install + run

From `backend/`:

```bash
npm install
npm run build
npm run start:prod
```

For local dev:

```bash
npm run dev
```

## API base path

The backend serves all endpoints under:

`/api`

Examples:

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/admins`
- `GET /api/users`
- `GET /api/roles`
- `GET /api/projects`
- `GET /api/tasks`
- `GET /api/settings`
