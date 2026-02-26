/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nemesis/shared", "@nemesis/database"],
  
  // Caching agressif en développement - évite recompilation inutile
  onDemandEntries: {
    maxInactiveAge: 60 * 10000, // 10 minutes
    pagesBufferLength: 10,
  },
  
  // Optimisations SWC
  swcMinify: true,
  
  images: {
    domains: ["cdn.nemesislauncher.fr", "localhost"],
  },
  
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
