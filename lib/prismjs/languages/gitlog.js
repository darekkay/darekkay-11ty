/** A very basic syntax highlighting for a "git log --graph" output */
module.exports = {
  // graph node
  tag: /[*/\\|]/,

  // keywords
  keyword:
    /\b(?:head|master|main|develop|feature|release|origin|upstream|tag)\b/i,

  // commit hash
  symbol: /[\da-f]{7}/,
};
