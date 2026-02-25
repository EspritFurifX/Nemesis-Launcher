import { contextBridge, ipcRenderer } from "electron";
import { IPC_CHANNELS } from "@nemesis/shared";

// Type-safe API exposed to renderer
const electronAPI = {
  // Auth
  auth: {
    login: () => ipcRenderer.invoke(IPC_CHANNELS.AUTH_LOGIN),
    logout: () => ipcRenderer.invoke(IPC_CHANNELS.AUTH_LOGOUT),
    getSession: () => ipcRenderer.invoke(IPC_CHANNELS.AUTH_GET_SESSION),
    refresh: () => ipcRenderer.invoke(IPC_CHANNELS.AUTH_REFRESH),
  },
  
  // Updates
  update: {
    check: () => ipcRenderer.invoke(IPC_CHANNELS.UPDATE_CHECK),
    download: () => ipcRenderer.invoke(IPC_CHANNELS.UPDATE_DOWNLOAD),
    install: () => ipcRenderer.invoke(IPC_CHANNELS.UPDATE_INSTALL),
    onProgress: (callback: (progress: unknown) => void) => {
      const handler = (_: unknown, data: unknown) => callback(data);
      ipcRenderer.on(IPC_CHANNELS.UPDATE_PROGRESS, handler);
      return () => ipcRenderer.removeListener(IPC_CHANNELS.UPDATE_PROGRESS, handler);
    },
    onStatus: (callback: (status: unknown) => void) => {
      const handler = (_: unknown, data: unknown) => callback(data);
      ipcRenderer.on("update:status", handler);
      return () => ipcRenderer.removeListener("update:status", handler);
    },
  },
  
  // Store
  store: {
    get: (key: string) => ipcRenderer.invoke(IPC_CHANNELS.STORE_GET, key),
    set: (key: string, value: unknown) => ipcRenderer.invoke(IPC_CHANNELS.STORE_SET, key, value),
    delete: (key: string) => ipcRenderer.invoke(IPC_CHANNELS.STORE_DELETE, key),
  },
  
  // Window
  window: {
    minimize: () => ipcRenderer.send(IPC_CHANNELS.WINDOW_MINIMIZE),
    maximize: () => ipcRenderer.send(IPC_CHANNELS.WINDOW_MAXIMIZE),
    close: () => ipcRenderer.send(IPC_CHANNELS.WINDOW_CLOSE),
  },
  
  // System
  system: {
    getInfo: () => ipcRenderer.invoke(IPC_CHANNELS.SYSTEM_INFO),
  },
};

// Expose to renderer
contextBridge.exposeInMainWorld("electron", electronAPI);

// Type declaration for renderer
export type ElectronAPI = typeof electronAPI;
