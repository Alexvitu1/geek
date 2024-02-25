"use strict";

// Счетчик товаров в корзине
const headerBasketEl = document.querySelector(".header__basket");
const basketCounterEl = document.querySelector(".basket-counter");
const catalogBoxEl = document.querySelector(".catalog__box");
const cardButtonEl = document.querySelector(".card__button");

let counter = 0;

catalogBoxEl.addEventListener("click", (e) => {
  console.log(e.target.innerText);
  if (
    e.target.className === "card__button" &&
    e.target.innerText === "В корзину"
  ) {
    counter++;
    headerBasketEl.style.visibility = "visible";
    basketCounterEl.innerText = counter;
    e.target.innerText = "Товар в корзине";
    e.target.style.marginBottom = "30px";
    e.target.classList.remove("card__button");
    e.target.classList.add("catalog__card__button_basket");
  }
});
