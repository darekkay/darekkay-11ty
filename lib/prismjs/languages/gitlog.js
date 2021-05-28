/** A very basic syntax highlighting for a "git log --graph" output */
module.exports = {
  tag: /[*/\\|]/,
  keyword:
    /\b(?:head|master|main|develop|feature|release|origin|upstream|tag)\b/i,
  symbol: /[\da-f]{7}/,
};
