/*
 * Inspired by: https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/
 */

const { slugify } = require("../utils");

const anchor = (md) => {
  md.renderer.rules.heading_open = function (tokens, index) {
    const contentToken = tokens[index + 1];
    const slug = slugify(contentToken.content);

    if (tokens[index].tag === "h2" || tokens[index].tag === "h3") {
      return `<${tokens[index].tag} id="${slug}"><a href="#${slug}">
      `;
    }
    return `<${tokens[index].tag}>`;
  };

  md.renderer.rules.heading_close = function (tokens, index) {
    if (tokens[index].tag === "h2" || tokens[index].tag === "h3") {
      return `</a></${tokens[index].tag}>`;
    }
    return `</${tokens[index].tag}>`;
  };
};

module.exports = anchor;
