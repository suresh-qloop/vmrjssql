const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_SITEKEY: process.env.NEXT_PUBLIC_SITEKEY,
    NEXT_PUBLIC_NEXT_SERVER: process.env.NEXT_PUBLIC_NEXT_SERVER,
  },
  i18n,
  images: {
    domains: [process.env.NEXT_PUBLIC_NEXT_SERVER],
  },
  async headers() {
    return [
      {
        // Set cache lifetime to 1 year
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};
