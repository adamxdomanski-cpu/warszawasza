import type { NextConfig } from "next";

const API_PROXY_TARGET =
  process.env.API_PROXY_TARGET || "http://127.0.0.1:8001";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/ping", destination: `${API_PROXY_TARGET}/ping` },
      { source: "/generate", destination: `${API_PROXY_TARGET}/generate` },
      { source: "/topdrops", destination: `${API_PROXY_TARGET}/topdrops` },
      { source: "/drop001", destination: `${API_PROXY_TARGET}/drop001` },
    ];
  },
};

export default nextConfig;
