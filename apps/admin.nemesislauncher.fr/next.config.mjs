/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nemesis/shared", "@nemesis/database"],
  
  onDemandEntries: {
    maxInactiveAge: 60 * 10000,
    pagesBufferLength: 10,
  },
  
  swcMinify: true,
};

export default nextConfig;
