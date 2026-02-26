import { IpcMainInvokeEvent } from "electron";
import { spawn } from "child_process";
import { join } from "path";
import { app, dialog } from "electron";
import Store from "electron-store";
import { IPC_CHANNELS } from "@nemesis/shared";
import fs from "fs";
import os from "os";

interface GameLaunchConfig {
  accessToken: string;
  uuid: string;
  name: string;
  version?: string;
  server?: {
    ip: string;
    port: number;
  };
  jvmArgs?: string[];
}

export function setupGameHandlers(ipcMain: any, store: Store): void {
  const gameDataDir = join(app.getPath("documents"), "Nemesis", "game-data");
  
  // Ensure game data directory exists
  if (!fs.existsSync(gameDataDir)) {
    fs.mkdirSync(gameDataDir, { recursive: true });
  }

  // ===================================
  // GET INSTALLED VERSIONS
  // ===================================
  ipcMain.handle("game:get-installed-versions", async () => {
    try {
      const versionsDir = join(gameDataDir, "versions");
      if (!fs.existsSync(versionsDir)) {
        return [];
      }
      
      const versions = fs
        .readdirSync(versionsDir)
        .filter(f => fs.statSync(join(versionsDir, f)).isDirectory())
        .sort()
        .reverse();
      
      return versions;
    } catch (error) {
      console.error("Error getting installed versions:", error);
      return [];
    }
  });

  // ===================================
  // GET JAVA PATHS
  // ===================================
  ipcMain.handle("game:get-java-paths", async () => {
    const platform = process.platform;
    const paths = [];

    if (platform === "win32") {
      // Windows Java paths
      const commonPaths = [
        "C:\\Program Files\\Java",
        "C:\\Program Files (x86)\\Java",
        join(app.getPath("home"), "AppData", "Local", "Programs", "AdoptOpenJDK"),
      ];

      for (const basePath of commonPaths) {
        if (fs.existsSync(basePath)) {
          const versions = fs.readdirSync(basePath);
          for (const version of versions) {
            const javaPath = join(basePath, version, "bin", "java.exe");
            if (fs.existsSync(javaPath)) {
              paths.push(javaPath);
            }
          }
        }
      }
    } else if (platform === "darwin") {
      // macOS Java paths
      const basePath = "/Library/Java/JavaVirtualMachines";
      if (fs.existsSync(basePath)) {
        const versions = fs.readdirSync(basePath);
        for (const version of versions) {
          const javaPath = join(basePath, version, "Contents", "Home", "bin", "java");
          if (fs.existsSync(javaPath)) {
            paths.push(javaPath);
          }
        }
      }
      // Also check homebrew
      const brewPath = "/usr/local/Cellar/openjdk";
      if (fs.existsSync(brewPath)) {
        paths.push("/usr/local/bin/java");
      }
    } else if (platform === "linux") {
      // Linux Java paths
      const commonPaths = [
        "/usr/bin/java",
        "/usr/lib/jvm",
        join(app.getPath("home"), ".jdks"),
      ];

      for (const basePath of commonPaths) {
        if (fs.existsSync(basePath)) {
          const findCommand = `find ${basePath} -name java -type f 2>/dev/null`;
          try {
            const which = require("child_process").execSync(findCommand, { encoding: "utf-8" });
            which.split("\n").forEach((line: string) => {
              if (line && fs.existsSync(line)) {
                paths.push(line);
              }
            });
          } catch (e) {
            // Ignore errors
          }
        }
      }
    }

    return [...new Set(paths)]; // Remove duplicates
  });

  // ===================================
  // LAUNCH GAME
  // ===================================
  ipcMain.handle("game:launch", async (_: IpcMainInvokeEvent, config: GameLaunchConfig) => {
    try {
      const javaPath = (store.get("settings.javaPath") as string) || "java";
      const gameVersion = config.version || "latest-1.20";
      
      // Default JVM args
      const jvmArgs = config.jvmArgs || [
        "-Xmx4G",
        "-Xms1G",
        "-XX:+UseG1GC",
        "-XX:MaxGCPauseMillis=130",
        "-XX:+UnlinkSymbolsOnQuit",
        "-XX:+ParallelRefProcEnabled",
      ];

      const args = [
        ...jvmArgs,
        "-Djava.library.path=" + join(gameDataDir, "natives"),
        "-Dminecraft.launcher.brand=nemesis",
        "-Dminecraft.launcher.version=1.0.0",
        "-cp",
        buildClasspath(gameDataDir, gameVersion),
        "net.minecraft.client.main.Main",
        "--username", config.name,
        "--uuid", config.uuid,
        "--accessToken", config.accessToken,
        "--userProperties", "{}",
        "--assetIndex", "5",
        "--assetsDir", join(gameDataDir, "assets"),
        "--gameDir", join(gameDataDir, "minecraft"),
        "--clientId",  "1de77a97-5d9d-48c5-845c-e57c4c38f2a0",
      ];

      if (config.server?.ip && config.server?.port) {
        args.push("--server", config.server.ip);
        args.push("--port", String(config.server.port));
      }

      console.log("Launching Minecraft with args:", args);

      const childProcess = spawn(javaPath, args, {
        detached: true,
        stdio: "ignore",
        env: {
          ...process.env,
          JAVA_TOOL_OPTIONS: "",
        },
      });

      // Don't wait for the process to complete
      childProcess.unref();

      return {
        success: true,
        message: "Game launched successfully",
        pid: childProcess.pid,
      };
    } catch (error) {
      console.error("Error launching game:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to launch game",
      };
    }
  });

  // ===================================
  // GET GAME DATA PATH
  // ===================================
  ipcMain.handle("game:get-data-path", async () => {
    return gameDataDir;
  });

  // ===================================
  // SET JAVA PATH
  // ===================================
  ipcMain.handle("game:set-java-path", async (_: IpcMainInvokeEvent, javaPath: string) => {
    try {
      store.set("settings.javaPath", javaPath);
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  });

  // ===================================
  // SET JVM ARGS
  // ===================================
  ipcMain.handle("game:set-jvm-args", async (_: IpcMainInvokeEvent, args: string[]) => {
    try {
      store.set("settings.jvmArgs", args);
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  });
}

function buildClasspath(gameDataDir: string, version: string): string {
  const libsDir = join(gameDataDir, "libraries");
  const versionsDir = join(gameDataDir, "versions", version);

  let classpath = join(versionsDir, `${version}.jar`);

  if (fs.existsSync(libsDir)) {
    const getAllJars = (dir: string): string[] => {
      let jars: string[] = [];
      try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = join(dir, file);
          if (fs.statSync(fullPath).isDirectory()) {
            jars = jars.concat(getAllJars(fullPath));
          } else if (file.endsWith(".jar")) {
            jars.push(fullPath);
          }
        }
      } catch (e) {
        // Ignore errors
      }
      return jars;
    };

    const jars = getAllJars(libsDir);
    classpath += ":" + jars.join(":");
  }

  return classpath;
}
