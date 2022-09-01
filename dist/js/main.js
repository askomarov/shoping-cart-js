import { products } from "./data.js";
import { initSwiperSlider } from "./slider.js";
import { createCatalogItems } from "./createCatalogItems.js";
import renderCartItems from "./renderCartItems.js";
import {
  getNubmerFromPrice,
  declOfNum,
  arraysContainSame,
  sortByAscendingAmount,
  sortByDescendingPrice,
} from "./utils.js";

const btnOpenCart = document.querySelector("#colors-cart");
const btnCloseCart = document.querySelector(".site-cart__close-cart");
const siteCart = document.querySelector(".site-cart");
const cartList = document.querySelector(".cart-list");

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

let selectedSortType = "cheap";

const sortCatalog = (catalog) => {
  switch (selectedSortType) {
    case "cheap":
      sortByDescendingPrice(catalog);
      break;
    case "expansive":
      sortByAscendingAmount(catalog);
      break;
    case "popular":
      break;
    case "newer":
      break;
  }
  return catalog;
};

function changeSortType() {
  let checkedInput = sortDropdwonMenu.querySelector("input:checked");
  let filterValue = checkedInput.value;
  let labelText = checkedInput.nextElementSibling.textContent;
  btnOpenSortModal.querySelector("span").textContent = labelText;
  selectedSortType = filterValue;
}

function onSortFromChange() {
  changeSortType();
  filteredProducts = sortCatalog(filteredProducts);

  updateCatalog(filteredProducts);
  wrapper.classList.remove("modal-open");
  btnOpenSortModal.setAttribute("aria-expanded", "false");
  return;
}

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

//  CART
let cartArray = JSON.parse(localStorage.getItem("CART")) || [];

const addItemToCart = (id) => {
  if (cartArray.some((item) => item.id === id)) {
    alert("Product alredy in cart");
  } else {
    let prod = products.find((item) => item.id === id);
    cartArray.push({
      ...prod,
      countInCart: 1,
    });
    return;
  }
};

// ///////////
const onAddBtnHandler = (evt) => {
  evt.stopPropagation();
  if (evt.target.classList.contains("product-card__btn-add-tocart")) {
    const parent = evt.target.closest("[data-product-id]");
    const id = Number(parent.dataset.productId);

    addItemToCart(id);
    updateCart();
    // deleteTaskFromHtml(parent, confirmed);
  }
  return;
};
//
const onPlusBtnHandler = (evt) => {
  evt.stopPropagation();
  if (evt.target.classList.contains("cart-item__btn--increase")) {
    const parent = evt.target.closest("[data-productcart-id]");
    const id = Number(parent.dataset.productcartId);
    increaseProcudtInCart(id);
  }
  return;
};

function increaseProcudtInCart(id) {
  cartArray = cartArray.map((item) => {
    let countInCart = item.countInCart;
    if (item.id === id && countInCart < item.instock) {
      countInCart++;
    }
    return {
      ...item,
      countInCart,
    };
  });
  return updateCart();
}

const onMinusBtnHandler = (evt) => {
  evt.stopPropagation();
  if (evt.target.classList.contains("cart-item__btn--decrease")) {
    const parent = evt.target.closest("[data-productcart-id]");
    const id = Number(parent.dataset.productcartId);

    cartArray = cartArray.map((item) => {
      let countInCart = item.countInCart;
      if (item.id === id && countInCart > 1) {
        countInCart--;
      }
      return {
        ...item,
        countInCart,
      };
    });
    updateCart();
  }
  return;
};

const onDeleteBtnHandler = (evt) => {
  evt.stopPropagation();
  if (evt.target.classList.contains("cart-item__delete")) {
    const parent = evt.target.closest("[data-productcart-id]");
    const id = Number(parent.dataset.productcartId);

    removeItemFromCart(id);
    updateCart();
  }
  return;
};
// cart update
const getTotalCartPrice = () => {
  return cartArray.reduce((acc, product) => {
    return acc + getNubmerFromPrice(product.price) * product.countInCart;
  }, 0);
};

const totalCartEl = document.querySelector(".site-cart__total-numbers");
const totalCartLenghtEl = document.querySelector(".site-cart__items-count");
const headerCartLinkCount = document.querySelector(
  ".header-actions__cart-link"
);

function renderCartItemCountEl() {
  const words = ["товар", "товара", "товаров"];
  return (totalCartLenghtEl.textContent = `${cartArray.length} ${declOfNum(
    cartArray.length,
    words
  )}`);
}

function renderTotalPrice() {
  const totalPrice = getTotalCartPrice();
  totalCartEl.textContent = `${totalPrice} ₽`;
}

function removeItemFromCart(id) {
  cartArray.map((item) => {
    if (item.id === id) {
      cartArray.splice(cartArray.indexOf(item), 1);
    }
  });
  return cartArray;
}

function updateCart() {
  renderCartItems(cartArray, cartList);
  renderTotalPrice();
  renderCartItemCountEl();

  // if (cartArray.length > 0) {
  headerCartLinkCount.textContent = cartArray.length || 0;
  // }
  // save to localStorage
  localStorage.setItem("CART", JSON.stringify(cartArray));
}

let selectedFilters = ["new"];
let filteredProducts = getFilteredCatalog();

const onChangeFilterForm = () => {
  const checkedValues = [...filtersForm.querySelectorAll("input")]
    .filter((input) => input.checked)
    .map((input) => input.value);
  selectedFilters = checkedValues;
  filteredProducts = getFilteredCatalog();
  updateCatalog(filteredProducts);
};

function getFilteredCatalog() {
  if (selectedFilters.length === 0) {
    return products;
  } else {
    const filteredProducts = products.filter(({ type }) => {
      return arraysContainSame(selectedFilters, type);
    });
    return filteredProducts;
  }
}

function updateCatalog(catalog) {
  catalog = sortCatalog(catalog);
  createCatalogItems(catalog, catalogListContainer);
}

//  MAIN
document.addEventListener("DOMContentLoaded", () => {
  initSwiperSlider();
  createCatalogItems(products, catalogListContainer);
  updateCatalog(getFilteredCatalog());
  updateCart();

  catalogListContainer.addEventListener("click", onAddBtnHandler);
  cartList.addEventListener("click", onPlusBtnHandler);
  cartList.addEventListener("click", onMinusBtnHandler);
  cartList.addEventListener("click", onDeleteBtnHandler);

  filtersForm.addEventListener("change", onChangeFilterForm);

  sortDropdwonMenu.addEventListener("click", onSortFromChange);
});
