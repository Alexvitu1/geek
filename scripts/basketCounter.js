"use strict";

// Счетчик товаров в корзине

const headerBasketEl = document.querySelector(".header__basket");
const basketCounterEl = document.querySelector(".basket-counter");
const catalogBoxEl = document.querySelector(".catalog__box");
const cardButtonEl = document.querySelector(".card__button");

let counter = 0;
let cartArray = [];

const productQty = localStorage.getItem("addedProductsQuantity");
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
    cartArray.push();
    const card = e.target.closest(".card");
    const number = card.getAttribute("data-number");
    cartArray.push(number);
    // localStorage.setItem("selectedProducts", cartArray);
    localStorage.setItem("selectedProducts", JSON.stringify(cartArray));
    localStorage.setItem("addedProductsQuantity", counter);
    basketCounterEl.innerText = localStorage.getItem("addedProductsQuantity");
  }
});
