const posthtml = require("posthtml");
const attrs = require("posthtml-extend-attrs");

/** Add tabindex="0" to all Prismjs examples (WCAG requirement) */
module.exports = async function (content, outputPath) {
  if (outputPath && !outputPath.endsWith(".html")) {
    return content;
  }
  const modifier = posthtml().use(
    attrs({
      attrsTree: {
        "pre[class*='language-']": { tabindex: 0 },
      },
    })
  );
  const result = await modifier.process(content);
  return result.html;
};
