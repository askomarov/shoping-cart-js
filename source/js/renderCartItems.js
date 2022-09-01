/**
 *
 * @param {Array} items  array of items to render
 * @param {Element} cart list in which render
 */
export default function renderCartItems(items, cart) {
  // clear before render
  cart.innerHTML = "";
  // render
  items.forEach((product) => {
    cart.innerHTML += `
        <div class="cart-list__item cart-item ${
          !product.instock ? "cart-item--disabled" : ""
        }" data-productcart-id="${product.id}">
          <div class="cart-item__img-wrap"><img class="cart-item__img" src="img/products/${
            product.img
          }.png"
              srcset="img/products/${
                product.img
              }@2x.png 2x" width="96" height="96"
              alt="${product.title}">
          </div>
          <div class="cart-item__info">
            <h3 class="cart-item__name">${product.title}</h3>
            <p class="cart-item__price">${product.price}</p>
          </div>
          <div class="cart-item__actions">
            <button class="cart-item__btn cart-item__btn--decrease" type="button">
              <svg width="16" height="16" aria-hidden="true">
                <use href="#icon-minus"></use>
              </svg>
            </button>
            <div class="cart-item__quantity">${product.countInCart}</div>
            <button class="cart-item__btn cart-item__btn--increase" type="button">
              <svg width="16" height="16" aria-hidden="true">
                <use href="#icon-add"></use>
              </svg>
            </button>
          </div>
          <button class="cart-item__delete" type="button">
            <svg width="24" height="24" aria-hidden="true">
              <use href="#icon-x"></use>
            </svg>
          </button>
        </div>
    `;
  });
}
