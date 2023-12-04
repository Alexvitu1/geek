"use strict";

// Бургер меню

const burgerEl = document.querySelector(".header__burger");

const burgerNavEl = document.querySelector(".header__burger-nav");

const burgerCloseEl = document.querySelector(".header__menu_close");

burgerEl.addEventListener("click", () => {
  removeClass(burgerNavEl, "header__burger-nav-animation-exit");
  addClass(burgerNavEl, "header__burger-nav-animation");
  // burgerNavEl.classList.remove("header__burger-nav-animation-exit");
  // burgerNavEl.classList.add("header__burger-nav-animation");
});

burgerCloseEl.addEventListener("click", () => {
  addClass(burgerNavEl, "header__burger-nav-animation-exit");
  // burgerNavEl.classList.add("header__burger-nav-animation-exit");
});

const headerMenuEl = document.querySelector(".header__menu");

headerMenuEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("header__link")) {
    // burgerNavEl.classList.remove("header__burger-nav-animation");
    removeClass(burgerNavEl, "header__burger-nav-animation");
  }
});

function removeClass(elName, className) {
  elName.classList.remove(className);
}

function addClass(elName, className) {
  elName.classList.add(className);
}
