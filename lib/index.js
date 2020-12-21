const filters = require("./utils/filters/");
const shortcodes = require("./utils/shortcodes/");
const pairedShortcodes = require("./utils/paired-shortcodes/");

const applySharedConfig = (eleventyConfig) => {
  // Filters
  Object.entries(filters).forEach(([filterName, filter]) => {
    eleventyConfig.addFilter(filterName, filter);
  });

  // Shortcodes
  Object.entries(shortcodes).forEach(([shortcodeName, shortcode]) => {
    eleventyConfig.addShortcode(shortcodeName, shortcode);
  });

  // Paired Shortcodes
  Object.entries(pairedShortcodes).forEach(([shortcodeName, shortcode]) => {
    eleventyConfig.addPairedShortcode(shortcodeName, shortcode);
  });
};

module.exports = {
  applySharedConfig,
};
