/** A basic syntax highlighting for the Web Video Text Tracks (WebVTT) format */
module.exports = {
  // "WEBTT" directive
  keyword: /\bWEBVTT\b/,

  // time slot
  number: /\d\d:\d\d:\d\d.\d\d\d/,

  // time slot arrow
  operator: /-->/,
};
