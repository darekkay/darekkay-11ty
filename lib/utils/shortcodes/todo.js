const { isProduction } = require("../index");

module.exports = (description) => {
  if (isProduction) return "";
  return `<p><span style="font-weight: bold; color: white; background-color: #db2106; padding: 5px;">TODO:</span><span> ${description}</span></p>`;
};
