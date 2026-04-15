import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for smaller, self-contained deployments on Node.js hosting
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [require.resolve("orchids-visual-edits/loader.js")],
      },
    },
  },
};

export default nextConfig;
