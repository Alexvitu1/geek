"use strict";

if (!localStorage.getItem("productQty")) {
  // Ветвление по наличию товаров в корзине - в корзине нет товаров (В LocalStorage нет addedProductsQuantity)
  const basketEmptyMessageEl = document.querySelector(".basket__empty");
  basketEmptyMessageEl.classList.add("visible_flex");
} else {
  // Ветвление по наличию товаров в корзине - в корзине есть товары. Вывод карточек выбранных товаров на экран

  const basketFullEl = document.querySelector(".basket__full");
  basketFullEl.classList.add("visible_flex");
  const basketCounterEl = document.querySelector(".basket-counter");
  let productQty = localStorage.getItem("productQty");
  let productsAttribArrEls = JSON.parse(
    localStorage.getItem("selectedProducts")
  );

  let productItemQtyArray = JSON.parse(
    localStorage.getItem("productItemQtyArray")
  );
  let productItemPriceArray = JSON.parse(
    localStorage.getItem("productItemPriceArray")
  );

  const cardsEls = document.querySelectorAll(".card");

  // extendCardHeight(basketFullEl);

  productsAttribArrEls.forEach((item) => {
    cardsEls.forEach((element) => {
      if (element.getAttribute("data-number") === item) {
        element.classList.add("visible");
        element.classList.add("active-card");
      }
    });
  });

  // Вывод первоначального количества товаров в форме заказа
  const basketOrderItemsEl = document.querySelector(
    ".basket__order-items-number"
  );
  basketOrderItemsEl.innerText = `${productQty}`;

  // Первоначальный вывод стоимости всех товаров

  const cardsActiveEls = document.querySelectorAll(".active-card");
  cardsActiveEls.forEach((element, index) => {
    element.setAttribute("data-active", index);
    const productItemQty = productItemQtyArray[index];
    const productItemSubtotalPrice = productItemPriceArray[index];
    let cardPriceSubtotalAmountEl = element.querySelector(
      ".card__price-subtotal"
    );
    cardPriceSubtotalAmountEl.innerText = productItemSubtotalPrice;
    const cardUnitQtyEl = element.querySelector(".card__unit-qty");
    cardUnitQtyEl.innerText = productItemQty;

    if (productItemQty > 1) {
      const cardBttnQtyLeftEl = element.querySelector(".card__button-qty-left");
      cardBttnQtyLeftEl.removeAttribute("disabled");
      cardBttnQtyLeftEl.classList.add("card__button-qty");
    }
  });

  getOrderTotalAmount();

  // Удаление карточек выбранных товаров с экрана

  basketFullEl.addEventListener("click", (e) => {
    if (e.target.className === "card__button") {
      const cardToDelete = e.target.closest(".card");
      cardToDelete.remove();
      const cardToDeleteIndex = cardToDelete.getAttribute("data-active");

      const cardsActiveEls = document.querySelectorAll(".active-card");
      cardsActiveEls.forEach((element, index) => {
        element.setAttribute("data-active", index);
      });

      productQty = productQty - 1;
      localStorage.setItem("productQty", productQty);

      // Удаление индексов карточек товаров из LS для удаленной карточки товара

      deleteFromLS("selectedProducts", cardToDeleteIndex);
      // productsAttribArrEls = JSON.parse(
      //   localStorage.getItem("selectedProducts")
      // );
      // productsAttribArrEls.splice(cardToDeleteIndex, 1);

      // localStorage.setItem(
      //   "selectedProducts",
      //   JSON.stringify(productsAttribArrEls)
      // );

      // Удаление количества товаров из LS для удаленной карточки

      deleteFromLS("productItemQtyArray", cardToDeleteIndex);

      // productItemQtyArray = JSON.parse(
      //   localStorage.getItem("productItemQtyArray")
      // );
      // productItemQtyArray.splice(cardToDeleteIndex, 1);

      // localStorage.setItem(
      //   "productItemQtyArray",
      //   JSON.stringify(productItemQtyArray)
      // );

      // Удаление цен товаров из LS для удаленной карточки товара

      deleteFromLS("productItemPriceArray", cardToDeleteIndex);

      // productItemPriceArray = JSON.parse(
      //   localStorage.getItem("productItemPriceArray")
      // );

      // productItemPriceArray.splice(cardToDeleteIndex, 1);

      // localStorage.setItem(
      //   "productItemPriceArray",
      //   JSON.stringify(productItemPriceArray)
      // );

      // Подсчет и вывод количества товаров в форме заказа
      basketOrderItemsEl.innerText = `${productQty}`;

      // Вывод обновленного количества товаров в корзине над значком корзины
      basketCounterEl.innerText = productQty;
      if (productQty === 0) {
        basketFullEl.classList.remove("visible_flex");
        // const basketEl = document.querySelector(".basket");
        // basketEl.style.height = "55vh";

        // Удаление количества товаров над значком корзины и обнуление счетчика количества товаров в LS
        hideProductQty();
      }
      // Подсчет общей стоимости заказа
      getOrderTotalAmount();
    }
  });
  // }

  // Добавление единиц товара в карточке

  basketFullEl.addEventListener("click", (e) => {
    if (e.target.className === "card__button-qty-right card__button-qty") {
      const cardUnitQtyEl = e.target.previousElementSibling;
      const productItemQtyBase = e.target.previousElementSibling.textContent;
      let productItemQty = parseInt(productItemQtyBase) + 1;
      cardUnitQtyEl.innerText = `${productItemQty}`;

      const cardAttributeNumber = e.target
        .closest(".active-card")
        .getAttribute("data-active");
      productItemQtyArray[cardAttributeNumber] = productItemQty;
      localStorage.setItem(
        "productItemQtyArray",
        JSON.stringify(productItemQtyArray)
      );

      if (productItemQty > 1) {
        const cardBttnQtyLeftEl = cardUnitQtyEl.previousElementSibling;
        cardBttnQtyLeftEl.removeAttribute("disabled");
        cardBttnQtyLeftEl.classList.add("card__button-qty");
      }

      // Подсчет и вывод стоимость одного товара
      const cardPriceSubtotalEl = e.target.parentElement.previousElementSibling;
      getItemPrice(
        cardPriceSubtotalEl,
        productItemQtyArray,
        productItemPriceArray,
        cardAttributeNumber
      );
    }

    // Подсчет общей стоимости заказа
    getOrderTotalAmount();
  });

  // Удаление единиц товара в карточке
  basketFullEl.addEventListener("click", (e) => {
    if (e.target.className === "card__button-qty-left card__button-qty") {
      const cardUnitQtyEl = e.target.nextElementSibling;
      const productItemQtyBase = e.target.nextElementSibling.textContent;
      let productItemQty = parseInt(productItemQtyBase) - 1;
      cardUnitQtyEl.innerText = `${productItemQty}`;

      const cardAttributeNumber = e.target
        .closest(".active-card")
        .getAttribute("data-active");
      productItemQtyArray[cardAttributeNumber] = productItemQty;
      localStorage.setItem(
        "productItemQtyArray",
        JSON.stringify(productItemQtyArray)
      );

      if (productItemQty <= 1) {
        const cardBttnQtyLeftEl = e.target;
        cardBttnQtyLeftEl.setAttribute("disabled", "");
        cardBttnQtyLeftEl.classList.remove("card__button-qty");
      }

      // Подсчет и вывод стоимость одного товара
      const cardPriceSubtotalEl = e.target.parentElement.previousElementSibling;
      getItemPrice(
        cardPriceSubtotalEl,
        productItemQtyArray,
        productItemPriceArray,
        cardAttributeNumber
      );
    }

    // Подсчет общей стоимости заказа
    getOrderTotalAmount();
  });

  // Очистка корзины
  const basketCleanEl = document.querySelector(".basket__trash-icon");
  basketCleanEl.addEventListener("click", (e) => {
    basketFullEl.classList.remove("visible_flex");
    // Удаление количества товаров над значком корзины и обнуление счетчика количества товаров в LS
    hideProductQty();
  });
}

