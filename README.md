# Nemesis Launcher

A modern, high-performance Minecraft launcher with Microsoft authentication.

## Features

- **Microsoft OAuth2 Authentication** - Sign in with your Microsoft account
- **Minecraft Ownership Validation** - Only valid licenses accepted, no offline mode
- **Auto-Updates** - Automatic updates with SHA-512 verification
- **Secure Token Storage** - Encrypted local storage for authentication tokens
- **Modern Stack** - Built with Electron, React, Next.js, and Fastify

## Quick Start

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env
# Edit .env with your Microsoft OAuth credentials

# Start database (PostgreSQL via Docker)
docker compose up -d
pnpm db:push

# Build shared packages
pnpm --filter @nemesis/shared build
pnpm --filter @nemesis/database build

# Start development (all apps)
pnpm dev
```

## Apps

| App | Port | Description |
|-----|------|-------------|
| `apps/api` | 4000 | Fastify API backend |
| `apps/web` | 3000 | Next.js website |
| `apps/desktop` | - | Electron + React launcher |

## Development Commands

```bash
pnpm dev           # Start all apps
pnpm dev:api       # Start API only
pnpm dev:web       # Start web only
pnpm dev:desktop   # Start desktop only
pnpm build         # Build all apps
pnpm release:local # Build desktop & deploy to local CDN
```

## Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Developer Guide](docs/DEVELOPER_GUIDE.md)

## License

MIT
