import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'cravatar.eu',
        port: '',
        pathname: '/helmavatar/**',
      },
    ],
  },
};

export default nextConfig;
