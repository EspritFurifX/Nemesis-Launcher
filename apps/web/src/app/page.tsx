import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold">
              N
            </div>
            <span className="font-semibold">Nemesis Launcher</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/download" className="text-slate-400 hover:text-white transition-colors">
              Download
            </Link>
            <Link href="/docs" className="text-slate-400 hover:text-white transition-colors">
              Documentation
            </Link>
            <Link 
              href="/auth/login" 
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="w-24 h-24 bg-emerald-500 rounded-2xl flex items-center justify-center text-4xl font-bold mx-auto mb-8 shadow-lg shadow-emerald-500/20">
            N
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Nemesis Launcher
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            A modern, high-performance Minecraft launcher with Microsoft authentication, 
            auto-updates, and seamless gameplay experience.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link 
              href="/download" 
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-emerald-600/20"
            >
              Download for Free
            </Link>
            <Link 
              href="/docs" 
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold text-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-slate-400">
                Sign in with your Microsoft account. Only valid Minecraft licenses accepted.
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Auto Updates</h3>
              <p className="text-slate-400">
                Stay up to date with automatic updates and SHA-256 verification.
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">High Performance</h3>
              <p className="text-slate-400">
                Built with Electron and React for a fast, native experience.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Nemesis Team. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
