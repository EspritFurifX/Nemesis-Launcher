# 🔥 CHECKLIST MIGRATION : HeliosLauncher → NÉMÉSIS CLIENT

## ✅ STATUS : Base clonée - Prêt pour modification

**Repository cloné :** `/Users/espritfurtifx/github/Minecraft/nemesis-client`

---

## 📋 PHASE 1 : BRANDING & IDENTITÉ (PRIORITAIRE)

### 1.1 - Fichiers de configuration principaux

#### ✏️ `package.json` (LIGNE 1-10)
```json
"name": "helioslauncher" → "nemesis-client"
"productName": "Helios Launcher" → "NÉMÉSIS CLIENT"
"description": "Modded Minecraft Launcher" → "Launcher Minecraft Java Edition Officiel"
"author": "Daniel Scalzi" → "VotreNom/Votre Équipe"
"homepage": URL GitHub → Votre URL
```

**Action :** ✅ Modifier identité projet
**Criticalité :** 🔴 OBLIGATOIRE
**Toucher à l'auth :** ❌ NON

---

#### ✏️ `electron-builder.yml` (LIGNE 1-5)
```yaml
appId: 'helioslauncher' → 'nemesisclient'
productName: 'Helios Launcher' → 'NÉMÉSIS CLIENT'
copyright: → Votre copyright
```

**Action :** ✅ Configuration build
**Criticalité :** 🔴 OBLIGATOIRE
**Toucher à l'auth :** ❌ NON

---

#### ✏️ `README.md`
- Remplacer **Helios Launcher** par **NÉMÉSIS CLIENT**
- Mettre à jour description
- Ajouter vos liens (Discord, site, etc.)

**Action :** ✅ Documentation
**Criticalité :** 🟡 RECOMMANDÉ
**Toucher à l'auth :** ❌ NON

---

### 1.2 - Assets visuels

#### 📁 `build/` (Icônes application)
- `icon.icns` (macOS)
- `icon.ico` (Windows)
- `icon.png` (Linux)

**Action :** 🎨 Remplacer par logo NÉMÉSIS
**Criticalité :** 🔴 OBLIGATOIRE (identité visuelle)
**Toucher à l'auth :** ❌ NON

---

#### 📁 `app/assets/images/`
- Logo launcher
- Background
- Splash screen
- Icônes UI

**Action :** 🎨 Rebrand complet
**Criticalité :** 🔴 OBLIGATOIRE
**Toucher à l'auth :** ❌ NON

---

### 1.3 - Textes & Traductions

#### 📁 `app/assets/lang/*.json`
Fichiers :
- `en_US.json` (Anglais)
- Autres langues...

**Rechercher & Remplacer :**
- "Helios Launcher" → "NÉMÉSIS CLIENT"
- "Helios" → "Némésis"
- Descriptions / slogans

**Action :** ✅ Localisation
**Criticalité :** 🟡 RECOMMANDÉ
**Toucher à l'auth :** ❌ NON

---

## 📋 PHASE 2 : AUTHENTIFICATION MICROSOFT (CRITIQUE)

### ⚠️ RÈGLE ABSOLUE

**❌ NE PAS MODIFIER LE CODE D'AUTHENTIFICATION**
**✅ UNIQUEMENT CONFIGURER LE CLIENT_ID**

---

### 2.1 - Azure App Registration (À FAIRE AVANT)

**Prérequis externes :**
1. Créer Azure App sur `portal.azure.com`
2. Configurer :
   - Account types: **Personal Microsoft accounts only**
   - Allow public client flows: **YES**
   - Redirect URI: **AUCUN**
3. Copier le **CLIENT_ID**

**Documentation :** `AZURE_SETUP.md` (déjà fourni)

---

### 2.2 - Configuration CLIENT_ID dans Helios

**Fichier à chercher :** 
```bash
grep -r "msftauth" app/
grep -r "CLIENT_ID" app/
```

**Action :**
- Trouver où Helios stocke le CLIENT_ID
- Remplacer par VOTRE CLIENT_ID Azure
- **NE RIEN MODIFIER D'AUTRE**

**Criticalité :** 🔴 CRITIQUE
**Toucher au flow :** ❌ JAMAIS

