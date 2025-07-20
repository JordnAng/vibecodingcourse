import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Netlify
  output: 'export',
  trailingSlash: true,
  
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
