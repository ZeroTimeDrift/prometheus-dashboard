/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/prometheus-dashboard',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