// Модальное окно

const basketOrderButtonEl = document.querySelector(".basket__order-button");
const modalEl = document.querySelector(".modal");
const modalWindowEl = document.querySelector(".modal__window");
const modalWindowCloseEl = document.querySelector(".modal__close");

basketOrderButtonEl.addEventListener("click", (e) => {
  modalEl.style.display = "flex";

  document.addEventListener("mousedown", function (event) {
    if (
      (!modalWindowEl.contains(event.target) &&
        event.target !== modalWindowEl) ||
      event.target === modalWindowCloseEl
    ) {
      modalEl.style.display = "none";
    }
  });
});

// Функция подсчета и вывода стоимости одного товара
const getItemPrice = (
  cardPriceSubtotalEl,
  productItemQtyArray,
  productItemPriceArray,
  cardAttributeNumber
) => {
  const cardPriceSubtotalAmountEl = cardPriceSubtotalEl.firstElementChild;
  const cardPriceSubtotalAmountContent =
    cardPriceSubtotalEl.firstElementChild.getAttribute("data-subtotal");
  let productItemQty = productItemQtyArray[cardAttributeNumber];
  const productSubtotralPriceAmount =
    cardPriceSubtotalAmountContent * productItemQty;
  productItemPriceArray[cardAttributeNumber] = productSubtotralPriceAmount;
  localStorage.setItem(
    "productItemPriceArray",
    JSON.stringify(productItemPriceArray)
  );
  cardPriceSubtotalAmountEl.innerText = productSubtotralPriceAmount;
};

