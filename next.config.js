/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // firebase storage
    domains: ['firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
