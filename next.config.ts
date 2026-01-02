import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopackを無効化（EC2環境でのBus error回避）
  experimental: {
    turbo: false,
  },
};

export default nextConfig;
