/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nemesis/shared"],
  
  onDemandEntries: {
    maxInactiveAge: 60 * 10000,
    pagesBufferLength: 10,
  },
  
  swcMinify: true,
};

module.exports = nextConfig;
