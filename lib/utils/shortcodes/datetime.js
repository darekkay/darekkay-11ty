const dayjs = require("dayjs");

module.exports = (date, format, className) => {
  return `<time datetime="${dayjs(date).format()}" ${
    className ? `class='${className}'` : ""
  }>${dayjs(date).format(format)}</time>`;
};
