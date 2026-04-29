import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Mock-фотографии для дизайн-превью.
      // Когда подключим Joomla — здесь будет домен сайта Joomla.
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "s1091003060.online.de" },
    ],
  },
};

export default nextConfig;
