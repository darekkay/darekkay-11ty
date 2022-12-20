/* eslint-disable node/callback-return */
/**
 * Eleventy dev-server middleware to delay (asset) requests.
 * Useful to simulate page loading on slow networks.
 */
module.exports = ({
  maxDelayInSeconds = 5,
  applyFilter = (req) => !req.url.endsWith("/"),
}) => {
  return async (req, res, next) => {
    if (applyFilter(req)) {
      const timeoutInSeconds =
        Math.floor(Math.random() * maxDelayInSeconds) + 1;
      setTimeout(() => {
        next();
      }, timeoutInSeconds * 1000);
    } else {
      next();
    }
  };
};
