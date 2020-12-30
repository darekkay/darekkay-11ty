const prismJs = require("@11ty/eleventy-plugin-syntaxhighlight");

const gitlog = require("./languages/gitlog");

const prismJsOptions = {
  init: function ({ Prism }) {
    Prism.languages.gitlog = gitlog;
  },
  lineSeparator: "<br><span class='line'></span>",
};

module.exports = {
  prismJs,
  prismJsOptions,
};
