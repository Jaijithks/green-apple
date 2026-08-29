import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/#about",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/menu",
        destination: "/#menu",
        permanent: true,
      },
      {
        source: "/menus",
        destination: "/#menu",
        permanent: true,
      },
      {
        source: "/gallery",
        destination: "/#gallery",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

