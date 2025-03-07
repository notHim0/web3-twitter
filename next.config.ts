import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/profile_images/**",
      },
      {
        protocol: "https",
        hostname: "cloudfront-us-east-1.images.arcpublishing.com",
        port: "",
        pathname: "/coindesk/**",
      },
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
        port: "",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
