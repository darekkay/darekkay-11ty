module.exports = (
  name,
  className = "",
  spritePath = "/assets/icons/sprite.svg"
) => `<svg class="icon icon--${name} ${className}" role="img" aria-hidden="true">
    <use xlink:href="${spritePath}#icon-${name}"></use>
  </svg>`;
