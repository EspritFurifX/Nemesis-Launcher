#!/bin/bash
set -e

echo "🔨 Pré-compilation de toutes les pages..."

# Compiler toutes les apps en parallèle
echo "📦 Build des sites + API..."
pnpm turbo run build --filter=@nemesis/www --filter=@nemesis/app --filter=@nemesis/cdn-web --filter=@nemesis/docs --filter=@nemesis/status --filter=@nemesis/blog --filter=@nemesis/admin --filter=@nemesis/play --filter=@nemesis/api --parallel

echo "✅ Pré-compilation terminée!"
echo ""
echo "🚀 Démarrage de tous les services..."
echo ""
echo "Ports attribués:"
echo "  www:    http://localhost:3000"
echo "  app:    http://localhost:3002"
echo "  cdn:    http://localhost:3003"
echo "  docs:   http://localhost:3004"
echo "  status: http://localhost:3005"
echo "  blog:   http://localhost:3006"
echo "  admin:  http://localhost:3007"
echo "  play:   http://localhost:3008"
echo "  api:    http://localhost:3333"
echo ""

# Démarrer les services en parallèle
pnpm turbo run dev --parallel --filter=!@nemesis/desktop
