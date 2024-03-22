"use strict";

// Счетчик товаров в корзине

const headerBasketEl = document.querySelector(".header__basket");
const basketCounterEl = document.querySelector(".basket-counter");
const catalogBoxEl = document.querySelector(".catalog__box");
const cardButtonEl = document.querySelector(".card__button");

let counter = 0;
let cartArray = [];
let productItemQtyArray = [];
let productItemPriceArray = [];

const productQty = localStorage.getItem("productQty");
if (productQty > 0) {
  headerBasketEl.style.visibility = "visible";
  basketCounterEl.innerText = productQty;
}

catalogBoxEl.addEventListener("click", (e) => {
  if (
    e.target.className === "card__button" &&
    e.target.innerText === "В корзину"
  ) {
    counter++;
    headerBasketEl.style.visibility = "visible";
    e.target.innerText = "Товар в корзине";
    e.target.classList.remove("card__button");
    e.target.classList.add("catalog__card__button_basket");
    const card = e.target.closest(".card");
    const number = card.getAttribute("data-number");
    cartArray.push(number);
    productItemQtyArray.push(1);
    productItemPriceArray.push(card.getAttribute("data-price"));
    localStorage.setItem("selectedProducts", JSON.stringify(cartArray));
    localStorage.setItem("productQty", counter);
    localStorage.setItem(
      "productItemQtyArray",
      JSON.stringify(productItemQtyArray)
    );
    localStorage.setItem(
      "productItemPriceArray",
      JSON.stringify(productItemPriceArray)
    );
    basketCounterEl.innerText = localStorage.getItem("productQty");
  }
});
