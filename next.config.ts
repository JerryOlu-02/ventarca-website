import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          // must match your Dashboard URL, http://localhost:5173 OR https://dashboard.veentarca.biz .
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:5173",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ventarca-s3-bucket.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  sassOptions: {
    additionalData: `$var: red;`,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.tsx",
      },
    },
  },
};

export default nextConfig;
