import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "react-map-gl": "react-map-gl",
    },
  },
};

export default nextConfig;
