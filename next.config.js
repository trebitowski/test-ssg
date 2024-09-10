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
            value: ':site\\::slug' // Matched parameters can be used in the value
          },
          {
            key: 'Cache-Tag',
            value: ':site\\::slug' // Matched parameters can be used in the value
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
