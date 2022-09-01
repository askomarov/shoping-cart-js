const createCatalogItems = (products, catalogListParent) => {
  catalogListParent.innerHTML = "";

  products.forEach((product) => {
    catalogListParent.innerHTML += `
  <li class="catalog-list__item product-card" data-product-id="${product.id}">
    <div class="product-card__wrap">
      <div class="product-card__img-wrap">
        <img class="product-card__img-main"
            src="img/products/${product.img}.png"
            srcset="img/products/${product.img}@2x.png 2x"
            width="156"
            height="156"
            alt="${product.title}">
        <img class="product-card__img-hover"
          src="img/products/product-img-hover.png"
          srcset="img/products/product-img-hover@2x.png 2x"
          width="156"
          height="156"
          alt="${product.title}">
      </div>
      <h4 class="product-card__title">${product.title}</h4>
      <p class="product-card__price">${product.price}</p>
      <button type="button" class="product-card__btn-add-tocart" aria-label="add product to card">
        <svg width="16" height="16" aria-hidden="true">
          <use href="#icon-add"></use>
        </svg>
      </button>
    </div>
</li>`;
  });
};

export { createCatalogItems };
