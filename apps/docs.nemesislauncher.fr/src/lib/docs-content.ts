export const DOCS_SECTIONS = [
  {
    title: "Démarrage",
    icon: "Rocket",
    items: [
      { title: "Introduction", slug: "introduction" },
      { title: "Installation", slug: "installation" },
      { title: "Premier lancement", slug: "premier-lancement" },
      { title: "Configuration requise", slug: "configuration-requise" },
    ],
  },
  {
    title: "Guide d'utilisation",
    icon: "BookOpen",
    items: [
      { title: "Connexion Microsoft", slug: "connexion-microsoft" },
      { title: "Lancer Minecraft", slug: "lancer-minecraft" },
      { title: "Gestion des profils", slug: "gestion-profils" },
      { title: "Paramètres", slug: "parametres" },
    ],
  },
  {
    title: "Fonctionnalités",
    icon: "Settings",
    items: [
      { title: "Mises à jour automatiques", slug: "mises-a-jour" },
      { title: "Gestion de la mémoire", slug: "gestion-memoire" },
      { title: "Thèmes et apparence", slug: "themes" },
      { title: "Raccourcis clavier", slug: "raccourcis" },
    ],
  },
  {
    title: "Sécurité",
    icon: "Shield",
    items: [
      { title: "Authentification PKCE", slug: "authentification-pkce" },
      { title: "Stockage sécurisé", slug: "stockage-securise" },
      { title: "Confidentialité", slug: "confidentialite" },
    ],
  },
  {
    title: "Développeurs",
    icon: "Code",
    items: [
      { title: "API Reference", slug: "api-reference" },
      { title: "Architecture", slug: "architecture" },
      { title: "Build from source", slug: "build-source" },
    ],
  },
  {
    title: "Aide",
    icon: "HelpCircle",
    items: [
      { title: "FAQ", slug: "faq" },
      { title: "Dépannage", slug: "depannage" },
      { title: "Contact support", slug: "contact" },
    ],
  },
];

