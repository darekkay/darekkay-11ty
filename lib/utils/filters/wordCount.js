const wc = require("word-counting");

module.exports = (content) => wc(content, { isHtml: true }).wordsCount;
