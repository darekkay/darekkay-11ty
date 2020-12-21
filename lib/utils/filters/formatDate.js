const dayjs = require("dayjs");

/**
 * Format a date with a custom format.
 *
 * {{ date | formatDate("YYYY-MM-DD") }}
 *
 * */
module.exports = (date, format) => {
  return dayjs(date).format(format);
};
