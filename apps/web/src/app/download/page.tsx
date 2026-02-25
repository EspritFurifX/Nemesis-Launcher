import Link from "next/link";

const downloads = [
  {
    platform: "Windows",
    icon: "🪟",
    filename: "Nemesis-Launcher-1.0.0-x64.exe",
    size: "~85 MB",
    requirements: "Windows 10 or later (64-bit)",
  },
  {
    platform: "macOS",
    icon: "🍎",
    filename: "Nemesis-Launcher-1.0.0-x64.dmg",
    size: "~95 MB",
    requirements: "macOS 10.15 or later",
  },
  {
    platform: "Linux",
    icon: "🐧",
    filename: "Nemesis-Launcher-1.0.0-x64.AppImage",
    size: "~90 MB",
    requirements: "Ubuntu 20.04 or equivalent",
  },
];

export default function DownloadPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold">
              N
            </div>
            <span className="font-semibold">Nemesis Launcher</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/download" className="text-white">
              Download
            </Link>
            <Link href="/docs" className="text-slate-400 hover:text-white transition-colors">
              Documentation
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">Download Nemesis Launcher</h1>
        <p className="text-slate-400 text-center mb-12">
          Choose your platform and start playing
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {downloads.map((item) => (
            <div
              key={item.platform}
              className="bg-slate-800/50 rounded-xl p-6 text-center hover:bg-slate-800 transition-colors"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{item.platform}</h2>
              <p className="text-sm text-slate-400 mb-4">{item.requirements}</p>
              <p className="text-xs text-slate-500 mb-4">{item.size}</p>
              <a
                href={`${apiUrl}/cdn/releases/${item.filename}`}
                className="block w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors"
              >
                Download
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold mb-4">Requirements</h3>
          <ul className="text-slate-400 space-y-2">
            <li>Microsoft account with valid Minecraft license</li>
            <li>Java 17+ (bundled or system)</li>
            <li>4 GB RAM minimum (8 GB recommended)</li>
            <li>Internet connection for authentication</li>
          </ul>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Nemesis Team. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
