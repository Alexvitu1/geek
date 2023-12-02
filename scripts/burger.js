"use strict";

// Бургер меню

const burgerEl = document.querySelector(".header__burger");

const burgerNavEl = document.querySelector(".header__burger-nav");

const burgerCloseEl = document.querySelector(".header__menu_close");

burgerEl.addEventListener("click", () => {
  burgerNavEl.classList.remove("header__burger-nav-animation-exit");
  burgerNavEl.classList.add("header__burger-nav-animation");
});

burgerCloseEl.addEventListener("click", () => {
  burgerNavEl.classList.add("header__burger-nav-animation-exit");
});

const headerMenuEl = document.querySelector(".header__menu");

headerMenuEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("header__link")) {
    burgerNavEl.classList.remove("header__burger-nav-animation");
  }
});
