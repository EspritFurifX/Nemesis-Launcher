# Local CDN Storage

Ce dossier simule un CDN local pour le développement.

## Structure

```
storage/cdn/
├── releases/           # Fichiers de release
│   ├── latest.yml      # Info version générique
│   ├── latest-darwin.yml
│   ├── latest-win32.yml
│   ├── latest-linux.yml
│   └── *.dmg, *.exe, *.AppImage
└── README.md
```

## Utilisation

Les releases sont accessibles via l'API :
- `GET http://localhost:4000/cdn/releases/latest.yml`
- `GET http://localhost:4000/cdn/releases/Nemesis-Launcher-1.0.0-x64.dmg`

## Génération des releases

Utiliser le script de release :
```bash
pnpm release:local
```

Ce script va :
1. Build l'application desktop
2. Générer les checksums SHA-512
3. Créer les fichiers latest*.yml
4. Copier les binaires dans ce dossier
