const { i18n } = require("./next-i18next.config");
module.exports = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_SITEKEY: process.env.NEXT_PUBLIC_SITEKEY,
  },
  i18n,
};
