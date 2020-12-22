/* Based on https://github.com/11ty/eleventy-plugin-rss */

const { URL } = require("url");

const logger = require("@darekkay/logger");

/**
 * Return the absolute URL for a path and base.
 *
 * {{ "/moo" | absoluteUrl("https://example.com/") }}
 *
 * */
module.exports = function (path, base) {
  try {
    return new URL(path, base).toString();
  } catch {
    logger.error(
      `Trying to convert ${path} to be an absolute URL with base ${base} and failed, returning: ${path} (invalid url)`
    );
    return path;
  }
};
