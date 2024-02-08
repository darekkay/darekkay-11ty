const dayjs = require("dayjs");
const { convert: htmlToText } = require("html-to-text");
const wordCount = require("@iarna/word-count"); // not perfect, but better than most

const getWordCount = (post) => {
  const text = htmlToText(post.content, {
    wordwrap: false,

    selectors: [
      // take the "innerText" for the following elements
      ...["h1", "h2", "h3", "h4", "h5", "h6", "a", "ul", "ol"].map(
        (selector) => ({
          selector,
          format: "inlineSurround",
        }),
      ),

      // ignore non-text elements
      ...["img", "picture", "video", "nav", "pre > code"].map((selector) => ({
        selector,
        format: "skip",
      })),
    ],
  });
  return wordCount(text);
};

/** Get the average days between two posts. */
const getAverageDaysBetweenPosts = (allPostDatesSorted) => {
  if (allPostDatesSorted.length <= 1) {
    // we need at least two posts to compare
    return 0;
  }

  const dayDifference = allPostDatesSorted[0].diff(
    allPostDatesSorted[allPostDatesSorted.length - 1],
    "day",
  );
  return Math.round(Math.abs(dayDifference) / allPostDatesSorted.length);
};

/** Get the number of posts per tag. */
const getNumberOfPostsPerTag = (collection) => {
  const tags = {};

  collection
    .filter((post) => post.data.tags)
    .forEach((item) => {
      for (const tag of item.data.tags) {
        if (tags[tag]) {
          tags[tag]++;
        } else {
          tags[tag] = 1;
        }
      }
    });

  return Object.entries(tags).sort(
    ([, numberOfPosts1], [, numberOfPosts2]) => numberOfPosts2 - numberOfPosts1,
  );
};

/** Get the number of posts per year. */
const getNumberOfPostsPerYear = (allPostDatesSorted) => {
  const years = {};
  const firstPostYear = allPostDatesSorted[0].year();
  const lastPostYear = allPostDatesSorted[allPostDatesSorted.length - 1].year();
  for (let i = firstPostYear; i <= lastPostYear; i++) {
    // ensure that each year is available, even if a year doesn't have any posts
    years[i] = 0;
  }

  allPostDatesSorted.forEach((date) => {
    years[date.year()]++;
  });

  return Object.entries(years);
};

/**
 * Return statistics for a post or a collection.
 *
 * {{ collection | stats }}
 */
module.exports = (collectionOrPost) => {
  if (Array.isArray(collectionOrPost)) {
    // collection
    const collection = collectionOrPost;

    // note: collections are sorted by date (ascending) by default
    const numberOfPosts = collection.length;
    const allPostDatesSorted = collection.map((post) => dayjs(post.date));
    const totalWordCount = collection
      .map((post) => getWordCount(post))
      .reduce((sum, value) => sum + value, 0);
    return {
      numberOfPosts,
      numberOfPostsPerYear: getNumberOfPostsPerYear(allPostDatesSorted),
      numberOfPostsPerTag: getNumberOfPostsPerTag(collection),
      averageDaysBetweenPosts: getAverageDaysBetweenPosts(allPostDatesSorted),
      totalWordCount,
      averageWordCount: Math.round(totalWordCount / numberOfPosts),
    };
  } else {
    // single post
    const post = collectionOrPost;

    return {
      wordCount: getWordCount(post),
    };
  }
};
