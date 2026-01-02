import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // EC2環境でのビルド最適化
  output: 'standalone',
};

export default nextConfig;
