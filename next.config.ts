import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.trackynn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;