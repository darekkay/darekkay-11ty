const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.ELEVENTY_ENV === "production";
const isDevelopment = !isProduction;

module.exports = {
  isProduction,
  isDevelopment,
};
