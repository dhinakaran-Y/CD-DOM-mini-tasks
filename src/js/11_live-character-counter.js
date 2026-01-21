const textAreaEl = document.getElementById("textarea")
const characterCountEL = document.getElementById("ch-count")
const characterCountNoSpaceEL = document.getElementById("ch-count-no-space");
const clearBtnEl = document.getElementById("clear-btn")
const countSpaceEl = document.getElementById("count-space")
const countSentenceEl = document.getElementById("count-sentence")

// count
textAreaEl.addEventListener("input", characterCountFn);
textAreaEl.addEventListener("input", characterCountWithoutSpaceFn);
textAreaEl.addEventListener("input", countSpaceFn)
textAreaEl.addEventListener("input", countSentenceFn)

// clear
clearBtnEl.addEventListener("click", textClearFn)
clearBtnEl.addEventListener("click", characterCountFn);
clearBtnEl.addEventListener("click", characterCountWithoutSpaceFn);
clearBtnEl.addEventListener("click", countSpaceFn);
clearBtnEl.addEventListener("click", countSentenceFn);

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

// count space
function countSpaceFn() {
    const textVal = textAreaEl.value
    const textValArr = textVal.split("")
    
    const spaceValArr = textValArr.filter(char => char === " ");
    // console.log(noSpaceTextValArr);

    countSpaceEl.textContent = spaceValArr.length
}

// count sentence
function countSentenceFn() {
    const textVal = textAreaEl.value
    const sentenceValArr = textVal.trim().split(".")
    
    
    const sentenceValArr2 = sentenceValArr.filter(char => char !== "");
    // console.log(sentenceValArr2);

    countSentenceEl.textContent = sentenceValArr2.length
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