export const DOCS_CONTENT: Record<string, { title: string; description: string; content: string }> = {
  introduction: {
    title: "Introduction",
    description: "Découvrez Némésis Launcher, le launcher Minecraft moderne et sécurisé.",
    content: `
# Bienvenue sur Némésis Launcher

Némésis Launcher est un launcher Minecraft moderne, sécurisé et performant. Conçu avec les dernières technologies, il offre une expérience utilisateur fluide et intuitive.

## Pourquoi Némésis ?

- **Sécurité** : Authentification Microsoft avec PKCE, stockage sécurisé des tokens
- **Performance** : Application légère et rapide, mises à jour incrémentales
- **Simplicité** : Interface moderne et intuitive
- **Gratuit** : Téléchargement et utilisation gratuits

## Fonctionnalités principales

1. **Authentification Microsoft** : Connexion sécurisée avec votre compte Microsoft
2. **Mises à jour automatiques** : Toujours à jour sans intervention manuelle
3. **Multi-plateforme** : Windows, macOS et Linux supportés
4. **Personnalisation** : Thèmes, paramètres de mémoire, etc.

## Prérequis

- Un compte Microsoft avec Minecraft Java Edition
- Windows 10+, macOS 11+ ou Linux (Ubuntu 20.04+)
- Connexion internet pour l'authentification
    `,
  },
  installation: {
    title: "Installation",
    description: "Guide d'installation de Némésis Launcher sur Windows, macOS et Linux.",
    content: `
# Installation

## Téléchargement

Rendez-vous sur [cdn.nemesislauncher.fr](https://cdn.nemesislauncher.fr) pour télécharger la dernière version.

## Windows

1. Téléchargez \`Nemesis-Launcher-Setup.exe\`
2. Exécutez l'installateur
3. Suivez les instructions à l'écran
4. Lancez Némésis Launcher depuis le menu Démarrer

### Installation silencieuse

Pour une installation automatisée :

\`\`\`bash
Nemesis-Launcher-Setup.exe /S
\`\`\`

## macOS

1. Téléchargez \`Nemesis-Launcher.dmg\`
2. Ouvrez le fichier DMG
3. Glissez l'application dans le dossier Applications
4. Lancez depuis le Launchpad ou Spotlight

> **Note** : Au premier lancement, macOS peut demander une confirmation de sécurité. Allez dans Préférences Système > Sécurité pour autoriser l'application.

### Via Homebrew

\`\`\`bash
brew install --cask nemesis-launcher
\`\`\`

## Linux

1. Téléchargez \`Nemesis-Launcher.AppImage\`
2. Rendez le fichier exécutable : \`chmod +x Nemesis-Launcher.AppImage\`
3. Exécutez : \`./Nemesis-Launcher.AppImage\`

### Dépendances Linux

\`\`\`bash
# Ubuntu/Debian
sudo apt install libfuse2 libgtk-3-0

# Fedora
sudo dnf install fuse-libs gtk3

# Arch Linux
sudo pacman -S fuse2 gtk3
\`\`\`

### Formats alternatifs

- **.deb** : Pour Ubuntu/Debian - \`sudo dpkg -i nemesis-launcher.deb\`
- **.rpm** : Pour Fedora/RHEL - \`sudo rpm -i nemesis-launcher.rpm\`
- **Snap** : \`sudo snap install nemesis-launcher\`
    `,
  },
  "premier-lancement": {
    title: "Premier lancement",
    description: "Guide pour votre première utilisation de Némésis Launcher.",
    content: `
# Premier lancement

## Démarrage initial

Au premier lancement, Némésis Launcher va :

1. Créer les dossiers de configuration
2. Télécharger les assets nécessaires
3. Vérifier les mises à jour

## Connexion à votre compte

1. Cliquez sur **"Se connecter avec Microsoft"**
2. Une fenêtre de navigateur s'ouvre
3. Connectez-vous avec votre compte Microsoft
4. Autorisez l'application
5. Vous êtes automatiquement redirigé vers le launcher

## Configuration initiale

Après la connexion, configurez vos préférences :

### Mémoire RAM

- **Minimum recommandé** : 2 Go
- **Optimal pour vanilla** : 4 Go
- **Avec mods** : 6-8 Go

### Répertoire de jeu

Par défaut, Minecraft s'installe dans :

- **Windows** : \`%APPDATA%\\.minecraft\`
- **macOS** : \`~/Library/Application Support/minecraft\`
- **Linux** : \`~/.minecraft\`

## Lancer votre première partie

1. Sélectionnez la version de Minecraft
2. Cliquez sur **"Jouer"**
3. Le launcher télécharge les fichiers nécessaires
4. Minecraft se lance !
    `,
  },
  "configuration-requise": {
    title: "Configuration requise",
    description: "Prérequis système pour Némésis Launcher et Minecraft.",
    content: `
# Configuration requise

## Némésis Launcher

### Minimum

| Composant | Spécification |
|-----------|---------------|
| OS | Windows 10, macOS 11, Ubuntu 20.04 |
| RAM | 512 Mo |
| Stockage | 200 Mo |
| Connexion | Internet requise |

### Recommandé

| Composant | Spécification |
|-----------|---------------|
| OS | Windows 11, macOS 14, Ubuntu 24.04 |
| RAM | 1 Go |
| Stockage | 500 Mo (SSD) |
| Connexion | Fibre optique |

## Minecraft Java Edition

### Minimum

| Composant | Spécification |
|-----------|---------------|
| CPU | Intel Core i3 / AMD Athlon |
| RAM | 4 Go |
| GPU | Intel HD 4000 / AMD Radeon R5 |
| Stockage | 1 Go |

### Recommandé

| Composant | Spécification |
|-----------|---------------|
| CPU | Intel Core i5 / AMD Ryzen 5 |
| RAM | 8 Go |
| GPU | NVIDIA GTX 1060 / AMD RX 580 |
| Stockage | 4 Go (SSD) |

## Java

Némésis Launcher gère automatiquement l'installation de Java. Les versions supportées :

- **Minecraft 1.17+** : Java 17
- **Minecraft 1.18+** : Java 17
- **Minecraft 1.20.5+** : Java 21
    `,
  },
  "connexion-microsoft": {
    title: "Connexion Microsoft",
    description: "Guide détaillé de l'authentification Microsoft pour Minecraft.",
    content: `
# Connexion avec Microsoft

Némésis Launcher utilise l'authentification officielle Microsoft/Xbox Live pour accéder à Minecraft.

## Processus de connexion

1. Cliquez sur **"Se connecter avec Microsoft"**
2. Une fenêtre de navigateur s'ouvre automatiquement
3. Entrez vos identifiants Microsoft
4. Acceptez les permissions demandées
5. La fenêtre se ferme automatiquement
6. Vous êtes connecté !

## Permissions demandées

Le launcher demande l'accès à :

- **Profil Xbox Live** : Pour récupérer votre gamertag
- **Minecraft** : Pour vérifier votre licence

> **Important** : Nous n'avons jamais accès à votre mot de passe Microsoft.

## Sécurité PKCE

Nous utilisons le protocole **PKCE** (Proof Key for Code Exchange) :

- Aucun secret client stocké
- Protection contre les attaques d'interception
- Standard OAuth 2.0 recommandé

## Stockage des tokens

Vos tokens d'authentification sont stockés de manière sécurisée :

- **Windows** : Windows Credential Manager
- **macOS** : Keychain
- **Linux** : Secret Service (GNOME Keyring)

## Déconnexion

Pour vous déconnecter :

1. Cliquez sur votre avatar
2. Sélectionnez **"Déconnexion"**
3. Les tokens sont supprimés

## Problèmes courants

### "Impossible de se connecter"

1. Vérifiez votre connexion internet
2. Essayez en mode navigation privée
3. Désactivez temporairement votre VPN

### "Vous ne possédez pas Minecraft"

- Assurez-vous d'avoir Minecraft Java Edition associé à ce compte Microsoft
- La migration depuis Mojang est-elle terminée ?
    `,
  },
  "lancer-minecraft": {
    title: "Lancer Minecraft",
    description: "Comment lancer Minecraft avec Némésis Launcher.",
    content: `
# Lancer Minecraft

## Sélection de la version

1. Cliquez sur le sélecteur de version
2. Choisissez parmi :
   - **Release** : Versions stables officielles
   - **Snapshot** : Versions de test
   - **Beta/Alpha** : Anciennes versions

## Options de lancement

### Arguments JVM

Personnalisez les arguments Java :

\`\`\`
-XX:+UseG1GC
-XX:+ParallelRefProcEnabled
-XX:MaxGCPauseMillis=200
\`\`\`

### Mémoire

Ajustez l'allocation RAM :

- **Minimum** : 2 Go
- **Maximum** : Selon votre RAM disponible

## Premier téléchargement

Au premier lancement d'une version :

1. Téléchargement du client Minecraft
2. Téléchargement des libraries
3. Téléchargement des assets (sons, textures)
4. Extraction et vérification

> Le temps de téléchargement dépend de votre connexion.

## Raccourcis

- **Enter** : Lancer la version sélectionnée
- **Ctrl+L** : Ouvrir le dossier .minecraft
- **Ctrl+,** : Ouvrir les paramètres
    `,
  },
  "gestion-profils": {
    title: "Gestion des profils",
    description: "Créer et gérer vos profils de jeu.",
    content: `
# Gestion des profils

## Créer un profil

1. Cliquez sur **"Nouveau profil"**
2. Nommez votre profil
3. Sélectionnez la version Minecraft
4. Configurez les options
5. Enregistrez

## Options de profil

### Version

- Sélectionnez une version spécifique
- Activez/désactivez les snapshots

### Répertoire de jeu

Isolez vos installations :

\`\`\`
./profiles/modded/
./profiles/vanilla/
./profiles/serveur-ami/
\`\`\`

### Arguments

Personnalisez par profil :

- Arguments JVM
- Allocation mémoire
- Résolution de fenêtre

## Importer/Exporter

### Exporter un profil

1. Clic droit sur le profil
2. **"Exporter"**
3. Choisissez l'emplacement

### Importer

1. **"Importer un profil"**
2. Sélectionnez le fichier .json

## Profils par défaut

- **Latest Release** : Dernière version stable
- **Latest Snapshot** : Dernière snapshot
    `,
  },
  parametres: {
    title: "Paramètres",
    description: "Configuration complète de Némésis Launcher.",
    content: `
# Paramètres

## Général

### Langue

Sélectionnez parmi :
- Français
- English
- Deutsch
- Español
- 日本語

### Thème

- **Sombre** (par défaut)
- **Clair**
- **Système** (suit les préférences OS)

### Démarrage

- Ouvrir au démarrage de l'ordinateur
- Minimiser dans la barre système
- Vérifier les mises à jour automatiquement

## Java

### Détection automatique

Le launcher détecte les installations Java sur votre système.

### Installation personnalisée

Spécifiez un chemin Java personnalisé :

\`\`\`
/usr/lib/jvm/java-17-openjdk/bin/java
\`\`\`

### Arguments JVM globaux

S'appliquent à tous les profils :

\`\`\`
-XX:+UseG1GC -Dsun.rmi.dgc.server.gcInterval=2147483646
\`\`\`

## Réseau

### Proxy

Configurez un proxy si nécessaire :
- HTTP
- SOCKS5

### Téléchargements

- Limite de bande passante
- Téléchargements parallèles (1-10)

## Avancé

### Logs

- Niveau de détail : Info, Debug, Trace
- Emplacement des logs
- Rotation automatique

### Réinitialisation

- Effacer le cache
- Réinitialiser les paramètres
- Supprimer les données
    `,
  },
  "mises-a-jour": {
    title: "Mises à jour automatiques",
    description: "Comment fonctionnent les mises à jour de Némésis Launcher.",
    content: `
# Mises à jour automatiques

## Fonctionnement

Némésis Launcher vérifie les mises à jour à chaque démarrage :

1. Connexion au serveur de mise à jour
2. Comparaison des versions
3. Téléchargement différentiel
4. Installation automatique
5. Redémarrage si nécessaire

## Mises à jour différentielles

Seuls les fichiers modifiés sont téléchargés, réduisant :
- Le temps de mise à jour
- La bande passante utilisée

## Canaux de mise à jour

### Stable (recommandé)

- Versions testées et validées
- Mises à jour moins fréquentes
- Maximum de stabilité

### Beta

- Nouvelles fonctionnalités en avant-première
- Peut contenir des bugs
- Aidez-nous à tester !

## Notifications

Configurez les alertes :
- Notification système
- Badge sur l'icône
- Popup dans l'application

## Mise à jour manuelle

Si nécessaire :

1. Menu **"Aide"**
2. **"Vérifier les mises à jour"**
3. Téléchargez et installez

## Rollback

En cas de problème :

1. Téléchargez une version antérieure sur cdn.nemesislauncher.fr
2. Installez par-dessus la version actuelle
    `,
  },
  "gestion-memoire": {
    title: "Gestion de la mémoire",
    description: "Optimiser l'allocation mémoire pour Minecraft.",
    content: `
# Gestion de la mémoire

## Allocation recommandée

| Type de jeu | RAM minimum | RAM recommandée |
|-------------|-------------|-----------------|
| Vanilla | 2 Go | 4 Go |
| Mods légers | 4 Go | 6 Go |
| Modpacks | 6 Go | 8-10 Go |
| Shaders | 4 Go | 8 Go |

## Configuration

Dans les paramètres :

1. Ouvrez **"Java"**
2. Ajustez le curseur de mémoire
3. Ou entrez une valeur précise

## Arguments avancés

### Garbage Collector G1GC (recommandé)

\`\`\`
-XX:+UseG1GC
-XX:+ParallelRefProcEnabled
-XX:MaxGCPauseMillis=200
-XX:+UnlockExperimentalVMOptions
-XX:+DisableExplicitGC
-XX:+AlwaysPreTouch
-XX:G1NewSizePercent=30
-XX:G1MaxNewSizePercent=40
-XX:G1HeapRegionSize=8M
-XX:G1ReservePercent=20
-XX:G1HeapWastePercent=5
-XX:G1MixedGCCountTarget=4
-XX:InitiatingHeapOccupancyPercent=15
-XX:G1MixedGCLiveThresholdPercent=90
-XX:G1RSetUpdatingPauseTimePercent=5
-XX:SurvivorRatio=32
-XX:+PerfDisableSharedMem
-XX:MaxTenuringThreshold=1
\`\`\`

## Surveillance

Le launcher affiche en temps réel :
- Mémoire utilisée
- Mémoire allouée
- Activité du GC

## Erreur "Out of Memory"

Si vous rencontrez cette erreur :

1. Augmentez la RAM allouée
2. Fermez les applications en arrière-plan
3. Réduisez la distance de rendu
4. Désactivez certains mods
    `,
  },
  themes: {
    title: "Thèmes et apparence",
    description: "Personnaliser l'apparence de Némésis Launcher.",
    content: `
# Thèmes et apparence

## Thèmes intégrés

### Sombre (par défaut)

Design élégant avec fond noir et accents violets Némésis.

### Clair

Interface lumineuse pour les environnements bien éclairés.

### Système

S'adapte automatiquement aux préférences de votre système d'exploitation.

## Personnalisation

### Couleur d'accent

Choisissez parmi :
- Violet Némésis (par défaut)
- Bleu
- Vert
- Orange
- Rose
- Personnalisée (hex)

### Police

- **Inter** (par défaut)
- **Minecraft** (style pixelisé)
- **System** (police système)

### Taille de l'interface

- Compact
- Normal
- Large

## Fond d'écran

Personnalisez l'arrière-plan :

1. **"Paramètres"** > **"Apparence"**
2. **"Fond personnalisé"**
3. Sélectionnez une image

Formats supportés : PNG, JPG, WebP

## Mode compact

Réduisez l'interface pour les petits écrans :
- Barre latérale rétractable
- Icônes seulement
- Informations essentielles
    `,
  },
  raccourcis: {
    title: "Raccourcis clavier",
    description: "Liste des raccourcis clavier disponibles.",
    content: `
# Raccourcis clavier

## Navigation

| Raccourci | Action |
|-----------|--------|
| \`Ctrl+,\` | Paramètres |
| \`Ctrl+L\` | Ouvrir dossier .minecraft |
| \`Ctrl+P\` | Profils |
| \`Ctrl+D\` | Téléchargements |
| \`Escape\` | Fermer le panneau actuel |

## Lancement

| Raccourci | Action |
|-----------|--------|
| \`Enter\` | Lancer Minecraft |
| \`Ctrl+Enter\` | Lancer avec options |
| \`Ctrl+K\` | Tuer le processus Minecraft |

## Compte

| Raccourci | Action |
|-----------|--------|
| \`Ctrl+Shift+A\` | Changer de compte |
| \`Ctrl+Shift+D\` | Déconnexion |

## Fenêtre

| Raccourci | Action |
|-----------|--------|
| \`Ctrl+M\` | Minimiser |
| \`Ctrl+Q\` | Quitter |
| \`F11\` | Plein écran |
| \`Ctrl+R\` | Rafraîchir |

## Personnalisation

Modifiez les raccourcis dans **"Paramètres"** > **"Raccourcis"**.
    `,
  },
  "authentification-pkce": {
    title: "Authentification PKCE",
    description: "Comment fonctionne l'authentification sécurisée PKCE.",
    content: `
# Authentification PKCE

## Qu'est-ce que PKCE ?

**PKCE** (Proof Key for Code Exchange) est une extension du protocole OAuth 2.0 conçue pour sécuriser l'authentification des applications publiques.

## Pourquoi PKCE ?

Les applications desktop ne peuvent pas stocker de secret client de manière sécurisée. PKCE résout ce problème en utilisant un mécanisme de challenge/vérification.

## Fonctionnement

### 1. Génération du code verifier

Le launcher génère un code aléatoire cryptographiquement sécurisé :

\`\`\`
code_verifier = random(43-128 caractères)
\`\`\`

### 2. Création du challenge

Un hash SHA-256 est créé à partir du verifier :

\`\`\`
code_challenge = BASE64URL(SHA256(code_verifier))
\`\`\`

### 3. Demande d'autorisation

Le launcher redirige vers Microsoft avec le challenge :

\`\`\`
https://login.live.com/oauth20_authorize.srf
  ?client_id=...
  &redirect_uri=...
  &response_type=code
  &scope=XboxLive.signin
  &code_challenge=...
  &code_challenge_method=S256
\`\`\`

### 4. Échange du code

Après connexion, le code d'autorisation est échangé avec le verifier :

\`\`\`
POST /oauth20_token.srf
  code=...
  &code_verifier=...
\`\`\`

Microsoft vérifie que \`SHA256(code_verifier) == code_challenge\`.

## Avantages

- ✅ Pas de secret client stocké
- ✅ Protection contre l'interception
- ✅ Standard recommandé par l'IETF
- ✅ Utilisé par Microsoft, Google, Apple

## Références

- [RFC 7636 - PKCE](https://tools.ietf.org/html/rfc7636)
- [Documentation Microsoft](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow)
    `,
  },
  "stockage-securise": {
    title: "Stockage sécurisé",
    description: "Comment vos données sont stockées de manière sécurisée.",
    content: `
# Stockage sécurisé

## Tokens d'authentification

Vos tokens Microsoft/Xbox Live sont stockés dans le gestionnaire de secrets natif de votre système d'exploitation.

### Windows

**Windows Credential Manager**

Les tokens sont chiffrés et stockés dans :
\`\`\`
Panneau de configuration > Gestionnaire d'identification
\`\`\`

### macOS

**Keychain**

Stockage dans le trousseau système :
\`\`\`
Applications > Utilitaires > Trousseaux d'accès
\`\`\`

### Linux

**Secret Service / GNOME Keyring**

Compatible avec :
- GNOME Keyring
- KDE Wallet
- KeePassXC

## Chiffrement

### Au repos

Les données sensibles sont chiffrées avec :
- **Windows** : DPAPI
- **macOS** : AES-256 via Keychain
- **Linux** : Selon le backend (généralement AES)

### En transit

Toutes les communications utilisent HTTPS/TLS 1.3.

## Données stockées localement

| Donnée | Emplacement | Chiffré |
|--------|-------------|---------|
| Tokens Microsoft | Credential Manager | ✅ |
| Préférences | config.json | ❌ |
| Cache | cache/ | ❌ |
| Logs | logs/ | ❌ |

## Suppression des données

Pour supprimer toutes vos données :

1. **"Paramètres"** > **"Avancé"**
2. **"Supprimer toutes les données"**
3. Confirmez

Ou manuellement :

\`\`\`bash
# Windows
%APPDATA%\\Nemesis Launcher

# macOS
~/Library/Application Support/Nemesis Launcher

# Linux
~/.config/nemesis-launcher
\`\`\`
    `,
  },
  confidentialite: {
    title: "Confidentialité",
    description: "Notre politique de confidentialité et de protection des données.",
    content: `
# Confidentialité

## Données collectées

### Ce que nous collectons

- **Anonymement** : Version du launcher, OS, erreurs (si activé)
- **Jamais** : Mot de passe, tokens, données personnelles

### Ce que nous ne collectons PAS

- ❌ Identifiants Microsoft
- ❌ Historique de jeu
- ❌ Fichiers personnels
- ❌ Position géographique

## Télémétrie

### Activée (par défaut)

Données anonymes envoyées :
- Version du launcher
- Système d'exploitation
- Erreurs critiques
- Statistiques d'utilisation agrégées

### Désactivée

Aucune donnée envoyée. Pour désactiver :

1. **"Paramètres"** > **"Confidentialité"**
2. Désactivez **"Télémétrie"**

## Services tiers

### Microsoft

L'authentification passe par les serveurs Microsoft :
- [Politique de confidentialité Microsoft](https://privacy.microsoft.com)

### Mojang/Minecraft

Pour le téléchargement des assets :
- [Politique de confidentialité Mojang](https://www.minecraft.net/privacy)

## Vos droits (RGPD)

- **Accès** : Exportez vos données depuis les paramètres
- **Suppression** : Supprimez toutes vos données locales
- **Portabilité** : Exportez vos profils en JSON

## Contact

Pour toute question sur la confidentialité :

📧 contact@nemesislauncher.fr
    `,
  },
  "api-reference": {
    title: "API Reference",
    description: "Documentation de l'API Némésis Launcher.",
    content: `
# API Reference

## Vue d'ensemble

L'API Némésis est une API REST qui permet d'interagir avec les services du launcher.

**Base URL** : \`https://api.nemesislauncher.fr\`

## Authentification

Certains endpoints nécessitent une authentification via token Bearer :

\`\`\`
Authorization: Bearer <token>
\`\`\`

## Endpoints publics

### GET /health

Vérifier l'état du service.

**Réponse** :
\`\`\`json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00Z"
}
\`\`\`

### GET /versions

Lister les versions Minecraft disponibles.

**Paramètres** :
- \`type\` : release, snapshot, old_beta, old_alpha

**Réponse** :
\`\`\`json
{
  "latest": {
    "release": "1.21",
    "snapshot": "24w07a"
  },
  "versions": [...]
}
\`\`\`

## Endpoints authentifiés

### GET /user/profile

Récupérer le profil utilisateur.

**Réponse** :
\`\`\`json
{
  "id": "uuid",
  "username": "Steve",
  "skin": "...",
  "cape": "..."
}
\`\`\`

### POST /auth/microsoft

Authentification Microsoft (usage interne).

## Rate Limiting

- **Public** : 100 requêtes/minute
- **Authentifié** : 1000 requêtes/minute

Headers de réponse :
\`\`\`
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704067200
\`\`\`

## Erreurs

\`\`\`json
{
  "error": "NOT_FOUND",
  "message": "Resource not found",
  "status": 404
}
\`\`\`
    `,
  },
  architecture: {
    title: "Architecture",
    description: "Architecture technique de Némésis Launcher.",
    content: `
# Architecture

## Vue d'ensemble

Némésis Launcher est construit avec une architecture moderne et modulaire.

## Stack technique

### Desktop App

- **Framework** : Electron 32
- **Frontend** : React 18 + TypeScript
- **UI** : Tailwind CSS
- **State** : Zustand
- **Build** : electron-builder

### Backend

- **Runtime** : Node.js 20
- **Framework** : Fastify
- **Database** : PostgreSQL + Prisma
- **Cache** : Redis

### Infrastructure

- **Hosting** : Cloud auto-hébergé
- **CDN** : Cloudflare
- **CI/CD** : GitHub Actions

## Structure du projet

\`\`\`
nemesis-launcher/
├── apps/
│   ├── desktop/         # Application Electron
│   ├── api/             # Backend Fastify
│   ├── www/             # Site web
│   ├── docs/            # Documentation
│   ├── cdn/             # Page téléchargements
│   └── status/          # Page statut
├── packages/
│   ├── database/        # Prisma client
│   └── shared/          # Code partagé
└── docs/                # Documentation dev
\`\`\`

## Communication IPC

Le main process et le renderer communiquent via IPC :

\`\`\`typescript
// Main process
ipcMain.handle('auth:login', async () => {
  return await microsoftAuth.login();
});

// Renderer
const result = await window.api.auth.login();
\`\`\`

## Sécurité

- Context Isolation activé
- Node Integration désactivé
- Preload scripts pour l'API
- CSP strict
    `,
  },
  "build-source": {
    title: "Build from source",
    description: "Compiler Némésis Launcher depuis le code source.",
    content: `
# Build from source

> **Note** : Cette section est fournie à titre informatif. La modification et redistribution du code est interdite sans autorisation.

## Prérequis

- Node.js 20+
- pnpm 9+
- Git

## Cloner le repository

\`\`\`bash
git clone https://github.com/nemesis-launcher/nemesis-launcher.git
cd nemesis-launcher
\`\`\`

## Installation des dépendances

\`\`\`bash
pnpm install
\`\`\`

## Configuration

Copiez le fichier d'environnement :

\`\`\`bash
cp .env.example .env
\`\`\`

Configurez les variables :

\`\`\`env
DATABASE_URL="postgresql://..."
MICROSOFT_CLIENT_ID="..."
\`\`\`

## Développement

Lancer en mode développement :

\`\`\`bash
pnpm dev
\`\`\`

## Build production

### Desktop

\`\`\`bash
pnpm build:desktop
\`\`\`

Outputs dans \`apps/desktop/dist/\`

### Tous les packages

\`\`\`bash
pnpm build
\`\`\`

## Tests

\`\`\`bash
pnpm test
pnpm test:e2e
\`\`\`

## Lint

\`\`\`bash
pnpm lint
pnpm lint:fix
\`\`\`
    `,
  },
  faq: {
    title: "FAQ",
    description: "Questions fréquemment posées.",
    content: `
# FAQ

## Général

### Némésis Launcher est-il gratuit ?

Oui, Némésis Launcher est entièrement gratuit.

### Sur quelles plateformes fonctionne-t-il ?

Windows 10+, macOS 11+ et Linux (Ubuntu 20.04+, Fedora 36+, Arch).

### Ai-je besoin d'un compte Microsoft ?

Oui, un compte Microsoft avec Minecraft Java Edition est requis.

## Installation

### Où sont stockés les fichiers de jeu ?

Dans le dossier standard Minecraft de votre système d'exploitation :
- Windows : \`%APPDATA%\\.minecraft\`
- macOS : \`~/Library/Application Support/minecraft\`
- Linux : \`~/.minecraft\`

### Comment mettre à jour le launcher ?

Les mises à jour sont automatiques. Le launcher vérifie et installe les nouvelles versions au démarrage.

## Sécurité

### Mes identifiants sont-ils en sécurité ?

Oui, nous utilisons PKCE et le stockage sécurisé du système d'exploitation (Keychain sur macOS, Credential Manager sur Windows).

### Le launcher est-il open source ?

Non, Némésis Launcher est un logiciel propriétaire. Le code source est visible sur GitHub pour la transparence, mais son utilisation, copie ou modification est interdite sans autorisation.

## Support

### Comment signaler un bug ?

Ouvrez une issue sur notre GitHub ou contactez-nous sur Discord.

### Où trouver de l'aide ?

- Documentation : docs.nemesislauncher.fr
- Discord : discord.nemesislauncher.fr
- Email : contact@nemesislauncher.fr
    `,
  },
  depannage: {
    title: "Dépannage",
    description: "Solutions aux problèmes courants.",
    content: `
# Dépannage

## Problèmes d'installation

### Windows : "Windows protected your PC"

1. Cliquez sur **"Plus d'infos"**
2. Cliquez sur **"Exécuter quand même"**

### macOS : "Application non vérifiée"

1. Ouvrez **Préférences Système** > **Sécurité et confidentialité**
2. Cliquez sur **"Ouvrir quand même"**

### Linux : Permission denied

\`\`\`bash
chmod +x Nemesis-Launcher.AppImage
\`\`\`

## Problèmes de connexion

### "Impossible de se connecter à Microsoft"

1. Vérifiez votre connexion internet
2. Désactivez votre VPN
3. Essayez en navigation privée
4. Videz le cache du launcher

### "Vous ne possédez pas Minecraft"

- Vérifiez que Minecraft Java Edition est lié à votre compte Microsoft
- Si vous aviez un compte Mojang, assurez-vous d'avoir migré

## Problèmes de performance

### Lag / FPS bas

1. Augmentez la RAM allouée
2. Réduisez la distance de rendu
3. Désactivez les shaders
4. Fermez les applications en arrière-plan

### Crash au lancement

1. Vérifiez les logs : \`logs/latest.log\`
2. Mettez à jour vos pilotes graphiques
3. Réinstallez Java

## Problèmes de mods

### "Mod incompatible"

Vérifiez la compatibilité de version entre :
- Minecraft
- Forge/Fabric
- Le mod

### Crash avec mods

1. Retirez les mods récemment ajoutés
2. Vérifiez les conflits de mods
3. Consultez le crash report

## Réinitialisation

### Réinitialiser le launcher

1. **Paramètres** > **Avancé** > **Réinitialiser**

### Réinstallation complète

1. Désinstallez le launcher
2. Supprimez le dossier de configuration
3. Réinstallez

## Logs

Emplacement des logs :

- Windows : \`%APPDATA%\\Nemesis Launcher\\logs\`
- macOS : \`~/Library/Logs/Nemesis Launcher\`
- Linux : \`~/.config/nemesis-launcher/logs\`
    `,
  },
  contact: {
    title: "Contact support",
    description: "Comment nous contacter pour obtenir de l'aide.",
    content: `
# Contact support

## Discord

Rejoignez notre serveur Discord pour une aide rapide de la communauté :

🔗 [discord.nemesislauncher.fr](https://discord.nemesislauncher.fr)

Canaux disponibles :
- **#support** : Posez vos questions
- **#bugs** : Signalez les bugs
- **#suggestions** : Proposez des améliorations

## GitHub

Pour les problèmes techniques ou les bugs reproductibles :

🔗 [github.com/nemesis-launcher](https://github.com/nemesis-launcher)

### Ouvrir une issue

1. Vérifiez que le problème n'existe pas déjà
2. Utilisez le template approprié
3. Incluez les logs et informations système

## Email

Pour les questions privées ou professionnelles :

📧 contact@nemesislauncher.fr

Temps de réponse : 24-48h

## Informations à fournir

Pour un support efficace, incluez :

- **Version du launcher** : Dans "À propos"
- **Système d'exploitation** : Windows/macOS/Linux + version
- **Logs** : Fichier \`logs/latest.log\`
- **Étapes de reproduction** : Décrivez comment reproduire le problème
- **Captures d'écran** : Si pertinent

## FAQ

Avant de nous contacter, consultez :

- [FAQ](/faq)
- [Dépannage](/depannage)
    `,
  },
};

export function getAllDocSlugs(): string[] {
  return DOCS_SECTIONS.flatMap(section => section.items.map(item => item.slug));
}

export function getDocContent(slug: string) {
  return DOCS_CONTENT[slug] || null;
}

export function getNextPrevDocs(currentSlug: string) {
  const allSlugs = getAllDocSlugs();
  const currentIndex = allSlugs.indexOf(currentSlug);
  
  return {
    prev: currentIndex > 0 ? allSlugs[currentIndex - 1] : null,
    next: currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null,
  };
}
