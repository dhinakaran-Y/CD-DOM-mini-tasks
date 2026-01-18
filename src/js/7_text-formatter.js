const textAreaEl = document.getElementById("text-content")
const outputDivEl = document.getElementById("output")
const upperCaseBtn = document.getElementById("upper-case")
const lowerCaseBtn = document.getElementById("lower-case");
const boldBtn = document.getElementById("bold-btn")
const clearBtn = document.getElementById("clear-btn")



textAreaEl.addEventListener("input", textFormateFn)
textAreaEl.addEventListener("input", outputDivVisibleFn)
upperCaseBtn.addEventListener("click",changeToUpperCase)
lowerCaseBtn.addEventListener("click", changeToLowerCase);
boldBtn.addEventListener("click", changeToBold);
clearBtn.addEventListener("click", inputClearFn)

function textFormateFn(){
    const textVal = textAreaEl.value
    outputDivEl.textContent = textVal
}

function changeToUpperCase(){
    outputDivEl.textContent = outputDivEl.textContent.trim().toUpperCase()
}

function changeToLowerCase(){
    outputDivEl.textContent = outputDivEl.textContent.trim().toLowerCase()  
}

function changeToBold() {
  outputDivEl.classList.toggle("font-bold")
}

function inputClearFn() {
    textAreaEl.value = ""
    outputDivEl.textContent = ""
}

function outputDivVisibleFn() {
    if (outputDivEl.textContent === "") {
       outputDivEl.textContent = "✍️write your content in the text area..."       
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