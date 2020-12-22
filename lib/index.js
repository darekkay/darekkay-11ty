const asyncFilters = require("./utils/async-filters/");
const filters = require("./utils/filters/");
const shortcodes = require("./utils/shortcodes/");
const pairedShortcodes = require("./utils/paired-shortcodes/");
const markdown = require("./markdown");

const applySharedConfig = (eleventyConfig) => {
  // Async Filters (Nunjucks)
  Object.entries(asyncFilters).forEach(([filterName, filter]) => {
    eleventyConfig.addNunjucksAsyncFilter(filterName, filter);
  });

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
  markdown,
};
