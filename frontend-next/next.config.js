/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    // https://nextjs.org/docs/messages/export-image-api
    unoptimized: true,
  },
};

module.exports = nextConfig;
