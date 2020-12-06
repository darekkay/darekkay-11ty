const dayjs = require("dayjs");
const { nanoid } = require("nanoid");

module.exports = {
  currentDate: () => {
    const date = dayjs().format("YYYY-MM-DD");
    return `<time datetime="${date}">${date}</time>`;
  },

  randomId: () => nanoid(),
};
