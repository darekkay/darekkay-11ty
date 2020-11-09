const dayjs = require("dayjs");

const currentDateShortcode = [
  "currentDate",
  () => dayjs().format("YYYY-MM-DD"),
];

const applySharedConfig = (eleventyConfig) => {
  eleventyConfig.addShortcode(...currentDateShortcode);
};

module.exports = {
  applySharedConfig,
  currentDateShortcode,
};
