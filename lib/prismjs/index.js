const prismJs = require("@11ty/eleventy-plugin-syntaxhighlight");

const prismJsOptions = {
  // init: function ({ Prism }) {},
  lineSeparator: "<br><span class='line'></span>",
};

module.exports = {
  prismJs,
  prismJsOptions,
};
