"use strict";

if (localStorage.length === 0) {
  const basketMessageEl = document.querySelector(".basket__message");
  basketMessageEl.classList.add("visible");
} else {
  const numbers = localStorage.getItem("selectedProducts");
  const result = numbers.split(",");

  const cardsEls = document.querySelectorAll(".card");
  result.forEach((item) => {
    cardsEls.forEach((element) => {
      if (element.getAttribute("data-number") === item) {
        element.classList.add("visible");
      }
    });
  });
}
