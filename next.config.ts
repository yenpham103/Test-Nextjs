/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'picsum.photos'
    ],
    formats: ['image/webp', 'image/avif'],
  },

  env: {
    SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
    SITE_NAME: process.env.SITE_NAME || 'Xipat Blog',
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  },

  async redirects() {
    return [
      {
        source: '/posts/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;