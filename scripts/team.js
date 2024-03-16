"use strict";

// Модальное окно

const teamEl = document.querySelector(".team");
// const employeeAllEl = teamEl.querySelectorAll(".employee");

const modalEl = document.querySelector(".modal");
const modalWindowEl = document.querySelector(".modal__window");
const modalWindowAllEl = document.querySelectorAll(".modal__window");
const modalWindowArrayEl = document.querySelectorAll(`[data-modal]`);
const modalWindowCloseEl = document.querySelector(".modal__close");
// const openModalWindowEl = document.querySelector(".employee");

teamEl.addEventListener("click", (e) => {
  if (
    e.target.className === "employee__img-box" ||
    e.target.className === "employee__img-persons"
  ) {
    modalEl.style.display = "flex";
    const number = parseInt(e.target.getAttribute(`data-employee`));
    changeElement(number, `data-modal`, modalWindowArrayEl);
  }

  document.addEventListener("mousedown", function (event) {
    const modalElCurrent = document.querySelector(".visible");
    // const modalWindowCloseElCurrent =
    //   modalElCurrent.querySelector(".modal__close");
    if (
      (!modalElCurrent.contains(event.target) &&
        event.target !== modalElCurrent) ||
      event.target === modalWindowCloseEl
    ) {
      modalWindowAllEl.forEach((item) => {
        item.classList.remove("visible");
        item.classList.add("hidden");
      });
      modalEl.style.display = "none";
    }
  });
});

function changeElement(number, elementAtrribute, elementArray) {
  elementArray.forEach((item) => {
    if (parseInt(item.getAttribute(elementAtrribute)) === number) {
      item.classList.remove("hidden");
      item.classList.add("visible");
    }
  });
}
