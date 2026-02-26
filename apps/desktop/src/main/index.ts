import { app, BrowserWindow, ipcMain, shell } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import { autoUpdater } from "electron-updater";
import Store from "electron-store";
import { IPC_CHANNELS } from "@nemesis/shared";
import { setupAuthHandlers } from "./handlers/auth";
import { setupUpdateHandlers } from "./handlers/update";
import { setupStoreHandlers } from "./handlers/store";

// Secure store for tokens
const store = new Store({
  encryptionKey: process.env.ENCRYPTION_KEY || "dev-encryption-key",
  name: "nemesis-secure",
});

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    show: false,
    frame: false, // Custom titlebar
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 15, y: 15 },
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // Load renderer
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// ===================================
// APP LIFECYCLE
// ===================================

app.whenReady().then(() => {
  // Security: Set app user model id
  electronApp.setAppUserModelId("fr.nemesislauncher.app");

  // Dev tools shortcut in development
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // Setup IPC handlers
  setupAuthHandlers(ipcMain, store);
  setupUpdateHandlers(ipcMain, autoUpdater, mainWindow);
  setupStoreHandlers(ipcMain, store);
  setupWindowHandlers();

  createWindow();

  // Check for updates (in production)
  if (!is.dev) {
    autoUpdater.checkForUpdatesAndNotify();
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ===================================
// WINDOW HANDLERS
// ===================================

function setupWindowHandlers(): void {
  ipcMain.on(IPC_CHANNELS.WINDOW_MINIMIZE, () => {
    mainWindow?.minimize();
  });

  ipcMain.on(IPC_CHANNELS.WINDOW_MAXIMIZE, () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });

  ipcMain.on(IPC_CHANNELS.WINDOW_CLOSE, () => {
    mainWindow?.close();
  });

  ipcMain.handle(IPC_CHANNELS.SYSTEM_INFO, () => ({
    platform: process.platform,
    arch: process.arch,
    version: app.getVersion(),
    electron: process.versions.electron,
    node: process.versions.node,
    chrome: process.versions.chrome,
  }));
}
