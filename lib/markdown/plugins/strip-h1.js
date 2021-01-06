/**
 * Strip all level 1 headlines.
 * This is useful when the document's level 1 headline comes from the document title.
 * */
module.exports = (md) => {
  md.core.ruler.push("strip-h1", (state) => {
    const filteredTokens = [];

    let isInsideH1 = false;

    state.tokens.forEach((token) => {
      if (token.tag === "h1" && token.type === "heading_open") {
        isInsideH1 = true;
      } else if (token.tag === "h1" && token.type === "heading_close") {
        isInsideH1 = false;
      } else if (!isInsideH1) {
        filteredTokens.push(token);
      }
    });

    state.tokens = filteredTokens;
  });
};
