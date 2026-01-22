const eleventyFetch = require("@11ty/eleventy-fetch");
const logger = require("@darekkay/logger");

const icon = require("./icon");

const FETCH_CONFIG = {
  duration: "30d", // save for 1 month
  type: "json", // we’ll parse JSON for you
};

const getWebStatusUrl = (featureId) =>
  `https://api.webstatus.dev/v1/features/${featureId}`;

const getBaselineDescription = (baseline, year) =>
  ({
    widely: `<strong>Baseline</strong> ⸱ widely available across major browsers.`,
    newly: `<strong>Baseline ${year}</strong> ⸱ newly available across major browsers.`,
    limited: `<strong>Limited availability</strong> across major browsers.`,
  })[baseline];

/**
 * Returns a Baseline box for a web feature
 */
module.exports = async function (
  webStatusFeatureId,
  canIUseFeatureId = webStatusFeatureId,
) {
  try {
    const webStatusData = await eleventyFetch(
      getWebStatusUrl(webStatusFeatureId),
      FETCH_CONFIG,
    );

    const data = {
      featureName: webStatusData.name,
      baseline: webStatusData.baseline?.status || "unknown",
      baselineYear: webStatusData.baseline?.low_date?.substring(0, 4),
    };

    return `<dk-baseline availability="${data.baseline}">
    <div class="dk-baseline-title flex justify-between gap-4 text-3 bg-offset border-bottom">
      <span><strong>${data.featureName}</strong></span>
      <span class="text-right"><a href="https://caniuse.com/${canIUseFeatureId}" aria-label="Browser support for ${data.featureName}">Browser support</a></span>
    </div>
    <div class="dk-baseline-content">
      ${icon(`baseline-${data.baseline}`, "mr-1 pt-1")}
      ${getBaselineDescription(data.baseline, data.baselineYear)}
    </div>
</dk-baseline>`;
  } catch (error) {
    logger.error(error);
    return `<dk-alert-box type="danger">
Baseline support for <strong>${webStatusFeatureId}</strong> could not be determined. Please check it <a href="https://webstatus.dev/features/${webStatusFeatureId}">manually</a>.
</dk-alert-box>`;
  }
};
