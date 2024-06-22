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

module.exports = nextConfig;
