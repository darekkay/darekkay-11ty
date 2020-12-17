const dayjs = require("dayjs");
const { nanoid } = require("nanoid");

const { isProduction } = require("./index");

module.exports = {
  currentDate: (format) => {
    const date = dayjs().format(format || "YYYY-MM-DD");
    return `<time datetime="${date}">${date}</time>`;
  },

  datetime: (date, format) => {
    return `<time datetime="${dayjs(date).format()}">${dayjs(date).format(
      format
    )}</time>`;
  },

  randomId: () => nanoid(),

  todo: (description) => {
    if (isProduction) return "";
    return `<p><span style="font-weight: bold; color: white; background-color: #db2106; padding: 5px;">TODO:</span><span> ${description}</span></p>`;
  },
};
