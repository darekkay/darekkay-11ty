const { slugify } = require("../utils");

function htmlencode(x) {
  return String(x)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// eslint-disable-next-line prefer-named-capture-group
const pattern = new RegExp(`^(\\[\\[?toc]?])$`, "i");

function toc(state, startLine, endLine, silent) {
  let token;
  const pos = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];

  // use whitespace as a line tokenizer and extract the first token
  // to test against the placeholder anchored pattern, rejecting if false
  const lineFirstToken = state.src.slice(pos, max).split(" ")[0];
  if (!pattern.test(lineFirstToken)) return false;

  if (silent) return true;

  const matches = pattern.exec(lineFirstToken);
  let inlineOptions = {};
  if (matches !== null && matches.length === 3) {
    try {
      inlineOptions = JSON.parse(matches[2]);
    } catch {
      // silently ignore inline options
    }
  }

  state.line = startLine + 1;

  token = state.push("tocOpen", "nav", 1);
  token.markup = "";
  token.map = [startLine, state.line];
  token.inlineOptions = inlineOptions;

  token = state.push("tocBody", "", 0);
  token.markup = "";
  token.map = [startLine, state.line];
  token.inlineOptions = inlineOptions;
  token.children = [];

  token = state.push("tocClose", "nav", -1);
  token.markup = "";

  return true;
}

function headings2ast(tokens) {
  const ast = { l: 0, n: "", c: [] };
  const stack = [ast];

  for (let i = 0, iK = tokens.length; i < iK; i++) {
    const token = tokens[i];
    if (token.type === "heading_open") {
      const key = tokens[i + 1].children
        .filter((_token) => {
          return _token.type === "text" || _token.type === "code_inline";
        })
        .reduce((s, t) => {
          return s + t.content;
        }, "");

      const node = {
        l: parseInt(token.tag.substr(1), 10),
        n: key,
        c: [],
      };

      if (node.l > stack[0].l) {
        stack[0].c.push(node);
        stack.unshift(node);
      } else if (node.l === stack[0].l) {
        stack[1].c.push(node);
        stack[0] = node;
      } else {
        while (node.l <= stack[0].l) stack.shift();
        stack[0].c.push(node);
        stack.unshift(node);
      }
    }
  }

  return ast;
}

/**
 * A markdown-it plugin to create a table of contents from the document's headlines.
 *
 * Based on: https://github.com/nagaozen/markdown-it-toc-done-right
 */
module.exports = (md, __options) => {
  const options = Object.assign(
    {},
    {
      slugify,
      uniqueSlugStartIndex: 1,
      containerClass: "article-section",
      containerId: undefined,
      listClass: undefined,
      itemClass: undefined,
      linkClass: undefined,
      level: [2, 3],
      listType: "ol",
      format: undefined,
      callback: undefined /* function(html, ast) {} */,
      introHtml: "<h2>Table of contents</h2>",
    },
    __options,
  );

  let ast;

  md.renderer.rules.tocOpen = function (
    tokens,
    idx /* , options, env, renderer */,
  ) {
    let _options = Object.assign({}, options);
    if (tokens && idx >= 0) {
      const token = tokens[idx];
      _options = Object.assign(_options, token.inlineOptions);
    }
    const id = _options.containerId
      ? ` id="${htmlencode(_options.containerId)}"`
      : "";
    const className = htmlencode(_options.containerClass);
    return `<nav${id} class="${className}">${_options.introHtml}`;
  };

  md.renderer.rules.tocClose =
    function (/* tokens, idx, options, env, renderer */) {
      return "</nav>";
    };

  md.renderer.rules.tocBody = function (
    tokens,
    idx /* , options, env, renderer */,
  ) {
    let _options = Object.assign({}, options);
    if (tokens && idx >= 0) {
      const token = tokens[idx];
      _options = Object.assign(_options, token.inlineOptions);
    }

    const uniques = {};
    function unique(s) {
      let u = s;
      let i = _options.uniqueSlugStartIndex;
      while (Object.hasOwn(uniques, u)) u = `${s}-${i++}`;
      uniques[u] = true;
      return u;
    }

    const isLevelSelectedNumber = (selection) => (level) => level >= selection;
    const isLevelSelectedArray = (selection) => (level) =>
      selection.includes(level);

    const isLevelSelected = Array.isArray(_options.level)
      ? isLevelSelectedArray(_options.level)
      : isLevelSelectedNumber(_options.level);

    function ast2html(tree) {
      const listClass = _options.listClass
        ? ` class="${htmlencode(_options.listClass)}"`
        : "";
      const itemClass = _options.itemClass
        ? ` class="${htmlencode(_options.itemClass)}"`
        : "";
      const linkClass = _options.linkClass
        ? ` class="${htmlencode(_options.linkClass)}"`
        : "";

      if (tree.c.length === 0) return "";

      let buffer = "";
      if (tree.l === 0 || isLevelSelected(tree.l)) {
        buffer += `<${htmlencode(_options.listType) + listClass}>`;
      }
      tree.c.forEach((node) => {
        if (isLevelSelected(node.l)) {
          buffer += `<li${itemClass}><a${linkClass} href="#${unique(
            options.slugify(node.n),
          )}">${
            typeof _options.format === "function"
              ? _options.format(node.n, htmlencode)
              : htmlencode(node.n)
          }</a>${ast2html(node)}</li>`;
        } else {
          buffer += ast2html(node);
        }
      });
      if (tree.l === 0 || isLevelSelected(tree.l)) {
        buffer += `</${htmlencode(_options.listType)}>`;
      }
      return buffer;
    }

    return ast2html(ast);
  };

  md.core.ruler.push("generateTocAst", (state) => {
    const { tokens } = state;
    ast = headings2ast(tokens);

    if (typeof options.callback === "function") {
      options.callback(
        md.renderer.rules.tocOpen() +
          md.renderer.rules.tocBody() +
          md.renderer.rules.tocClose(),
        ast,
      );
    }
  });

  md.block.ruler.before("heading", "toc", toc, {
    alt: ["paragraph", "reference", "blockquote"],
  });
};
