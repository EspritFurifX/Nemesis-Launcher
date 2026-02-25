#!/bin/bash

# Script de build pour toutes les releases Nemesis Launcher
# Génère les versions DMG (macOS), AppImage (Linux) et Dev

set -e  # Arrête le script en cas d'erreur

# Couleurs pour l'output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_step() {
    echo -e "${BLUE}==>${NC} ${1}"
}

print_success() {
    echo -e "${GREEN}✓${NC} ${1}"
}

print_error() {
    echo -e "${RED}✗${NC} ${1}"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} ${1}"
}

# Variables
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"  # Se placer dans le répertoire du projet
DIST_DIR="${PROJECT_DIR}/dist"
BUILD_DATE=$(date "+%Y-%m-%d_%H-%M-%S")
VERSION=$(node -p "require('./package.json').version")

# Affichage du header
echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}     🚀 Nemesis Launcher - Build All Releases      ${BLUE}║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Version: ${GREEN}${VERSION}${NC}"
echo -e "Date: ${YELLOW}${BUILD_DATE}${NC}"
echo ""

# Vérification de l'environnement
print_step "Vérification de l'environnement..."

if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi

print_success "Node.js $(node -v) détecté"
print_success "npm $(npm -v) détecté"
echo ""

# Installation des dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    print_step "Installation des dépendances..."
    npm install
    print_success "Dépendances installées"
    echo ""
fi

# Nettoyage du dossier dist
if [ -d "$DIST_DIR" ]; then
    print_step "Nettoyage du dossier de distribution..."
    rm -rf "$DIST_DIR"
    print_success "Dossier dist nettoyé"
    echo ""
fi

# Menu de sélection
if [ -z "$1" ]; then
    echo -e "${YELLOW}Quelle(s) version(s) voulez-vous build ?${NC}"
    echo "1) Toutes les versions (Windows + macOS + Linux)"
    echo "2) Windows uniquement (EXE)"
    echo "3) macOS uniquement (DMG)"
    echo "4) Linux uniquement (AppImage)"
    echo "5) Dev build (version de développement)"
    echo ""
    read -p "Votre choix [1-5]: " choice
else
    choice=$1
    print_step "Mode automatique: option ${choice}"
    echo ""
fi

case $choice in
    1)
        print_step "Build de toutes les versions..."
        echo ""
        
        # Windows Build
        print_step "🪟 Building Windows (EXE)..."
        npm run dist:win
        print_success "Build Windows terminé"
        echo ""
        
        # macOS Build
        print_step "📦 Building macOS (DMG)..."
        npm run dist:mac
        print_success "Build macOS terminé"
        echo ""
        
        # Linux Build
        print_step "🐧 Building Linux (AppImage)..."
        npm run dist:linux
        print_success "Build Linux terminé"
        echo ""
        ;;
    2)
        print_step "🪟 Building Windows uniquement..."
        npm run dist:win
        print_success "Build Windows terminé"
        echo ""
        ;;
    3)
        print_step "📦 Building macOS uniquement..."
        npm run dist:mac
        print_success "Build macOS terminé"
        echo ""
        ;;
    4)
        print_step "🐧 Building Linux uniquement..."
        npm run dist:linux
        print_success "Build Linux terminé"
        echo ""
        ;;
    5)
        print_step "🔧 Building version de développement..."
        npm run dist
        print_success "Build Dev terminé"
        echo ""
        ;;
    *)
        print_error "Choix invalide"
        exit 1
        ;;
esac

# Affichage des fichiers générés
if [ -d "$DIST_DIR" ]; then
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║${NC}          ✓ Build terminé avec succès !             ${GREEN}║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════╝${NC}"
    echo ""
    print_step "Fichiers générés dans ${DIST_DIR}:"
    echo ""
    
    # Liste les fichiers avec leurs tailles
    cd "$DIST_DIR"
    for file in *; do
        if [ -f "$file" ]; then
            size=$(du -h "$file" | cut -f1)
            echo -e "  ${GREEN}▸${NC} ${file} ${YELLOW}(${size})${NC}"
        fi
    done
    
    echo ""
    echo -e "${BLUE}📂 Dossier de distribution:${NC} ${DIST_DIR}"
    echo ""
else
    print_error "Erreur: le dossier dist n'a pas été créé"
    exit 1
fi

# Option pour ouvrir le dossier
read -p "Voulez-vous ouvrir le dossier dist ? [o/N]: " open_dist
if [[ $open_dist =~ ^[Oo]$ ]]; then
    open "$DIST_DIR" 2>/dev/null || xdg-open "$DIST_DIR" 2>/dev/null || echo "Impossible d'ouvrir le dossier automatiquement"
fi

echo ""
print_success "Script terminé !"
