import type { NextConfig } from "next";
import path from "path";

const firaCore = path.join(__dirname, "../fira/core");

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  turbopack: {
    root: __dirname,
    resolveAlias: {
      "@fira/core": firaCore,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@fira/core": firaCore,
    };
    return config;
  },
};

export default nextConfig;
