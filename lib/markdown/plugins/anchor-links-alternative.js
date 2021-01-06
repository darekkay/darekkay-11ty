/** Anchor links using markdown-it-anchor */
const markdownItAnchor = require("markdown-it-anchor");

const position = {
  false: "push",
  true: "unshift",
};

const renderPermalink = (slug, options, state, idx) => {
  const space = () =>
    Object.assign(new state.Token("text", "", 0), { content: " " });

  const linkTokens = [
    Object.assign(new state.Token("link_open", "a", 1), {
      attrs: [
        ["href", options.permalinkHref(slug, state)],
        ...(options.permalinkClass ? [["class", options.permalinkClass]] : []),
        ...Object.entries(options.permalinkAttrs(slug, state)),
      ],
    }),
    Object.assign(new state.Token("html_block", "", 0), {
      content: `<svg class="icon icon--anchor" role="img" aria-hidden="true"><use xlink:href="${
        options.spriteUrl || ""
      }#icon-anchor"></use></svg>`,
    }),
    new state.Token("link_close", "a", -1),
  ];

  // `push` or `unshift` according to position option.
  // Space is at the opposite side.
  if (options.permalinkSpace) {
    linkTokens[position[!options.permalinkBefore]](space());
  }
  state.tokens[idx + 1].children[position[options.permalinkBefore]](
    ...linkTokens
  );
};

module.exports = (options = {}) => [
  markdownItAnchor,
  {
    level: 2,
    permalink: true,
    permalinkBefore: true,
    permalinkSpace: false,
    permalinkClass: "anchor",
    permalinkAttrs: () => ({
      "aria-label": "anchor",
    }),
    renderPermalink,
    ...options,
  },
];
