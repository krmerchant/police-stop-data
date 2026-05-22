import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/police-stop-data",
  images: { unoptimized: true },
};

export default nextConfig;
