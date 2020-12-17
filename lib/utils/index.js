module.exports = {
  isProduction:
    process.env.ELEVENTY_ENV === "production" ||
    process.env.NODE_ENV === "production",
};
