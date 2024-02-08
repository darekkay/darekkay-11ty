const markdownIt = require("markdown-it");

const anchorLinks = require("./plugins/anchor-links");
const stripH1 = require("./plugins/strip-h1");
const tableOfContents = require("./plugins/table-of-contents");

/** Add headline anchor links */
const pluginHeadlineAnchors = () => [anchorLinks, {}];

/** Strip level 1 headlines */
const pluginStripH1 = () => [stripH1, {}];

/** Table of contents */
const pluginTableOfContents = (options = {}) => [tableOfContents, options];

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
