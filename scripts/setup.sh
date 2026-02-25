#!/bin/bash
# ===========================================
# NEMESIS LAUNCHER - DEVELOPMENT SETUP
# ===========================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Nemesis Launcher - Development Setup${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo -e "${RED}Error: Node.js 20+ required (found v$(node -v))${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
  echo -e "${YELLOW}Installing pnpm...${NC}"
  npm install -g pnpm
fi
echo -e "${GREEN}✓ pnpm $(pnpm -v)${NC}"

# Check Docker (optional for PostgreSQL)
if command -v docker &> /dev/null; then
  echo -e "${GREEN}✓ Docker available${NC}"
else
  echo -e "${YELLOW}! Docker not found (PostgreSQL won't work, use SQLite instead)${NC}"
fi

echo ""
echo -e "${YELLOW}[1/4] Installing dependencies...${NC}"
cd "$ROOT_DIR"
pnpm install

echo ""
echo -e "${YELLOW}[2/4] Building shared packages...${NC}"
pnpm --filter @nemesis/shared run build
pnpm --filter @nemesis/database run build

echo ""
echo -e "${YELLOW}[3/4] Setting up environment...${NC}"
if [ ! -f "$ROOT_DIR/.env" ]; then
  cp "$ROOT_DIR/.env.example" "$ROOT_DIR/.env"
  echo -e "${GREEN}✓ Created .env from .env.example${NC}"
  echo -e "${YELLOW}! Please edit .env and add your Microsoft OAuth credentials${NC}"
else
  echo -e "${GREEN}✓ .env already exists${NC}"
fi

echo ""
echo -e "${YELLOW}[4/4] Generating Prisma client...${NC}"
cd "$ROOT_DIR/packages/database"
pnpm exec prisma generate

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Setup completed successfully!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "Next steps:"
echo ""
echo -e "  ${BLUE}1. Configure Microsoft OAuth:${NC}"
echo -e "     - Go to https://portal.azure.com"
echo -e "     - Create app registration"
echo -e "     - Add redirect URIs:"
echo -e "       http://localhost:3000/auth/callback"
echo -e "       http://localhost:45678/auth/callback"
echo -e "     - Copy Client ID/Secret to .env"
echo ""
echo -e "  ${BLUE}2. Setup database (choose one):${NC}"
echo ""
echo -e "     PostgreSQL (with Docker):"
echo -e "       docker run -d --name nemesis-db \\"
echo -e "         -e POSTGRES_USER=nemesis \\"
echo -e "         -e POSTGRES_PASSWORD=nemesis_secure_pwd \\"
echo -e "         -e POSTGRES_DB=nemesis_db \\"
echo -e "         -p 5432:5432 postgres:16"
echo -e "       pnpm db:push"
echo ""
echo -e "     SQLite (simpler):"
echo -e "       Edit .env: DATABASE_URL=\"file:./dev.db\""
echo -e "       Edit packages/database/prisma/schema.prisma: provider = \"sqlite\""
echo -e "       pnpm db:push"
echo ""
echo -e "  ${BLUE}3. Start development:${NC}"
echo -e "       pnpm dev          # All apps"
echo -e "       pnpm dev:api      # API only"
echo -e "       pnpm dev:web      # Web only"
echo -e "       pnpm dev:desktop  # Desktop only"
echo ""
