import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['next-auth'],
};

export default nextConfig;
