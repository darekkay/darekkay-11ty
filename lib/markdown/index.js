const logger = require("@darekkay/logger");
const markdownIt = require("markdown-it");
const markdownItLinkAttributes = require("markdown-it-link-attributes");
const markdownItReplaceLink = require("markdown-it-replace-link");
const markdownItTableOfContents = require("markdown-it-toc-done-right");
const highlightjs = require("highlight.js");

const anchorLinks = require("./plugins/anchor-links");
const stripH1 = require("./plugins/strip-h1");
const { slugify } = require("./utils");

/** Highlight.js configuration */
const highlight = () =>
  function (string, lang) {
    if (lang && highlightjs.getLanguage(lang)) {
      try {
        return `<pre class="hljs" tabindex="0"><code>${
          highlightjs.highlight(lang, string, true).value
        }</code></pre>`;
      } catch (error) {
        logger.error(error);
      }
    }

    return `<pre class="hljs" tabindex="0"><code>${markdownIt().utils.escapeHtml(
      string
    )}</code></pre>`;
  };

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

/** Add external link attributes */
const pluginExternalLinks = () => [
  markdownItLinkAttributes,
  {
    pattern: /^https?:/,
    attrs: {
      target: "_blank",
      rel: "noopener",
    },
  },
];

/** Convert relative links to absolute links when building from a GitHub Readme */
const pluginRelativeGitHubLinks = () => [
  markdownItReplaceLink,
  {
    replaceLink: function (link, env) {
      if (env.slug && !link.startsWith("http") && !link.startsWith("mailto")) {
        return `https://github.com/darekkay/${env.slug}/blob/master/${link}`;
      }
      return link;
    },
  },
];

const markdownItInstance = markdownIt({
  html: true,
  linkify: true,
});

module.exports = {
  markdownIt,
  markdownItInstance,
  highlight,
  pluginHeadlineAnchors,
  pluginTableOfContents,
  pluginExternalLinks,
  pluginRelativeGitHubLinks,
  pluginStripH1,
};
