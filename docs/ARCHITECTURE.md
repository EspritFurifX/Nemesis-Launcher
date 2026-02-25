# Nemesis Launcher

Modern, high-performance Minecraft launcher with Microsoft authentication.

## Architecture

```
nemesis-launcher/
├── apps/
│   ├── api/            # Fastify backend (port 4000)
│   ├── desktop/        # Electron + React app
│   └── web/            # Next.js website (port 3000)
├── packages/
│   ├── shared/         # Shared types & constants
│   └── database/       # Prisma ORM
├── storage/
│   └── cdn/            # Local CDN for releases
├── scripts/            # Build & release scripts
└── docker-compose.yml  # PostgreSQL dev database
```

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (optional, for PostgreSQL)

### Setup

```bash
# 1. Clone and install
git clone <repo>
cd nemesis-launcher
pnpm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your Microsoft OAuth credentials

# 3. Setup database (choose one)

# Option A: PostgreSQL with Docker
docker compose up -d
pnpm db:push

# Option B: SQLite (edit .env first)
# DATABASE_URL="file:./dev.db"
pnpm db:push

# 4. Build shared packages
pnpm --filter @nemesis/shared build
pnpm --filter @nemesis/database build

# 5. Start development
pnpm dev
```

### Development Commands

```bash
# Start all apps in parallel
pnpm dev

# Start individual apps
pnpm dev:api      # API at http://localhost:4000
pnpm dev:web      # Web at http://localhost:3000
pnpm dev:desktop  # Electron app

# Build
pnpm build
pnpm build:desktop

# Database
pnpm db:push      # Push schema to database
pnpm db:studio    # Open Prisma Studio
pnpm db:generate  # Regenerate Prisma client

# Release (local CDN)
pnpm release:local
```

## Microsoft OAuth Setup

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
   - Name: `Nemesis Launcher`
   - Supported account types: **Personal Microsoft accounts only**
4. Add redirect URIs:
   - `http://localhost:3000/auth/callback` (Web)
   - `http://localhost:45678/auth/callback` (Desktop)
5. Copy **Application (client) ID** to `.env` as `MICROSOFT_CLIENT_ID`
6. Create a client secret and copy to `MICROSOFT_CLIENT_SECRET`

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/auth/login` | Get OAuth URL |
| POST | `/api/v1/auth/callback` | Exchange code for tokens |
| POST | `/api/v1/auth/refresh` | Refresh tokens |
| POST | `/api/v1/auth/logout` | Logout |
| GET | `/api/v1/auth/session` | Get current session |

### User

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/user/profile` | Get user profile |
| GET | `/api/v1/user/entitlements` | Check Minecraft ownership |

### CDN

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/cdn/latest` | Get latest version info |
| POST | `/api/v1/cdn/check-update` | Check for updates |
| GET | `/api/v1/cdn/releases` | List all releases |
| GET | `/api/v1/cdn/download/:file` | Download release file |

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/ready` | Readiness probe |

## Local Release Flow

1. **Build desktop app**
   ```bash
   pnpm --filter @nemesis/desktop build
   pnpm --filter @nemesis/desktop release
   ```

2. **Copy to local CDN**
   ```bash
   ./scripts/release-local.sh
   ```

3. **Test auto-update**
   - Start API: `pnpm dev:api`
   - Releases available at `http://localhost:4000/cdn/releases/`
   - Desktop app will check this URL for updates

## Security Best Practices

### Development

- ✅ All tokens encrypted with `electron-store`
- ✅ Context isolation enabled in Electron
- ✅ CSP headers configured
- ✅ Rate limiting on API
- ✅ JWT with expiration
- ✅ SHA-512 verification for downloads

### Production Checklist

- [ ] Enable HTTPS everywhere
- [ ] Use secure httpOnly cookies
- [ ] Implement CSRF protection
- [ ] Add request signing
- [ ] Code signing for desktop app
- [ ] Security audit

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL or SQLite connection | - |
| `MICROSOFT_CLIENT_ID` | Azure app client ID | - |
| `MICROSOFT_CLIENT_SECRET` | Azure app client secret | - |
| `JWT_SECRET` | JWT signing secret | - |
| `API_PORT` | API server port | 4000 |
| `CDN_STORAGE_PATH` | Path to CDN storage | ./storage/cdn |

## License

MIT
