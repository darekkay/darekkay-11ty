const logger = require("@darekkay/logger");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItLinkAttributes = require("markdown-it-link-attributes");
const markdownItReplaceLink = require("markdown-it-replace-link");
const highlightjs = require("highlight.js");

const stripH1 = require("./plugins/strip-h1");

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

/** Add headline anchor links */
const pluginHeadlineAnchors = () => [
  markdownItAnchor,
  {
    level: 2,
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: "",
    permalinkClass: "anchor",
    // TODO: make screen reader / keyboard / mobile accessible?
    permalinkAttrs: () => ({
      "aria-hidden": "true",
      tabindex: "-1",
    }),
  },
];

module.exports = {
  highlight,
  pluginExternalLinks,
  pluginRelativeGitHubLinks,
  pluginHeadlineAnchors,
  pluginStripH1,
};
