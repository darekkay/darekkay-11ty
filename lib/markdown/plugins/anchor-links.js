/* Based on https://github.com/ambrwlsn/website/blob/da2056c316fa45fa58b443b07be1ac4c5080912e/helpers/markdown-anchor-wat.js */

const slugify = require("slugify");

const anchor = (md, options) => {
  md.renderer.rules.heading_open = function (tokens, index) {
    const contentToken = tokens[index + 1];
    const slug = slugify(contentToken.content, { lower: true });

    if (tokens[index].tag === "h2" || tokens[index].tag === "h3") {
      return `<${tokens[index].tag} id="${slug}">
        <a class="anchor" href="#${slug}" aria-label="anchor">
          <svg class="icon icon--anchor" role="img" aria-hidden="true"><use xlink:href="${
            options.spriteUrl || ""
          }#icon-anchor"></use></svg></a>`;
    }
    return `<${tokens[index].tag}>`;
  };
};

module.exports = anchor;
