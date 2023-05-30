const { markdownItInstance } = require("../../markdown");

module.exports = function (content, type) {
  return `<dk-alert-box type="${type}">${markdownItInstance.renderInline(
    content
  )}</dk-alert-box>`;
};
