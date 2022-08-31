import { products } from "./data.js";
import { initSwiperSlider } from "./slider.js";
import { createCatalogItems } from "./createCatalogItems.js";

const btnOpenCart = document.querySelector("#colors-cart");
const btnCloseCart = document.querySelector(".site-cart__close-cart");
const siteCart = document.querySelector(".site-cart");

function closeCart() {
  siteCart.classList.remove("active");
  wrapper.classList.remove("modal-open");
}

function openCartModal(evt) {
  evt.preventDefault();
  if (siteCart.classList.contains("active")) {
    siteCart.classList.remove("active");
    wrapper.classList.remove("modal-open");
  } else {
    wrapper.classList.add("modal-open");
    siteCart.classList.add("active");
    btnCloseCart.addEventListener("click", closeCart, { once: true });
  }
}
btnOpenCart.addEventListener("click", openCartModal);

const catalogListContainer = document.querySelector(".catalog-list");

let navToggle = document.querySelector(".nav__toggle");
let navWrapper = document.querySelector(".header__menu");

navToggle.addEventListener("click", function () {
  if (navWrapper.classList.contains("active")) {
    this.setAttribute("aria-expanded", "false");
    this.setAttribute("aria-label", "menu");
    navWrapper.classList.remove("active");
  } else {
    navWrapper.classList.add("active");
    this.setAttribute("aria-label", "close menu");
    this.setAttribute("aria-expanded", "true");
  }
});

const URL = "https://baconipsum.com/api/?type=lucky";

function getTextData(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", URL);
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.addEventListener("error", () => {
    console.log("error");
  });

  xhr.send();
}

function renderPromoText(response) {
  const dataText = response;
  promoText.textContent = dataText[0];
  return;
}

// getTextData(renderPromoText);

const btnOpenSortModal = document.querySelector("#sort-btn");
const sortDropdwonMenu = document.querySelector(".sort-list-values");

btnOpenSortModal.addEventListener("click", () => {
  if (btnOpenSortModal.getAttribute("aria-expanded") === false) {
    btnOpenSortModal.setAttribute("aria-expanded", "false");
    wrapper.classList.remove("modal-open");
  } else {
    btnOpenSortModal.setAttribute("aria-expanded", "true");
    wrapper.classList.add("modal-open");
  }
});

sortDropdwonMenu.addEventListener("click", (evt) => {
  evt.preventDefault();
  let filterValue = evt.target.dataset.value;
  let labalText = evt.target.textContent;
  console.log(labalText);
  onSelectChangeSortMetod(filterValue);
  btnOpenSortModal.querySelector("span").textContent = labalText;
  wrapper.classList.remove("modal-open");
  btnOpenSortModal.setAttribute("aria-expanded", "false");
});

const wrapper = document.querySelector(".wrapper");
const btnOpenFilters = document.querySelector("#filter-btn");

const onBackDropCloseModal = (evt) => {
  evt.stopPropagation();
  if (evt.target === wrapper) {
    console.log(evt);
    filtersForm.classList.remove("active");
    wrapper.classList.remove("modal-open");
  }
};
//
const filtersForm = document.querySelector(".filter-wrap");

if (btnOpenFilters) {
  btnOpenFilters.addEventListener("click", (evt) => {
    evt.stopPropagation();
    if (filtersForm.classList.contains("active")) {
      filtersForm.classList.remove("active");
      wrapper.classList.remove("modal-open");
    } else {
      filtersForm.classList.add("active");
      wrapper.classList.add("modal-open");
      wrapper.addEventListener("click", onBackDropCloseModal);
    }
  });
}

const renderFilteredProducts = () => {
  const checkedValues = [...filtersForm.querySelectorAll("input")]
    .filter((input) => input.checked)
    .map((input) => input.value);
  if (checkedValues.length === 0) {
    createCatalogItems(products, catalogListContainer);
    return;
  } else {
    const filteredStores = products.filter(({ type }) => {
      for (let tag of type) {
        if (checkedValues.includes(tag)) {
          return true;
        }
        return false;
      }
    });
    createCatalogItems(filteredStores, catalogListContainer);
    return;
  }
};

const onChangeFilterForm = () => {
  filtersForm.addEventListener("change", renderFilteredProducts);
};

document.addEventListener("DOMContentLoaded", () => {
  initSwiperSlider();
  createCatalogItems(products, catalogListContainer);
  renderFilteredProducts();
  onChangeFilterForm();
});

function getNubmerFromPrice(str) {
  return str.split(" ")[0];
}

const sortByAscendingAmount = (arr) => {
  return arr.sort((prev, next) => {
    return getNubmerFromPrice(next.price) - getNubmerFromPrice(prev.price);
  });
};

const sortByDescendingPrice = (arr) => {
  return arr.sort((prev, next) => {
    return getNubmerFromPrice(prev.price) - getNubmerFromPrice(next.price);
  });
};

// console.log(sortByDescendingPrice(products));
// console.log(sortByAscendingAmount(products));

let sortMetod = "cheap";

function onSelectChangeSortMetod(value) {
  sortMetod = value;
  console.log(sortMetod);
  return;
}

const sortForm = () => {
  switch (sortMetod) {
    case "cheap":
      break;
    case "expansive":
      break;
    case "popular":
      break;
    case "newer":
      break;
  }
};
