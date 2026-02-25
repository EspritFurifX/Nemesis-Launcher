#!/bin/bash
# ===========================================
# NEMESIS LAUNCHER - LOCAL RELEASE SCRIPT
# ===========================================
# Ce script build l'application desktop et copie
# les releases vers le CDN local pour les tests.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
DESKTOP_DIR="$ROOT_DIR/apps/desktop"
CDN_DIR="$ROOT_DIR/storage/cdn/releases"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Nemesis Launcher - Local Release${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""

# Check platform
PLATFORM=$(uname -s | tr '[:upper:]' '[:lower:]')
case "$PLATFORM" in
  darwin*)
    PLATFORM_FLAG="--mac"
    PLATFORM_NAME="darwin"
    ;;
  linux*)
    PLATFORM_FLAG="--linux"
    PLATFORM_NAME="linux"
    ;;
  mingw*|cygwin*|msys*)
    PLATFORM_FLAG="--win"
    PLATFORM_NAME="win32"
    ;;
  *)
    echo -e "${RED}Unsupported platform: $PLATFORM${NC}"
    exit 1
    ;;
esac

echo -e "${YELLOW}Platform: ${PLATFORM_NAME}${NC}"
echo ""

# Step 1: Build packages
echo -e "${YELLOW}[1/4] Building shared packages...${NC}"
cd "$ROOT_DIR"
pnpm --filter @nemesis/shared run build
pnpm --filter @nemesis/database run build

# Step 2: Build desktop app
echo -e "${YELLOW}[2/4] Building desktop application...${NC}"
cd "$DESKTOP_DIR"
pnpm run build
pnpm exec electron-builder $PLATFORM_FLAG --publish never

# Step 3: Copy files to CDN
echo -e "${YELLOW}[3/4] Copying release files to CDN...${NC}"
RELEASE_DIR="$DESKTOP_DIR/release"

# Create CDN directory if not exists
mkdir -p "$CDN_DIR"

# Find and copy release files
find "$RELEASE_DIR" -maxdepth 1 \( -name "*.dmg" -o -name "*.exe" -o -name "*.AppImage" -o -name "*.zip" \) -exec cp {} "$CDN_DIR/" \;

# Copy yml files
find "$RELEASE_DIR" -maxdepth 1 -name "*.yml" -exec cp {} "$CDN_DIR/" \;

# Step 4: Generate checksums
echo -e "${YELLOW}[4/4] Generating SHA-512 checksums...${NC}"
cd "$CDN_DIR"

# Generate latest.yml with proper checksums
node "$SCRIPT_DIR/generate-latest-yml.mjs"

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Release completed successfully!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "Release files available at:"
echo "  $CDN_DIR"
echo ""
echo "Start the API server to serve releases:"
echo "  pnpm dev:api"
echo ""
echo "Releases will be available at:"
echo "  http://localhost:4000/cdn/releases/"
