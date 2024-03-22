"use strict";

const leftArrowEl = document.querySelector(".slider__left-arrow");
const rightArrowEl = document.querySelector(".slider__right-arrow");

const imgBoxEl = document.querySelector(".slider__img-box");
const imgArrayEl = document.querySelectorAll(`[data-img]`);

const dotsEl = document.querySelector(".slider__nav-dots");
const dotArrayEl = dotsEl.querySelectorAll(`[data-dot]`);
let activeImg = 1;
const amountImg = imgArrayEl.length;

const imgNameEl = document.querySelector(".slider__img-name");
const imgTitleEl = document.querySelector(".slider__img-title");
const titleArrayEl = document.querySelectorAll(`[data-title]`);

leftArrowEl.addEventListener("click", () => {
  activeImg--;
  if (activeImg == 0) {
    activeImg = amountImg;
  }
  changeElement(activeImg, imgBoxEl, `data-img`, imgArrayEl);
  changeElement(activeImg, imgNameEl, `data-title`, titleArrayEl);
  changeDot(activeImg);
});

rightArrowEl.addEventListener("click", () => {
  activeImg++;
  if (activeImg > amountImg) {
    activeImg -= amountImg;
  }
  changeElement(activeImg, imgBoxEl, `data-img`, imgArrayEl);
  changeElement(activeImg, imgNameEl, `data-title`, titleArrayEl);
  changeDot(activeImg);
});

dotsEl.addEventListener("click", (e) => {
  if (e.target.className === "slider__dot") {
    const number = parseInt(e.target.getAttribute(`data-dot`));
    changeDot(number);
    changeElement(number, imgBoxEl, `data-img`, imgArrayEl);
    activeImg = number;
    changeElement(number, imgNameEl, `data-title`, titleArrayEl);
  }
});

// Functions

function changeDot(number) {
  const currentDot = dotsEl.querySelector(".color");
  currentDot.classList.remove("color");
  dotArrayEl.forEach((item) => {
    if (parseInt(item.getAttribute(`data-dot`)) === number) {
      item.classList.add("color");
    }
  });
}

function changeElement(number, parentEl, elementAtrribute, elementArray) {
  const currentElement = parentEl.querySelector(".visible");
  currentElement.classList.remove("visible");
  currentElement.classList.add("hidden");
  elementArray.forEach((item) => {
    if (parseInt(item.getAttribute(elementAtrribute)) === number) {
      item.classList.remove("hidden");
      item.classList.add("visible");
    }
  });
}
