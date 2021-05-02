const _slugify = require("slugify");

const slugify = (string) =>
  _slugify(string, {
    lower: true,
    strict: true,
  });

module.exports = {
  slugify,
};
