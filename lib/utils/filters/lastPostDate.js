/* Based on https://github.com/11ty/eleventy-plugin-rss */

const logger = require("@darekkay/logger");

const formatDate = require("./formatDate");

/**
 * Return the newest date in a collection.
 *
 * {{ collection | lastPostDate }}
 *
 * */
module.exports = (collection) => {
  if (!collection || !collection.length) {
    logger.error("Collection is empty in lastUpdatedDate filter.");
  }

  return formatDate(
    new Date(
      Math.max(
        ...collection.map((item) => {
          return item.date;
        })
      )
    )
  );
};
