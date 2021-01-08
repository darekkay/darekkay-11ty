/**
 * YouTube iframe.
 * Uses: https://github.com/paulirish/lite-youtube-embed
 *
 * Syntax:
 *   {% youtube video_id title %}
 */
module.exports = (id, title) => {
  return `<lite-youtube videoid="${id}" playlabel="Play: ${title}"></lite-youtube>`;
};
