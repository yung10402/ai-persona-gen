// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/ai-persona-gen',
  assetPrefix: '/ai-persona-gen/',
};

export default nextConfig;
