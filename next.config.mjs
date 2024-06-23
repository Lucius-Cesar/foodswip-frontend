/** @type {import("next").NextConfig} */
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

import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.js",
  swDest: "public/sw.js",
});

export default withSerwist(nextConfig);
