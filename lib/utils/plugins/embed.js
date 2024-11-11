const { dirname, basename, join } = require("node:path");
const { readFileSync, existsSync, utimesSync } = require("node:fs");

const logger = require("@darekkay/logger");

const EMBEDS_FOLDER_NAME = "embeds";

/**
 * A plugin to render an external embed.
 *
 * This plugin has two improvements over the official Eleventy Render Plugin:
 *
 *   - The embed path is relative to the post.
 *   - The markdown file reloads when one of its embeds has changed.
 *
 * This plugin assumes the following folder structure:
 *
 *  📁 my-page
 *  ├─ 📁 embeds
 *  |  └─ 📄 my-embed.html
 *  └─ 📄 my-page.md
 *
 * @param { import("../../../types/eleventy").Config } eleventyConfig - Eleventy configuration instance
 */
function EleventyEmbedPlugin(eleventyConfig) {
  function renderEmbed(fileName) {
    const embedPath = join(
      dirname(this.page.inputPath),
      EMBEDS_FOLDER_NAME,
      fileName,
    );

    if (existsSync(embedPath)) {
      return readFileSync(embedPath, "utf8");
    }

    logger.error(`Embed '${fileName}' not found.`);

    return `<strong>⚠️ Embed <em>'${fileName}'</em> not found.</strong>`;
  }

  eleventyConfig.addShortcode("renderEmbed", renderEmbed);

  /**
   * Update a markdown file when one of its embed changes.
   * See also: https://github.com/11ty/eleventy/issues/2924
   */
  eleventyConfig.on("eleventy.beforeWatch", (value) => {
    const markdownFilesToUpdate = value
      .filter((page) => page.includes(`/${EMBEDS_FOLDER_NAME}/`))
      .map((page) => {
        const directoryPath = dirname(dirname(page));
        return join(directoryPath, `${basename(directoryPath)}.md`);
      });

    for (const markdownFile of markdownFilesToUpdate) {
      // touch the corresponding markdown file, so that it's reloaded
      // idea based on https://github.com/11ty/eleventy/issues/2903#issuecomment-1694819372
      utimesSync(markdownFile, new Date(), new Date());
    }
  });
}

module.exports = EleventyEmbedPlugin;
