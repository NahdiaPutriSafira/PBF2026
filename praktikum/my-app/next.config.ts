import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.footlocker.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.static-src.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.807garage.com", 
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn3.gstatic.com", // ✅ TAMBAH INI UNTUK GAMBAR GOOGLE
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;