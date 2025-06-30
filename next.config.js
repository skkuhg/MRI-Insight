/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Enable static exports for Docker
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: ['localhost', 'api.tavily.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  
  // Webpack configuration for DICOM support
  webpack: (config) => {
    config.module.rules.push({
      test: /\.dcm$/,
      use: 'file-loader',
    });
    
    return config;
  },
}

module.exports = nextConfig
