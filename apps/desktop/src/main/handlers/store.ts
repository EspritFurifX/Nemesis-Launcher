import type { IpcMain } from "electron";
import type Store from "electron-store";
import { IPC_CHANNELS } from "@nemesis/shared";

export function setupStoreHandlers(ipcMain: IpcMain, store: Store): void {
  
  // ===================================
  // GET VALUE
  // ===================================
  ipcMain.handle(IPC_CHANNELS.STORE_GET, (_, key: string) => {
    return store.get(key);
  });

  // ===================================
  // SET VALUE
  // ===================================
  ipcMain.handle(IPC_CHANNELS.STORE_SET, (_, key: string, value: unknown) => {
    store.set(key, value);
    return { success: true };
  });

  // ===================================
  // DELETE VALUE
  // ===================================
  ipcMain.handle(IPC_CHANNELS.STORE_DELETE, (_, key: string) => {
    store.delete(key);
    return { success: true };
  });
}
