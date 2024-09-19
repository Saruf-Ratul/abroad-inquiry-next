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

  webpack(config) {
    // Add file-loader for video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/videos/',
            outputPath: 'static/videos/',
            name: '[name].[hash].[ext]',
            esModule: false,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
