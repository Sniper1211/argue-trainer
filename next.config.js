/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  experimental: {
    serverActions: true,
  },
  env: {
    APP_VERSION: process.env.npm_package_version || '0.1.0',
  },
}

module.exports = nextConfig