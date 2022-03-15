/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/:url(https.*)',
      destination: '/view?url=:url'
    }
  ]
}

module.exports = nextConfig
