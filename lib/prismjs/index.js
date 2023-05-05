const prismJs = require("@11ty/eleventy-plugin-syntaxhighlight");

const gitlog = require("./languages/gitlog");

const prismJsOptions = {
  init: function ({ Prism }) {
    Prism.languages.gitlog = gitlog;
  },
  preAttributes: { tabindex: 0 },
};

module.exports = {
  prismJs,
  prismJsOptions,
};
