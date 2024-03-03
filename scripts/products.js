"use strict";
const sortSelectEl = document.querySelector("#sort-select");
sortSelectEl.onchange = function () {
  const selectedOption = sortSelectEl.value;
  if (selectedOption === "ascending") {
    sortElementsByAscPrice("data-price");
  } else if (selectedOption === "decsending") {
    sortElementsByDescPrice("data-price");
  } else {
    location.reload();
  }
};
const sortElementsByAscPrice = (atributeName) => {
  const catalogEl = document.querySelector(".catalog__box");
  // console.log(catalogEl);
  const elementsEl = Array.from(
    catalogEl.querySelectorAll(`[${atributeName}]`)
  );
  elementsEl.sort((a, b) => {
    const priceA = parseFloat(a.getAttribute(atributeName));
    const priceB = parseFloat(b.getAttribute(atributeName));
    return priceA - priceB;
  });

  elementsEl.forEach((element) => {
    catalogEl.appendChild(element);
  });
};
const sortElementsByDescPrice = (atributeName) => {
  const catalogEl = document.querySelector(".catalog__box");
  // console.log(catalogEl);
  const elementsEl = Array.from(
    catalogEl.querySelectorAll(`[${atributeName}]`)
  );
  elementsEl.sort((a, b) => {
    const priceA = parseFloat(a.getAttribute(atributeName));
    const priceB = parseFloat(b.getAttribute(atributeName));
    return priceB - priceA;
  });

  elementsEl.forEach((element) => {
    catalogEl.appendChild(element);
  });
};

const checkboxEl = document.querySelector(".checkbox-box");
const checkboxEls = document.querySelectorAll(".checkbox-box__checkbox");

checkboxEl.addEventListener("change", (e) => {
  let counter = 0;

  checkboxEls.forEach((item) => {
    if (item.checked) {
      counter++;
    }
  });
  checkboxEls.forEach((item) => {
    let inputIdCountry = e.target.id;
    switch (inputIdCountry) {
      case "france":
        if (e.target.checked) {
          showElementsCountry("data-country", "france");
        } else {
          hideElementsCountry("data-country", "france");
          if (counter === 0) {
            removeHiddenClass();
          }
        }
        break;
      case "germany":
        if (e.target.checked) {
          showElementsCountry("data-country", "germany");
        } else {
          hideElementsCountry("data-country", "germany");
          if (counter === 0) {
            removeHiddenClass();
          }
        }
        break;
      case "england":
        if (e.target.checked) {
          showElementsCountry("data-country", "england");
        } else {
          hideElementsCountry("data-country", "england");
          if (counter === 0) {
            removeHiddenClass();
          }
        }
        break;
    }
  });
});

// Functions
const showElementsCountry = (atributeName, country) => {
  const catalogEl = document.querySelector(".catalog__box");
  const elementsEl = Array.from(
    catalogEl.querySelectorAll(`[${atributeName}]`)
  );

  elementsEl.forEach((element) => {
    if (element.getAttribute(atributeName) === country) {
      element.classList.add("visible");
    } else {
      element.classList.add("hidden");
    }
  });
};

const hideElementsCountry = (atributeName, country) => {
  const catalogEl = document.querySelector(".catalog__box");
  const elementsEl = Array.from(
    catalogEl.querySelectorAll(`[${atributeName}]`)
  );
  elementsEl.forEach((element) => {
    if (element.getAttribute(atributeName) === country) {
      element.classList.remove("visible");
      element.classList.add("hidden");
    }
  });
};

const removeHiddenClass = () => {
  const cardsEl = Array.from(document.querySelectorAll(".card"));
  cardsEl.forEach((element) => {
    element.classList.remove("hidden");
  });
};