---

## 📋 PHASE 3 : UI/UX PERSONNALISATION (OPTIONNEL)

### 3.1 - Thème & Couleurs

#### 📁 `app/assets/css/`
- Palette couleurs (cyan → votre cyan Némésis)
- Glassmorphism
- Hover effects

**Action :** 🎨 Personnalisation thème
**Criticalité :** 🟢 OPTIONNEL
**Toucher à l'auth :** ❌ NON

---

### 3.2 - Templates EJS

#### 📁 `app/*.ejs`
Fichiers :
- `landing.ejs` (page principale)
- `login.ejs` (page connexion)
- `settings.ejs` (paramètres)

**Modifications autorisées :**
- Titres / textes
- Mise en page
- Logo / images

**Modifications interdites :**
- Logique JavaScript d'auth
- Appels API Microsoft
- Gestion des tokens

**Criticalité :** 🟡 RECOMMANDÉ
**Toucher à l'auth :** ❌ NON (sauf UI pure)

---

## 📋 PHASE 4 : DISTRIBUTION & BUILD

### 4.1 - Scripts de build

**Déjà configurés dans `package.json` :**
```bash
npm run dist:win   # Windows
npm run dist:mac   # macOS
npm run dist:linux # Linux
```

**Action :** ✅ Tester après modifications
**Criticalité :** 🔴 OBLIGATOIRE (avant release)

---

### 4.2 - Signature & Notarization (Production)

#### Windows
- Certificat code signing

#### macOS
- Apple Developer Account
- Notarization

**Action :** 🔐 Sécurité (phase finale)
**Criticalité :** 🟡 PRODUCTION UNIQUEMENT

---

## 🚫 INTERDICTIONS ABSOLUES

### ❌ À NE JAMAIS FAIRE

1. Réécrire l'authentification Microsoft
2. Ajouter un mode offline/crack
3. Bypasser la vérification de licence Minecraft
4. Modifier les appels API Xbox/Minecraft Services
5. Supprimer le Device Code Flow
6. Utiliser un CLIENT_ID non autorisé
7. Hardcoder des credentials

**Conséquence :** 💥 Launcher non fonctionnel / bannissable

---

## ✅ VALIDATION PRÉ-RELEASE

### Checklist finale :

- [ ] Tous les "Helios" → "Némésis" remplacés
- [ ] Logo / icônes personnalisés
- [ ] CLIENT_ID Azure configuré
- [ ] Authentification testée avec VOTRE compte Microsoft
- [ ] Licence Minecraft vérifiée (ownership check)
- [ ] Build Windows/Mac/Linux fonctionnels
- [ ] Aucun mode offline présent
- [ ] README.md à jour

---

## 📊 RÉSUMÉ TECHNIQUE

| Composant | Action | Toucher Auth | Priorité |
|-----------|--------|--------------|----------|
| package.json | Renommer | ❌ | 🔴 |
| electron-builder.yml | Rebrand | ❌ | 🔴 |
| Assets (logo/images) | Remplacer | ❌ | 🔴 |
| Lang files | Traduire | ❌ | 🟡 |
| Azure CLIENT_ID | Configurer | ✅ (config seule) | 🔴 |
| Code auth Helios | **NE PAS TOUCHER** | ❌ | 🚫 |
| CSS/Thème | Personnaliser | ❌ | 🟢 |

---

## 🎯 PROCHAINE ÉTAPE

**Maintenant que la checklist est claire :**

1. **Créer une branche Git :** `git checkout -b rebrand-nemesis`
2. **Suivre la PHASE 1** (branding)
3. **Tester régulièrement :** `npm start`
4. **NE PAS COMMIT avant validation complète**

**Commencer par :** ✏️ Modifier `package.json` (première ligne)

---

## 📞 SUPPORT

**Si erreur :**
- Vérifier que les fichiers JSON sont valides
- S'assurer que Node.js 20.x est installé
- Consulter les logs : `npm start` en mode dev

**Ne JAMAIS :**
- Modifier `node_modules/`
- Toucher `libraries/` (natifs Minecraft)
- Éditer les scripts d'auth Helios

---

**🔥 Base stable + Branding Némésis = Launcher production-ready**
