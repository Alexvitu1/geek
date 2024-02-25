"use strict";

// Отправка формы запроса

// const writeButtonsEl = document.querySelectorAll(".employee__button-write");

// writeButtonsEl.forEach((button) => {
//   button.addEventListener("click", () => {
//     const employeeEl = button.closest(".employee");
//     const employeeFormEl = employeeEl.querySelector(".employee__form");
//     const allEmployeeFormEl = document.querySelectorAll(".employee__form");

//     allEmployeeFormEl.forEach((form) => {
//       if (form !== employeeFormEl) {
//         form.style.display = "none";
//       }
//       employeeFormEl.style.display = "block";
//     });
//   });
// });

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
    if (
      (!modalWindowEl.contains(event.target) &&
        event.target !== modalWindowEl) ||
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
