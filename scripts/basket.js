"use strict";
if (localStorage.length === 0) {
  // Ветвление по наличию продуктов в корзине - в корзине нет продуктов
  const basketEmptyMessageEl = document.querySelector(".basket__empty");
  basketEmptyMessageEl.classList.add("visible");
} else {
  // Ветвление по наличию продуктов в корзине - в корзине есть продукты. Вывод карточек выбранных продуктов на экран

  const basketFullEl = document.querySelector(".basket__full");
  basketFullEl.classList.add("visible_flex");
  let productQty = localStorage.getItem("addedProductsQuantity");
  const productAttrs = localStorage.getItem("selectedProducts");
  const productsAttribArrEls = productAttrs.split(",");
  const cardsEls = document.querySelectorAll(".card");
  // Вывод первоначального количества продуктов в форме заказа
  const basketOrderItemsEl = document.querySelector(
    ".basket__order-items-number"
  );
  basketOrderItemsEl.innerText = `${productQty}`;

  productsAttribArrEls.forEach((item) => {
    cardsEls.forEach((element) => {
      if (element.getAttribute("data-number") === item) {
        element.classList.add("visible");
        element.classList.add("active-card");
      }
    });
  });

  // Подсчет первоначальноей общей стоимости
  const basketOrderTotalEl = document.querySelector(".ruble-sign");
  let basketTotalAmount = 0;
  const cardsActiveEls = document.querySelectorAll(".active-card");
  cardsActiveEls.forEach((element) => {
    // if (element.className === "active-card") {
    const cardPriceSubtotalAmountEl = +element.querySelector(
      ".card__price-subtotal"
    ).textContent;
    basketTotalAmount = basketTotalAmount + cardPriceSubtotalAmountEl;
    // }
  });

  basketOrderTotalEl.innerText = `${basketTotalAmount}`;

  // Удаление карточек выбранных продуктов с экрана

  basketFullEl.addEventListener("click", (e) => {
    if (e.target.className === "card__button") {
      const cardToDelete = e.target.closest(".card");
      cardToDelete.classList.remove("visible");
      cardToDelete.classList.add("hidden");
      cardToDelete.classList.remove("active-card");
      productQty = productQty - 1;

      // Подсчет и вывод количества продуктов в форме заказа
      basketOrderItemsEl.innerText = `${productQty}`;

      // Подсчет общей стоимости
      const basketOrderTotalEl = document.querySelector(".ruble-sign");
      const cardsEls = document.querySelectorAll(".active-card");
      let basketTotalAmount = 0;
      cardsEls.forEach((element) => {
        const cardPriceSubtotalAmountEl = +element.querySelector(
          ".card__price-subtotal"
        ).textContent;
        basketTotalAmount = basketTotalAmount + cardPriceSubtotalAmountEl;
      });
      // console.log(basketTotalAmount);
      basketOrderTotalEl.innerText = `${basketTotalAmount}`;

      if (productQty < 1) {
        basketFullEl.classList.remove("visible_flex");
      }
    }
  });
}

// Добавление единиц товара в карточке
const basketFullEl = document.querySelector(".basket__full");
let productUnitQty = 1;
const cardBttnQtyLeftEl = document.querySelector(".card__button-qty-left");
const cardBttnQtyRightEl = document.querySelector(".card__button-qty-right");
const cardUnitQtyEl = document.querySelector(".card__unit-qty");
cardUnitQtyEl.innerText = `${productUnitQty}`;

