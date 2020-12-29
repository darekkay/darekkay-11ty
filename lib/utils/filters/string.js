module.exports = {
  includes: (string, segment) => {
    return (string || "").includes(segment);
  },

  startsWith: (string, prefix) => {
    return (string || "").startsWith(prefix);
  },

  endsWith: (string, suffix) => {
    return (string || "").endsWith(suffix);
  },
};
