const dayjs = require("dayjs");

module.exports = (date, format) => {
  return `<time datetime="${dayjs(date).format()}">${dayjs(date).format(
    format
  )}</time>`;
};
