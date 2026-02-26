export function TitleBar() {
  const handleMinimize = () => {
    if (window.electron?.window) {
      window.electron.window.minimize();
    }
  };

  const handleMaximize = () => {
    if (window.electron?.window) {
      window.electron.window.maximize();
    }
  };

  const handleClose = () => {
    if (window.electron?.window) {
      window.electron.window.close();
    }
  };

  return (
    <header className="h-10 bg-slate-800 flex items-center justify-between px-4 select-none app-drag">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center text-xs font-bold">
          N
        </div>
        <span className="text-sm font-medium text-slate-300">Némésis Launcher</span>
      </div>
      
      <div className="flex items-center gap-1 no-drag">
        <button
          onClick={handleMinimize}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-700 transition-colors"
          aria-label="Minimize"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={handleMaximize}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-700 transition-colors"
          aria-label="Maximize"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>
  );
}
