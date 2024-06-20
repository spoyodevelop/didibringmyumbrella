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
        source: "/api/cache",
        destination: "/",
      },
      {
        source: "/api/weather",
        destination: "/",
      },
    ];
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
