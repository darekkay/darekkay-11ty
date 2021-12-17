const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

/**
 * Format a date with a custom format. When no format is provided, an ISO date is returned.
 *
 * {{ date | formatDate("YYYY-MM-DD") }}
 *
 * */
module.exports = (date, format) => {
  return dayjs(date).utc().format(format);
};
