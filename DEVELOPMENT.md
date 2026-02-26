# Scripts de Développement

## 🚀 Commandes Principales

### `pnpm dev` (par défaut - recommandé)
Lance **tous les services web** en parallèle (~9 services).

**Services lancés :**
1. www.nemesislauncher.fr (port 3000)
2. app.nemesislauncher.fr (port 3002)
3. cdn.nemesislauncher.fr (port 3003)
4. docs.nemesislauncher.fr (port 3004)
5. status.nemesislauncher.fr (port 3005)
6. blog.nemesislauncher.fr (port 3006)
7. admin.nemesislauncher.fr (port 3007)
8. play.nemesislauncher.fr (port 3008)
9. api.nemesislauncher.fr (port 3333)

```bash
pnpm dev
```

✅ Le desktop est exclu (erreur de build Electron à corriger)

### `pnpm dev:fast`
Pré-compilation + démarrage de tous les services.
```bash
pnpm dev:fast
```

---

## 🎯 Variantes

### `pnpm dev:desktop`
Lance SEULEMENT l'app Electron (à corriger)

### `pnpm dev:sites`  
Lance seulement les 8 Next.js (www, app, cdn, docs, status, blog, admin, play) sans API

### `pnpm dev:api`
Lance seulement l'API Fastify

### `pnpm dev:www`
Lance le site principal uniquement

---

## ⚡ Optimisations

Chaque Next.js app inclut :
- **SWC caching** : 10 pages pré-compilées en buffer
- **Compilation rapide** : SWC minify activé
-  **onDemandEntries** : 10 minutes inactivité avant unload

---

## 🐛 Problèmes Connus

### Desktop Electron
Erreur build Vite avec "@electron-toolkit/utils" non résolvable. 
- **Workaround** : Exclure du dev avec `--filter=!@nemesis/desktop`
- **À corriger** : electron-vite.config.ts ou ajouter la dépendance manquante

---

## 🔍 Debug

### Tuer tous les services
```bash
pkill -f "next dev"
pkill -f turbo
pkill -f tsx
```

### Port déjà utilisé
```bash
lsof -i :3000
kill -9 <PID>
```

### Modules manquants
```bash
rm -rf node_modules .turbo
pnpm install
pnpm dev
```

### Voir les logs d'une app spécifique
```bash
pnpm dev:www              # Juste www
pnpm --filter @nemesis/api run dev  # Juste API
```

