const util = require("node:util");

/**
 * Debug a variable.
 *
 * {{ variable | debug }}
 *
 * */
module.exports = (value) => {
  return util.inspect(value, { compact: false });
};
