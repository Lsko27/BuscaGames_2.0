/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // localhost backend
      {
        protocol: "http",
        hostname: "localhost",
        port: "5050",
        pathname: "/uploads/**",
      },
      // Google OAuth avatars
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
  },
}

module.exports = nextConfig
