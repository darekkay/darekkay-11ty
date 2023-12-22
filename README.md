# @darekkay/11ty

[![npm (scoped)](https://img.shields.io/npm/v/@darekkay/11ty?style=flat-square)](https://www.npmjs.com/package/@darekkay/11ty)
[![Build](https://img.shields.io/github/actions/workflow/status/darekkay/darekkay-11ty/ci.yml?branch=master&style=flat-square)](https://github.com/darekkay/darekkay-11ty/actions/workflows/ci.yml)
[![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/darekkay/darekkay-11ty/blob/master/LICENSE)

My shared eleventy configuration.

## Installation

```bash
npm install --save-dev @darekkay/11ty
```

## 11ty Snippets

### Permalinks

- Note: this will cause issues with relative image assets.

```js
module.exports = {
  eleventyComputed: {
    permalink: (data) => `/blog/${data.page.fileSlug}/index.html`,
  },
};
```

## Related projects

- [eleventastic](https://github.com/maxboeck/eleventastic)

## License

This project and its contents are open source under the [MIT license](LICENSE).
