const { markdownItInstance } = require("../../markdown");

module.exports = function (content, type) {
  return `<alert-box class="alert-${type}">${markdownItInstance.renderInline(
    content
  )}</alert-box>`;
};
