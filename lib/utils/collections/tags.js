/** Creates a collection for all explicitly used tags */
module.exports = (collection) => {
  const tags = new Set();
  collection
    .getAll()
    .filter((post) => post.data.tags)
    .forEach(function (item) {
      for (const tag of item.data.tags) {
        tags.add(tag);
      }
    });

  return [...tags];
};
