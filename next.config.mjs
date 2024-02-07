/** @type {import('next').NextConfig} */
const PND_API_BASE_URL = process.env.PND_API_BASE_URL || 'http://localhost:8080'

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${PND_API_BASE_URL}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
