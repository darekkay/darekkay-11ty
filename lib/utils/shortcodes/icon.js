module.exports = (
  name,
  spritePath = "/assets/icons/sprite.svg"
) => `<svg class="icon icon--${name}" role="img" aria-hidden="true">
    <use xlink:href="${spritePath}#icon-${name}"></use>
  </svg>`;
