# Configuration des Versions Minecraft

## 📋 Fichier de Distribution

Le fichier `distribution.json` configure toutes les versions de Minecraft disponibles dans le Nemesis Launcher.

### 🎮 Versions Disponibles

Le launcher est actuellement configuré avec 5 versions de Minecraft :

1. **Minecraft 1.20.1** (Serveur principal)
   - Forge 47.2.0
   - Java 17+ requis
   - RAM recommandée : 4 GB

2. **Minecraft 1.19.4**
   - Forge 45.2.0
   - Java 17+ requis
   - RAM recommandée : 4 GB

3. **Minecraft 1.18.2**
   - Forge 40.2.0
   - Java 17+ requis
   - RAM recommandée : 3 GB

4. **Minecraft 1.16.5**
   - Forge 36.2.39
   - Java 8-16
   - RAM recommandée : 3 GB

5. **Minecraft 1.12.2** (Legacy)
   - Forge 14.23.5.2859
   - Java 8
   - RAM recommandée : 2.5 GB

## 🌐 Hébergement du Fichier

Pour utiliser ce fichier de distribution, vous devez :

### Option 1 : GitHub (Gratuit et Recommandé)

1. Commitez le fichier `distribution.json` sur votre repo GitHub
2. Utilisez l'URL raw GitHub :
   ```
   https://raw.githubusercontent.com/espritfurtifx/nemesis-client/main/distribution.json
   ```

### Option 2 : Votre Serveur Web

1. Uploadez `distribution.json` sur votre serveur
2. Assurez-vous qu'il est accessible publiquement
3. Utilisez l'URL directe vers le fichier

### Option 3 : Services Cloud (GitHub Pages, Cloudflare, etc.)

## 🔧 Configuration du Launcher

Pour que le launcher utilise votre fichier de distribution :

1. Ouvrez `app/assets/js/distromanager.js`
2. Modifiez la ligne `REMOTE_DISTRO_URL` :
   ```javascript
   exports.REMOTE_DISTRO_URL = 'VOTRE_URL_ICI/distribution.json'
   ```

## 📝 Personnalisation

### Ajouter une Version

Copiez un bloc "server" existant et modifiez :

```json
{
    "id": "nemesis-1.XX.X",
    "name": "Votre Nom",
    "description": "Votre description",
    "minecraftVersion": "1.XX.X",
    "address": "votre-serveur.fr",
    "mainServer": false,
    "modules": [
        {
            "id": "net.minecraftforge:forge:VERSION",
            "type": "ForgeHosted",
            "artifact": {
                "url": "URL_DU_FORGE_INSTALLER"
            }
        }
    ]
}
```

### Modifier le Serveur Par Défaut

Changez `"mainServer": true` pour le serveur que vous voulez par défaut.

### Ajouter des Mods

Ajoutez des modules de type `ForgeMod` dans le tableau `modules` :

```json
{
    "id": "com.example:mod-id:1.0.0",
    "name": "Mon Mod",
    "type": "ForgeMod",
    "required": {
        "value": true
    },
    "artifact": {
        "size": 123456,
        "MD5": "hash_md5_du_fichier",
        "url": "https://url-vers-votre-mod.jar"
    }
}
```

### Configuration Discord Rich Presence

Modifiez le `clientId` Discord pour votre propre application :

```json
"discord": {
    "clientId": "VOTRE_CLIENT_ID",
    "smallImageText": "Nemesis Launcher",
    "smallImageKey": "seal-circle"
}
```

## 🔍 Validation

Utilisez [Nebula](https://github.com/dscalzi/Nebula) pour générer et valider automatiquement votre distribution.

Ou validez manuellement avec un validateur JSON en ligne.

## 📚 Documentation Complète

Pour plus de détails, consultez :
- [docs/distro.md](docs/distro.md) - Documentation complète du format
- [docs/sample_distribution.json](docs/sample_distribution.json) - Exemple détaillé
- [helios-distribution-types](https://github.com/dscalzi/helios-distribution-types) - Types TypeScript

## 🚀 Utilisation

Une fois configuré :

1. Committez et poussez votre `distribution.json`
2. Mettez à jour `distromanager.js` avec la bonne URL
3. Rebuild le launcher
4. Les utilisateurs verront toutes les versions dans le menu serveur

Les utilisateurs pourront changer de version via le bouton serveur dans le launcher.