// Функция удаление значений из LS для удаленной карточки товара

const deleteFromLS = (positionToDelete, cardToDeleteIndex) => {
  const productPositionArrEls = JSON.parse(
    localStorage.getItem(positionToDelete)
  );
  productPositionArrEls.splice(cardToDeleteIndex, 1);

  localStorage.setItem(
    `${positionToDelete}`,
    JSON.stringify(productPositionArrEls)
  );
};

// Функция подсчет общей стоимости заказа
function getOrderTotalAmount() {
  const basketOrderTotalEl = document.querySelector(".ruble-sign");
  const cardsActiveEls = document.querySelectorAll(".active-card");
  let basketTotalAmount = 0;
  cardsActiveEls.forEach((element) => {
    const cardPriceSubtotalAmountEl = +element.querySelector(
      ".card__price-subtotal"
    ).textContent;
    basketTotalAmount += cardPriceSubtotalAmountEl;
  });
  basketOrderTotalEl.innerText = `${basketTotalAmount}`;
}

// Функция удаление количества товаров над значком корзины и обнуление счетчика количества товаров в LS
const hideProductQty = () => {
  headerBasketEl.style.visibility = "hidden";
  localStorage.removeItem("productQty");
  localStorage.removeItem("selectedProducts");
  localStorage.removeItem("productItemQtyArray");
  localStorage.removeItem("productItemPriceArray");
};

// Увеличения высоты карточки товара
function extendCardHeight(basketFullEl) {
  if (basketFullEl.clientHeight < document.documentElement.clientHeight) {
    basketFullEl.style.height = `${
      basketFullEl.clientHeight +
      104 +
      176 +
      150 +
      125 +
      (document.documentElement.clientHeight - basketFullEl.clientHeight)
    }px`;
  }
}

// "use strict";

// if (!localStorage.getItem("addedProductsQuantity")) {
//   // Ветвление по наличию товаров в корзине - в корзине нет товаров (В LocalStorage нет addedProductsQuantity)
//   const basketEmptyMessageEl = document.querySelector(".basket__empty");
//   basketEmptyMessageEl.classList.add("visible_flex");
// } else {
//   // Ветвление по наличию товаров в корзине - в корзине есть товары. Вывод карточек выбранных товаров на экран

