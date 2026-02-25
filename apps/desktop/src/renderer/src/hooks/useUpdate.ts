import { useState, useEffect, useCallback } from "react";

interface UpdateInfo {
  updateAvailable: boolean;
  version?: string;
  releaseDate?: string;
  releaseNotes?: string;
}

interface UpdateProgress {
  percent: number;
  bytesPerSecond: number;
  transferred: number;
  total: number;
}

export function useUpdate() {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [progress, setProgress] = useState<UpdateProgress | null>(null);
  const [status, setStatus] = useState<string>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Listen for update progress
    const unsubProgress = window.electron.update.onProgress((data) => {
      setProgress(data as UpdateProgress);
    });

    // Listen for update status
    const unsubStatus = window.electron.update.onStatus((data: any) => {
      setStatus(data.status);
      if (data.error) setError(data.error);
    });

    return () => {
      unsubProgress();
      unsubStatus();
    };
  }, []);

  const checkForUpdate = useCallback(async () => {
    setStatus("checking");
    setError(null);
    
    try {
      const result = await window.electron.update.check();
      if (result.success) {
        setUpdateInfo(result.data);
        return result.data;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Check failed");
      return null;
    }
  }, []);

  const downloadUpdate = useCallback(async () => {
    setStatus("downloading");
    setError(null);
    setProgress(null);
    
    try {
      const result = await window.electron.update.download();
      if (!result.success) {
        setError(result.error);
      }
      return result.success;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
      return false;
    }
  }, []);

  const installUpdate = useCallback(() => {
    window.electron.update.install();
  }, []);

  return {
    updateInfo,
    progress,
    status,
    error,
    checkForUpdate,
    downloadUpdate,
    installUpdate,
  };
}
