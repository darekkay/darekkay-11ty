/* Based on https://github.com/11ty/eleventy-plugin-rss */

const posthtml = require("posthtml");
const urls = require("posthtml-urls");

const absoluteUrl = require("../filters/absoluteUrl");

/**
 * Converts URLs in an HTML content into absolute paths.
 *
 * {{ post.templateContent | htmlToAbsoluteUrls("https://example.com/") }}
 *
 * */
module.exports = function (htmlContent, base, callback) {
  if (!htmlContent) {
    callback(null, "");
    return;
  }

  if (!base) {
    throw new Error(
      "htmlToAbsoluteUrls filter is missing the full URL base argument."
    );
  }

  const options = {
    eachURL: (rawUrl) => {
      const url = rawUrl.trim();

      // #anchor in-page
      if (url.indexOf("#") === 0) {
        return url;
      }

      return absoluteUrl(url, base);
    },
  };

  const modifier = posthtml().use(urls(options));
  modifier.process(htmlContent).then((result) => {
    callback(null, result.html);
  });
};