basketFullEl.addEventListener("click", (e) => {
  if (e.target.className === "card__button-qty-right card__button-qty") {
    const cardUnitQtyEl = e.target.previousElementSibling;
    const number = e.target.previousElementSibling.textContent;
    productUnitQty = +number + 1;
    cardUnitQtyEl.innerText = `${productUnitQty}`;
    if (productUnitQty > 1) {
      const cardBttnQtyLeftEl = cardUnitQtyEl.previousElementSibling;
      cardBttnQtyLeftEl.removeAttribute("disabled");
      cardBttnQtyLeftEl.classList.add("card__button-qty");
    }

    // Подсчет и вывод стоимость одного продукта
    const cardPriceSubtotalEl = e.target.parentElement.previousElementSibling;
    const cardPriceSubtotalAmountEl = cardPriceSubtotalEl.firstElementChild;
    const cardPriceSubtotalAmountContent =
      cardPriceSubtotalEl.firstElementChild.getAttribute("data-subtotal");
    const subTotalPriceAmount =
      +cardPriceSubtotalAmountContent * productUnitQty;
    cardPriceSubtotalAmountEl.innerText = `${subTotalPriceAmount}`;
  }

  // Подсчет общей стоимости
  const basketOrderTotalEl = document.querySelector(".ruble-sign");
  const cardsActiveEls = document.querySelectorAll(".active-card");
  let basketTotalAmount = 0;
  cardsActiveEls.forEach((element) => {
    const cardPriceSubtotalAmountEl = +element.querySelector(
      ".card__price-subtotal"
    ).textContent;
    // console.log(cardPriceSubtotalAmountEl);
    basketTotalAmount = basketTotalAmount + cardPriceSubtotalAmountEl;
  });
  // console.log(basketTotalAmount);
  basketOrderTotalEl.innerText = `${basketTotalAmount}`;
});

// Удаление единиц товара в карточке
basketFullEl.addEventListener("click", (e) => {
  if (e.target.className === "card__button-qty-left card__button-qty") {
    const cardUnitQtyEl = e.target.nextElementSibling;
    const number = e.target.nextElementSibling.textContent;
    productUnitQty = +number - 1;
    cardUnitQtyEl.innerText = `${productUnitQty}`;
    if (productUnitQty <= 1) {
      const cardBttnQtyLeftEl = e.target;
      cardBttnQtyLeftEl.setAttribute("disabled", "");
      cardBttnQtyLeftEl.classList.remove("card__button-qty");
    }
    // Подсчет и вывод стоимость одного продукта
    const cardPriceSubtotalEl = e.target.parentElement.previousElementSibling;
    const cardPriceSubtotalAmountEl = cardPriceSubtotalEl.firstElementChild;
    const cardPriceSubtotalAmountContent =
      cardPriceSubtotalEl.firstElementChild.getAttribute("data-subtotal");
    const subTotalPriceAmount =
      +cardPriceSubtotalAmountContent * productUnitQty;
    cardPriceSubtotalAmountEl.innerText = `${subTotalPriceAmount}`;
  }

  // Подсчет общей стоимости
  const basketOrderTotalEl = document.querySelector(".ruble-sign");
  const cardsActiveEls = document.querySelectorAll(".active-card");
  let basketTotalAmount = 0;
  cardsActiveEls.forEach((element) => {
    const cardPriceSubtotalAmountEl = +element.querySelector(
      ".card__price-subtotal"
    ).textContent;
    basketTotalAmount = basketTotalAmount + cardPriceSubtotalAmountEl;
  });
  basketOrderTotalEl.innerText = `${basketTotalAmount}`;
});

// Очистка корзины
const basketCleanEl = document.querySelector(".basket__trash-icon");
basketCleanEl.addEventListener("click", (e) => {
  basketFullEl.classList.remove("visible_flex");
});

// Модальное окно

// const teamEl = document.querySelector(".team");
const basketOrderButtonEl = document.querySelector(".basket__order-button");
const modalEl = document.querySelector(".modal");
// const modalWindowEl = document.querySelector(".modal__window");
// const modalWindowAllEl = document.querySelectorAll(".modal__window");
// const modalWindowArrayEl = document.querySelectorAll(`[data-modal]`);
const modalWindowCloseEl = document.querySelector(".modal__close");

basketOrderButtonEl.addEventListener("click", (e) => {
  modalEl.style.display = "flex";

  document.addEventListener("mousedown", function (event) {
    if (
      (!modalEl.contains(event.target) && event.target !== modalEl) ||
      event.target === modalWindowCloseEl
    ) {
      modalEl.style.display = "none";
    }
  });
});
