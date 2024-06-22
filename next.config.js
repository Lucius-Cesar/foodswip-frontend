/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [
      {
        source: "/",
        destination: "/html/index.html",
      },
    ];
  },
};

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

module.exports = withPWA({
  // other congigs
  reactStrictMode: false,
});

module.exports = nextConfig;
