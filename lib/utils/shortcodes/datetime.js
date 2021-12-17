const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

module.exports = (date, format, className) => {
  return `<time datetime="${dayjs(date).utc().format()}" ${
    className ? `class='${className}'` : ""
  }>${dayjs(date).utc().format(format)}</time>`;
};
