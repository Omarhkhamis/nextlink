/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    webpackBuildWorker: false,
  },
  webpack: (config, { isServer }) => {
    config.cache = false;
    config.snapshot = {
      managedPaths: [],
      immutablePaths: [],
    };
    if (isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
