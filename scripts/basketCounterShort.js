"use strict";

// Вывод количества товаров в корзине над значком корзины

const headerBasketEl = document.querySelector(".header__basket");
const basketCounterEl = document.querySelector(".basket-counter");

const productQty = localStorage.getItem("productQty");
if (productQty > 0) {
  headerBasketEl.style.visibility = "visible";
  basketCounterEl.innerText = productQty;
}
