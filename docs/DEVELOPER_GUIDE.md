# Nemesis Launcher - Developer Guide

## Project Structure

```
nemesis-launcher/
├── package.json            # Root package with turbo scripts
├── pnpm-workspace.yaml     # Workspace configuration
├── turbo.json              # Turbo build configuration
├── tsconfig.base.json      # Base TypeScript config
├── docker-compose.yml      # PostgreSQL database
├── .env.example            # Environment template
│
├── apps/
│   ├── api/                # Fastify API server
│   │   ├── src/
│   │   │   ├── index.ts        # Server entry
│   │   │   ├── routes/         # API routes
│   │   │   │   ├── auth.ts
│   │   │   │   ├── user.ts
│   │   │   │   ├── cdn.ts
│   │   │   │   └── health.ts
│   │   │   └── services/
│   │   │       └── microsoft-auth.ts
│   │   └── package.json
│   │
│   ├── desktop/            # Electron + React
│   │   ├── src/
│   │   │   ├── main/           # Main process
│   │   │   │   ├── index.ts
│   │   │   │   └── handlers/
│   │   │   ├── preload/        # Preload scripts
│   │   │   │   └── index.ts
│   │   │   └── renderer/       # React UI
│   │   │       └── src/
│   │   │           ├── App.tsx
│   │   │           ├── pages/
│   │   │           ├── components/
│   │   │           └── hooks/
│   │   ├── electron-builder.yml
│   │   └── package.json
│   │
│   └── web/                # Next.js website
│       ├── src/
│       │   └── app/
│       │       ├── page.tsx
│       │       ├── download/
│       │       └── auth/
│       └── package.json
│
├── packages/
│   ├── shared/             # Shared code
│   │   └── src/
│   │       ├── types/          # TypeScript types
│   │       └── constants/      # API routes, errors
│   │
│   └── database/           # Prisma ORM
│       ├── prisma/
│       │   └── schema.prisma
│       └── src/
│           └── index.ts
│
├── storage/
│   └── cdn/
│       └── releases/       # Local release files
│           ├── latest.yml
│           └── *.dmg, *.exe
│
└── scripts/
    ├── setup.sh            # Initial setup
    ├── release-local.sh    # Build & deploy locally
    └── generate-latest-yml.mjs
```

## Authentication Flow

### Desktop App

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Desktop   │     │    API      │     │  Microsoft  │
│    App      │     │  Server     │     │    OAuth    │
└─────┬───────┘     └──────┬──────┘     └──────┬──────┘
      │                    │                   │
      │ 1. Get Auth URL    │                   │
      ├───────────────────>│                   │
      │                    │                   │
      │ 2. Auth URL        │                   │
      │<───────────────────│                   │
      │                    │                   │
      │ 3. Open Browser    │                   │
      ├────────────────────┼──────────────────>│
      │                    │                   │
      │ 4. User Login      │                   │
      │                    │                   │
      │ 5. Callback (code) │                   │
      │<───────────────────┼───────────────────│
      │                    │                   │
      │ 6. Exchange Code   │                   │
      ├───────────────────>│                   │
      │                    │ 7. Get Token      │
      │                    ├──────────────────>│
      │                    │                   │
      │                    │ 8. Xbox Auth      │
      │                    ├──────────────────>│
      │                    │                   │
      │                    │ 9. MC Auth        │
      │                    ├──────────────────>│
      │                    │                   │
      │                    │ 10. Check Owner   │
      │                    ├──────────────────>│
      │                    │                   │
      │ 11. JWT + Profile  │                   │
      │<───────────────────│                   │
      │                    │                   │
```

## Auto-Update Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Desktop   │     │    API      │     │  Local CDN  │
│    App      │     │  Server     │     │  (storage)  │
└─────┬───────┘     └──────┬──────┘     └──────┬──────┘
      │                    │                   │
      │ 1. Check Update    │                   │
      ├───────────────────>│ 2. Read latest.yml│
      │                    ├──────────────────>│
      │                    │<──────────────────│
      │ 3. Update Info     │                   │
      │<───────────────────│                   │
      │                    │                   │
      │ 4. Download        │                   │
      ├───────────────────>│ 5. Serve file     │
      │                    ├──────────────────>│
      │                    │<──────────────────│
      │ 6. Binary stream   │                   │
      │<───────────────────│                   │
      │                    │                   │
      │ 7. Verify SHA-512  │                   │
      │                    │                   │
      │ 8. Install         │                   │
      │                    │                   │
```

## Adding New Features

### New API Endpoint

1. Create route in `apps/api/src/routes/`:
```typescript
// apps/api/src/routes/myfeature.ts
import type { FastifyInstance } from "fastify";

export async function myFeatureRoutes(server: FastifyInstance) {
  server.get("/myfeature", async (request, reply) => {
    return { success: true, data: {} };
  });
}
```

2. Register in `apps/api/src/index.ts`:
```typescript
import { myFeatureRoutes } from "./routes/myfeature.js";
await server.register(myFeatureRoutes, { prefix: "/api/v1/myfeature" });
```

3. Add types in `packages/shared/src/types/index.ts`

### New Desktop Page

1. Create page in `apps/desktop/src/renderer/src/pages/`:
```tsx
// NewPage.tsx
export function NewPage() {
  return <div>New Page</div>;
}
```

2. Add route in `App.tsx`:
```tsx
<Route path="/newpage" element={<NewPage />} />
```

### New IPC Channel

1. Add channel in `packages/shared/src/types/index.ts`:
```typescript
export const IPC_CHANNELS = {
  // ...existing
  MY_CHANNEL: "my:channel",
} as const;
```

2. Handle in main process (`apps/desktop/src/main/...`)
3. Expose in preload (`apps/desktop/src/preload/index.ts`)
4. Use in renderer via `window.electron.myFeature.method()`

## Testing Updates Locally

1. Build initial version:
```bash
# In apps/desktop/package.json, set version: "1.0.0"
pnpm release:local
```

2. Build updated version:
```bash
# Change version to "1.0.1" in package.json
pnpm release:local
```

3. Install v1.0.0, run with API, it will detect v1.0.1

## Debugging

### API
```bash
pnpm dev:api
# Logs visible in terminal
```

### Desktop
```bash
pnpm dev:desktop
# DevTools: Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (macOS)
```

### Database
```bash
pnpm db:studio
# Opens Prisma Studio at http://localhost:5555
```
