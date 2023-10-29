const markdownIt = require("markdown-it");
const markdownItTableOfContents = require("markdown-it-toc-done-right");

const anchorLinks = require("./plugins/anchor-links");
const stripH1 = require("./plugins/strip-h1");
const { slugify } = require("./utils");

/** Strip level 1 headlines */
const pluginStripH1 = () => [stripH1, {}];

/** Add headline anchor links */
const pluginHeadlineAnchors = (options) => [anchorLinks, options];

/** Table of contents */
const pluginTableOfContents = (options = {}) => [
  markdownItTableOfContents,
  {
    containerClass: "article-section",
    slugify,
    ...options,
  },
];

const markdownItInstance = markdownIt({
  html: true,
  linkify: true,
});

module.exports = {
  markdownIt,
  markdownItInstance,
  pluginHeadlineAnchors,
  pluginTableOfContents,
  pluginStripH1,
};
