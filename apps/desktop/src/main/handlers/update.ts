import type { IpcMain, BrowserWindow } from "electron";
import type { AppUpdater } from "electron-updater";
import { IPC_CHANNELS } from "@nemesis/shared";

export function setupUpdateHandlers(
  ipcMain: IpcMain, 
  autoUpdater: AppUpdater,
  mainWindow: BrowserWindow | null
): void {
  
  // Configure auto-updater
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  
  // Set update feed URL (local CDN)
  const feedUrl = process.env.LOCAL_CDN_URL || "http://localhost:4000/cdn/releases";
  autoUpdater.setFeedURL({
    provider: "generic",
    url: feedUrl,
  });

  // ===================================
  // CHECK FOR UPDATES
  // ===================================
  ipcMain.handle(IPC_CHANNELS.UPDATE_CHECK, async () => {
    try {
      const result = await autoUpdater.checkForUpdates();
      
      if (result?.updateInfo) {
        return {
          success: true,
          data: {
            updateAvailable: true,
            version: result.updateInfo.version,
            releaseDate: result.updateInfo.releaseDate,
            releaseNotes: result.updateInfo.releaseNotes,
          },
        };
      }
      
      return {
        success: true,
        data: { updateAvailable: false },
      };
      
    } catch (error) {
      console.error("Update check failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Update check failed",
      };
    }
  });

  // ===================================
  // DOWNLOAD UPDATE
  // ===================================
  ipcMain.handle(IPC_CHANNELS.UPDATE_DOWNLOAD, async () => {
    try {
      await autoUpdater.downloadUpdate();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Download failed",
      };
    }
  });

  // ===================================
  // INSTALL UPDATE
  // ===================================
  ipcMain.handle(IPC_CHANNELS.UPDATE_INSTALL, () => {
    autoUpdater.quitAndInstall(false, true);
    return { success: true };
  });

  // ===================================
  // UPDATE EVENTS
  // ===================================
  
  autoUpdater.on("checking-for-update", () => {
    sendToRenderer("update:status", { status: "checking" });
  });

  autoUpdater.on("update-available", (info) => {
    sendToRenderer("update:status", { 
      status: "available", 
      version: info.version,
    });
  });

  autoUpdater.on("update-not-available", () => {
    sendToRenderer("update:status", { status: "not-available" });
  });

  autoUpdater.on("download-progress", (progress) => {
    sendToRenderer(IPC_CHANNELS.UPDATE_PROGRESS, {
      percent: progress.percent,
      bytesPerSecond: progress.bytesPerSecond,
      transferred: progress.transferred,
      total: progress.total,
    });
  });

  autoUpdater.on("update-downloaded", (info) => {
    sendToRenderer("update:status", { 
      status: "downloaded", 
      version: info.version,
    });
  });

  autoUpdater.on("error", (error) => {
    sendToRenderer("update:status", { 
      status: "error", 
      error: error.message,
    });
  });

  function sendToRenderer(channel: string, data: unknown): void {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send(channel, data);
    }
  }
}