//   const basketFullEl = document.querySelector(".basket__full");
//   basketFullEl.classList.add("visible_flex");
//   const basketCounterEl = document.querySelector(".basket-counter");
//   let productQty = localStorage.getItem("addedProductsQuantity");
//   let productsAttribArrEls = JSON.parse(
//     localStorage.getItem("selectedProducts")
//   );

//   const cardsEls = document.querySelectorAll(".card");
//   // Вывод первоначального количества товаров в форме заказа
//   const basketOrderItemsEl = document.querySelector(
//     ".basket__order-items-number"
//   );
//   basketOrderItemsEl.innerText = `${productQty}`;

//   // extendCardHeight(basketFullEl);

//   productsAttribArrEls.forEach((item) => {
//     cardsEls.forEach((element) => {
//       if (element.getAttribute("data-number") === item) {
//         element.classList.add("visible");
//         element.classList.add("active-card");
//       }
//     });
//   });

//   // Подсчет первоначальноей общей стоимости заказа
//   getOrderTotalAmount();

//   // Удаление карточек выбранных товаров с экрана

//   basketFullEl.addEventListener("click", (e) => {
//     if (e.target.className === "card__button") {
//       const cardToDelete = e.target.closest(".card");
//       const cardToDeleteNumber = cardToDelete.getAttribute("data-number");
//       cardToDelete.classList.remove("visible");
//       cardToDelete.classList.add("hidden");
//       cardToDelete.classList.remove("active-card");
//       productQty = productQty - 1;
//       localStorage.setItem("addedProductsQuantity", productQty);

//       // Удаление индексов карточек товаров из ЛокСтораж
//       productsAttribArrEls = productsAttribArrEls.filter(
//         (number) => number !== cardToDeleteNumber
//       );
//       const newArray = Array.from(new Set(productsAttribArrEls));
//       localStorage.setItem("selectedProducts", JSON.stringify(newArray));

//       // Подсчет и вывод количества товаров в форме заказа
//       basketOrderItemsEl.innerText = `${productQty}`;

//       // Вывод обновленного количества товаров в корзине над значком корзины
//       basketCounterEl.innerText = productQty;
//       if (productQty === 0) {
//         basketFullEl.classList.remove("visible_flex");
//         const basketEl = document.querySelector(".basket");
//         // basketEl.style.height = "55vh";

//         // Удаление количества товаров над значком корзины и обнуление счетчика количества товаров в LS
//         hideProductQty();
//       }
//       // Подсчет общей стоимости заказа
//       getOrderTotalAmount();
//     }
//   });
// }

// // Добавление единиц товара в карточке
// const basketFullEl = document.querySelector(".basket__full");
// let productUnitQty = 1;
// const cardBttnQtyLeftEl = document.querySelector(".card__button-qty-left");
// const cardBttnQtyRightEl = document.querySelector(".card__button-qty-right");
// const cardUnitQtyEl = document.querySelector(".card__unit-qty");
// cardUnitQtyEl.innerText = `${productUnitQty}`;
// basketFullEl.addEventListener("click", (e) => {
//   if (e.target.className === "card__button-qty-right card__button-qty") {
//     const cardUnitQtyEl = e.target.previousElementSibling;
//     const number = e.target.previousElementSibling.textContent;
//     productUnitQty = parseInt(number) + 1;
//     cardUnitQtyEl.innerText = `${productUnitQty}`;
//     if (productUnitQty > 1) {
//       const cardBttnQtyLeftEl = cardUnitQtyEl.previousElementSibling;
//       cardBttnQtyLeftEl.removeAttribute("disabled");
//       cardBttnQtyLeftEl.classList.add("card__button-qty");
//     }

//     // Подсчет и вывод стоимость одного товара
//     const cardPriceSubtotalEl = e.target.parentElement.previousElementSibling;
//     getItemPrice(cardPriceSubtotalEl);
//   }
//   // Подсчет общей стоимости заказа
//   getOrderTotalAmount();
// });

