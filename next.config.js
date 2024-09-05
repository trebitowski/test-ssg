/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/to/:path*',
        destination: '/_forms/:site/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
