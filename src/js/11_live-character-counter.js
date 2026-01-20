const textAreaEl = document.getElementById("textarea")
const characterCountEL = document.getElementById("ch-count")
const characterCountNoSpaceEL = document.getElementById("ch-count-no-space");
const clearBtnEl = document.getElementById("clear-btn")

textAreaEl.addEventListener("input", characterCountFn);
textAreaEl.addEventListener("input", characterCountWithoutSpaceFn);
clearBtnEl.addEventListener("click", textClearFn)
clearBtnEl.addEventListener("click", characterCountFn);
clearBtnEl.addEventListener("click", characterCountWithoutSpaceFn);

// character count include space
function characterCountFn() {
    const textVal = textAreaEl.value
    characterCountEL.textContent = textVal.trim().length;
}

// character count no space
function characterCountWithoutSpaceFn() {
    const textVal = textAreaEl.value
    const textValArr = textVal.split("")
    
    const noSpaceTextValArr = textValArr.filter(char => char !== " ");
    // console.log(noSpaceTextValArr);

    characterCountNoSpaceEL.textContent = noSpaceTextValArr.length 
}

//input text clear Fn
function textClearFn() {
  textAreaEl.value = ""
} 

// back navigation
window.addEventListener("keyup", (event) => {
  if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
    if (event.code === "Backspace") {
      window.location = "./index.html";
    }
  }
})