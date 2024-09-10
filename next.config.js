/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/_forms/:site/:slug',
        headers: [
          {
            key: 'Netlify-Cache-Tag',
            value: ':site-:slug'
          },
          {
            key: 'Cache-Tag',
            value: ':site-:slug'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