// // Удаление единиц товара в карточке
// basketFullEl.addEventListener("click", (e) => {
//   if (e.target.className === "card__button-qty-left card__button-qty") {
//     const cardUnitQtyEl = e.target.nextElementSibling;
//     const number = e.target.nextElementSibling.textContent;
//     productUnitQty = parseInt(number) - 1;
//     cardUnitQtyEl.innerText = `${productUnitQty}`;
//     if (productUnitQty <= 1) {
//       const cardBttnQtyLeftEl = e.target;
//       cardBttnQtyLeftEl.setAttribute("disabled", "");
//       cardBttnQtyLeftEl.classList.remove("card__button-qty");
//     }

//     // Подсчет и вывод стоимость одного товара
//     const cardPriceSubtotalEl = e.target.parentElement.previousElementSibling;
//     getItemPrice(cardPriceSubtotalEl);
//   }
//   // Подсчет общей стоимости заказа
//   getOrderTotalAmount();
// });

// // Очистка корзины
// const basketCleanEl = document.querySelector(".basket__trash-icon");
// basketCleanEl.addEventListener("click", (e) => {
//   basketFullEl.classList.remove("visible_flex");
//   // Удаление количества товаров над значком корзины и обнуление счетчика количества товаров в LS
//   hideProductQty();
// });

// // Модальное окно

// const basketOrderButtonEl = document.querySelector(".basket__order-button");
// const modalEl = document.querySelector(".modal");
// const modalWindowEl = document.querySelector(".modal__window");
// const modalWindowCloseEl = document.querySelector(".modal__close");

// basketOrderButtonEl.addEventListener("click", (e) => {
//   modalEl.style.display = "flex";

//   document.addEventListener("mousedown", function (event) {
//     if (
//       (!modalWindowEl.contains(event.target) &&
//         event.target !== modalWindowEl) ||
//       event.target === modalWindowCloseEl
//     ) {
//       modalEl.style.display = "none";
//     }
//   });
// });

// // Функция подсчета и вывода стоимости одного товара
// const getItemPrice = (cardPriceSubtotal) => {
//   const cardPriceSubtotalAmountEl = cardPriceSubtotal.firstElementChild;
//   const cardPriceSubtotalAmountContent =
//     cardPriceSubtotal.firstElementChild.getAttribute("data-subtotal");
//   const subTotalPriceAmount =
//     parseInt(cardPriceSubtotalAmountContent) * productUnitQty;
//   cardPriceSubtotalAmountEl.innerText = `${subTotalPriceAmount}`;
// };

// // Функция подсчет общей стоимости заказа
// function getOrderTotalAmount() {
//   const basketOrderTotalEl = document.querySelector(".ruble-sign");
//   const cardsActiveEls = document.querySelectorAll(".active-card");
//   let basketTotalAmount = 0;
//   cardsActiveEls.forEach((element) => {
//     const cardPriceSubtotalAmountEl = +element.querySelector(
//       ".card__price-subtotal"
//     ).textContent;
//     basketTotalAmount += cardPriceSubtotalAmountEl;
//   });
//   basketOrderTotalEl.innerText = `${basketTotalAmount}`;
// }

// // Функция удаление количества товаров над значком корзины и обнуление счетчика количества товаров в LS
// const hideProductQty = () => {
//   headerBasketEl.style.visibility = "hidden";
//   localStorage.removeItem("addedProductsQuantity");
//   localStorage.removeItem("selectedProducts");
// };

// // Увеличения высоты карточки товара
// function extendCardHeight(basketFullEl) {
//   if (basketFullEl.clientHeight < document.documentElement.clientHeight) {
//     basketFullEl.style.height = `${
//       basketFullEl.clientHeight +
//       104 +
//       176 +
//       150 +
//       125 +
//       (document.documentElement.clientHeight - basketFullEl.clientHeight)
//     }px`;
//   }
// }
