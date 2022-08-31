

const createCatalogItems = (itemsList, catalogListParent) => {
  catalogListParent.innerHTML = "";
  // html шаблон который будем копировать
  const catalogItemTemplate = document
    .querySelector("#card-tempalate")
    .content.querySelector(".product-card");
  const similiarItemsFragment = document.createDocumentFragment();

  itemsList.forEach((item) => {
    // копируем шаблон со всем его содержимым true в новую переменную
    const catalogItemElemet = catalogItemTemplate.cloneNode(true);

    catalogItemElemet.dataset.type = `${item.type}`
    catalogItemElemet.querySelector(".product-card__title ").textContent = item.title;
    let mainImg = catalogItemElemet.querySelector(".product-card__img-main");
    mainImg.src = `img/products/${item.img}.png`;
    mainImg.srcset = `img/products/${item.img}@2x.png 2x`;
    mainImg.alt = `${item.title}`;

    let hoverImg = catalogItemElemet.querySelector(
      ".product-card__img-hover"
    );
    hoverImg.src = "img/products/product-img-hover.png";
    hoverImg.srcset = "img/products/product-img-hover@2x.png 2x";
    hoverImg.alt = `${item.title}`;

    catalogItemElemet.querySelector(".product-card__price").textContent = item.price;

    // добавляем каждый элемент в созданный DocumentFragment
    similiarItemsFragment.appendChild(catalogItemElemet);
  });
  // добваляем в родитель фрагмент с готовыми картинками
  catalogListParent.appendChild(similiarItemsFragment);
};

export { createCatalogItems };
