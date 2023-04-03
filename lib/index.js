const { EleventyRenderPlugin } = require("@11ty/eleventy");

const asyncFilters = require("./utils/async-filters/");
const filters = require("./utils/filters/");
const shortcodes = require("./utils/shortcodes/");
const pairedShortcodes = require("./utils/paired-shortcodes/");
const transforms = require("./utils/transforms/");
const markdown = require("./markdown");
const { prismJs, prismJsOptions } = require("./prismjs");

const applySharedConfig = (eleventyConfig) => {

  // Eleventy renderFile and renderTemplate
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Prism.js syntax highlighting
  eleventyConfig.addPlugin(prismJs, prismJsOptions);

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

  // Transforms
  Object.entries(transforms).forEach(([transformName, transform]) => {
    eleventyConfig.addTransform(transformName, transform);
  });
};

module.exports = {
  applySharedConfig,
  markdown,
};
