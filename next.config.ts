import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindcss.com",
        port: "",
        pathname: "/plus-assets/img/**",
      },
    ],
  },
  typescript: {
    // 在构建时忽略类型检查错误（会跳过失败导致构建通过）
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
