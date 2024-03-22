"use strict";
//Переключение вкладок

const tabEls = document.querySelectorAll(".tab__button");
const contentEls = document.querySelectorAll(".catalog__items");

tabsSwitch(tabEls);

// Переход в раздел сайта "Репродукции" и переключение вкладок из нижнего меню

const footerTabEls = document.querySelectorAll(".footer__tab");

tabsSwitch(footerTabEls);

// Functions
function tabsSwitch(buttonNames) {
  for (let i = 0; i < buttonNames.length; i++) {
    buttonNames[i].addEventListener("click", (event) => {
      removeClassFromList(tabEls, "tab--active");
      addClassToListEl(tabEls[i], "tab--active");

      removeClassFromList(contentEls, "content--active");
      addClassToListEl(contentEls[i], "content--active");
    });
  }
}

function removeClassFromList(elName, ListName) {
  elName.forEach((el) => el.classList.remove(ListName));
}

function addClassToListEl(elName, className) {
  elName.classList.add(className);
}
