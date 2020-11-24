const dayjs = require("dayjs");
const { nanoid } = require("nanoid");

const currentDateShortcode = [
  "currentDate",
  () => {
    const date = dayjs().format("YYYY-MM-DD");
    return `<time datetime="${date}">${date}</time>`;
  },
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
