const nextConfig = {
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
