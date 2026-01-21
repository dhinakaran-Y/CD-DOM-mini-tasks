const accordionEL = document.getElementsByClassName("accordion")
const accordionContentEl = document.getElementsByClassName("accordion-content");
const accordionArrowSvgEL = document.getElementsByClassName("accordion-arrow-svg");

// console.log(accordionArrowSvgEL);

const accordionsArr = [...accordionEL]
const accordionContentArr = [...accordionContentEl]
const accordionArrowSvgArr = [...accordionArrowSvgEL]

accordionsArr.forEach(accordion => accordion.addEventListener("click", accordionVisibleFN))

function accordionVisibleFN() {
  if (this.children[0].checked) {
    this.children[0].checked = false;
  } else {
    this.children[0].checked = true;
  }

   accordionContentArr.forEach((accordionContent) =>
     accordionContentVisibleFn(accordionContent));

  // accordion arrow rotate fn
   accordionArrowSvgArr.forEach((accordionArrow) => accordionArrowSvgRotateFn(accordionArrow));
}

function accordionContentVisibleFn(element) {
    if (element.parentElement.firstElementChild.checked) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
}

function accordionArrowSvgRotateFn(element) {
  // console.log(element.closest(".accordion").firstElementChild.checked);

  if (element.closest(".accordion").firstElementChild.checked) {
       element.classList.add("-rotate-180");
     } else {
       element.classList.remove("-rotate-180");
     }
}

// back navigation
window.addEventListener("keyup", (event) => {
  if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
    if (event.code === "Backspace") {
      window.location = "./index.html";
    }
  }
})