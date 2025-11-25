// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // GitHub Pages용 설정들 제거
  // output: 'export',
  // basePath: '/ai-persona-gen',
  // assetPrefix: '/ai-persona-gen/',

  images: {
    unoptimized: true, // 이건 있어도 되고, 빼도 됨
  },
};

export default nextConfig;
