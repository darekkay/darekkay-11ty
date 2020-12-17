const util = require("util");

const dayjs = require("dayjs");

module.exports = {
  debug: (value) => {
    return util.inspect(value, { compact: false });
  },

  formatDate: (date, format) => {
    return dayjs(date).format(format);
  },
};
