const renderItem = ({ label, value, bounds }) => {
  const chartValue = value / bounds.max;
  // if normalization on [0-100] is needed in the future: (value - bounds.min) / (bounds.max - bounds.min)

  return `<tr style="--dk-chart-value: ${chartValue}">
    <td>${label}</td>
    <td>
      <div class="dk-chart-bar">
        <div class="dk-chart-value">${value}</div>
      </div>
    </td>
  </tr>`;
};

/**
 * Render a bar chart. The content includes one item per line in the format "label:value". The first line contains column headers.
 */
module.exports = function (content, caption) {
  const [[headerKey, headerValue], ...items] = content
    .split("\n")
    .map((item) => item.split(":"))
    .filter((item) => item.length === 2);

  const bounds = items.reduce(
    (acc, [, value]) => ({
      // include "min" if needed in the future
      max: Math.max(acc.max, parseFloat(value)),
    }),
    { max: 0 },
  );

  const captionMarkup = caption ? `<caption>${caption}</caption>` : "";

  const rowsMarkup = items
    .map(([label, value]) => {
      return value
        ? renderItem({
            label: label.trim(),
            value: parseFloat(value),
            bounds,
          })
        : undefined;
    })
    .filter(Boolean)
    .join("\n");

  return `<dk-bar-chart>
    <table>${captionMarkup}
      <thead>
        <tr class="visually-hidden">
          <th>${headerKey}</th>
          <th>${headerValue}</th>
        </tr>  
      </thead>
      <tbody class="text-3">
        ${rowsMarkup}    
      </tbody>
    </table>
  </dk-bar-chart>`;
};
