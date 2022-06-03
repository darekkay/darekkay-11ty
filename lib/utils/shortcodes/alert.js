const { markdown } = require("../../markdown");

module.exports = function (content, type) {
  return `<alert-box class="alert-${type}">${markdown.markdownItInstance.renderInline(
    content
  )}</alert-box>`;
};
