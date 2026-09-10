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
  // L'ancienne adresse /update a été diffusée (plugin 1.4.1, backend) : on la garde.
  async redirects() {
    return [{ source: "/update", destination: "/download", permanent: true }];
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
