/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  onDemandEntries: {
    maxInactiveAge: 60 * 10000,
    pagesBufferLength: 10,
  },
  
  swcMinify: true,
};

module.exports = nextConfig;
