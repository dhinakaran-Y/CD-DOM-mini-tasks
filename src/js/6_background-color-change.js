const inputSectionEL = document.getElementById("input-section");
const btnsEl = document.getElementsByClassName('btn');
const randomColorBtnEl = document.getElementById("random-color-btn");


[...btnsEl].map(btn => btn.addEventListener('click',themeChangeFn));

function themeChangeFn(event) {
removeBorderClass()
event.target.classList.add("border-2")
// clear
document.body.classList = "";
if (event.target.value !== "random-color") document.body.classList.add(`bg-${event.target.value}`);
textColorChangeFn();
}

function removeBorderClass() {
  [...btnsEl].map((btn) => btn.classList.remove("border-2"));
}


// random FN
const colorArray = ["green-50", "black", "brand", "yellow-300", "red-400","indigo-300","lime-200","blue-200"];


randomColorBtnEl.addEventListener('click',randomColorGenFn)

// random color generating function
function randomColorGenFn(){
  document.body.classList = "";
  let randomNum = Math.floor(Math.random() * colorArray.length);
  // console.log(randomNum);
  let randomColor = colorArray[randomNum];
  // console.log(randomColor);
  document.body.classList.add(`bg-${randomColor}`);
  textColorChangeFn();
}

function textColorChangeFn() {
  if (
    !(document.body.classList.contains("bg-green-50") ||
    document.body.classList.contains("bg-indigo-300") ||
    document.body.classList.contains("bg-lime-200") ||
    document.body.classList.contains("bg-blue-200") ||
    document.body.classList.contains("bg-yellow-300"))
  ) {
    document.body.classList.add(`text-white`);
  } else {
    document.body.classList.remove(`text-white`);
  }
}

// back navigation
window.addEventListener("keyup", (event) => {
  if (event.code === "Backspace") {
    window.location = './index.html'
  }
})