/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.abroadinquiry.com",
      },
      {
        protocol: "https",
        hostname: "server.abroadinquiry.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com", // Add flagcdn.com for loading flags
      },
    ],
  },
};

export default nextConfig;
