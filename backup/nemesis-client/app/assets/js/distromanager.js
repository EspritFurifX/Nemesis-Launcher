const { DistributionAPI } = require('helios-core/common')

const ConfigManager = require('./configmanager')

// Nemesis Launcher Distribution URL
// Hébergez votre distribution.json sur GitHub ou votre serveur
exports.REMOTE_DISTRO_URL = 'https://raw.githubusercontent.com/EspritFurifX/Nemesis-Launcher/main/nemesis-client/distribution.json'

const api = new DistributionAPI(
    ConfigManager.getLauncherDirectory(),
    null, // Injected forcefully by the preloader.
    null, // Injected forcefully by the preloader.
    exports.REMOTE_DISTRO_URL,
    false
)

exports.DistroAPI = api