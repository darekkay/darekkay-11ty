const shortcodes = require("./utils/shortcodes.js");

const applySharedConfig = (eleventyConfig) => {
  // Shortcodes
  Object.entries(shortcodes).forEach(([shortcodeName, shortcode]) => {
    eleventyConfig.addShortcode(shortcodeName, shortcode);
  });
};

module.exports = {
  applySharedConfig,
};
