/**
 * Find a post in a collection by its slug.
 *
 * {{ collections.posts | findBySlug(slug) }}
 *
 * */
module.exports = (collection, slug) => {
  const post = collection.find((page) => page.url.includes(`/${slug}/`));
  if (post === undefined) {
    throw new Error(`No post found with slug '${slug}'`);
  }
  return post;
};
