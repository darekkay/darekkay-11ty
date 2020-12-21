const dayjs = require("dayjs");

module.exports = (format) => {
  const date = dayjs().format(format || "YYYY-MM-DD");
  return `<time datetime="${date}">${date}</time>`;
};
