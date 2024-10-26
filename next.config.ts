import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

if (process.env.NODE_ENV === "production") {
  nextConfig.compiler = {
    removeConsole: {
      exclude: ["error", "warn"],
    },
  };
}

export default nextConfig;
