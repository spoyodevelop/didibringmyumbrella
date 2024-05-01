const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/weather",
        destination: `/`,
      },
    ];
  },
};

module.exports = nextConfig;
