const prismJs = require("@11ty/eleventy-plugin-syntaxhighlight");

const gitlog = require("./languages/gitlog");
const vtt = require("./languages/vtt");

const prismJsOptions = {
  init: function ({ Prism }) {
    Prism.languages.gitlog = gitlog;
    Prism.languages.vtt = vtt;
  },
  preAttributes: { tabindex: 0 },
};

module.exports = {
  prismJs,
  prismJsOptions,
};
