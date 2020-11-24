const dayjs = require("dayjs");
const { nanoid } = require("nanoid");

const currentDateShortcode = [
  "currentDate",
  () => dayjs().format("YYYY-MM-DD"),
];

const randomIdShortcode = ["randomId", () => nanoid()];

const applySharedConfig = (eleventyConfig) => {
  eleventyConfig.addShortcode(...currentDateShortcode);
  eleventyConfig.addShortcode(...randomIdShortcode);
};

module.exports = {
  applySharedConfig,
  currentDateShortcode,
};
