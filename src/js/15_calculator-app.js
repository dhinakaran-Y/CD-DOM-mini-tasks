const equalOperator = document.getElementById("equalOperator");
const clearOperandEl = document.getElementById("clearOperands");
const accumulator = document.querySelector("#operands");
const finalResult = document.querySelector("#result");
const allNumbers = document.querySelectorAll("[data-operand]");
const allOperands = document.querySelectorAll("[data-operation]");
const logicalOperands = document.querySelectorAll("[data-operation-2]");
const logicalOperandsArr = [...logicalOperands]
const backSpaceBtnEl = document.getElementById("backspace-btn");
const SESSION_STORAGE_KEY = "sumHistory";
const historyListEl = document.getElementsByClassName("history-li")
const historyListElArr = [...historyListEl]
const clearSessionHistoryBtn = document.getElementById("history-clear");
let sessionStorageArr = [];

const numKeyArr = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "(",
  ")",
  ".",
];

const operandKeyArr = ["%", "^", "*", "-", "+", "/"];

// get only nums
const getOnlyNumbersAndOperands = (e) => {
  // get numbers only
  if (numKeyArr.includes(e.key) || (e.which >= 96 && e.which <= 105)) {
    appendText(e.key);
  }
  // get operands only
  else if (operandKeyArr.includes(e.key)) {
    appendText(e.key);
  } 
  else {
    return false;
  }
};

// append
const appendText = (numbers) => {
  if (finalResult.innerText == 0) {
    finalResult.innerText = "";
  }
  finalResult.innerText += numbers;
};

const btnClickFn = (e) => {
  if (e.type === "click") {
    appendText(e.target.innerText);
  } else if (e.type === "keydown") {
    getOnlyNumbersAndOperands(e)
  }
};

const setNumberClickListeners = (numEl) => {
  numEl.addEventListener("click", btnClickFn);
};

allNumbers.forEach((numEl) => setNumberClickListeners(numEl));

allOperands.forEach((operandEl) =>
  operandEl.addEventListener("click", (e) => {
    appendText(e.target.textContent);
  }),
);

equalOperator.addEventListener("click", () => evaluate());

const clearData = (e) => {
  accumulator.innerText = "";
  finalResult.innerText = "0";
};

clearOperandEl.addEventListener("click", clearData);

document.body.addEventListener("keydown", btnClickFn);

// enter btn
document.addEventListener("keydown",(e) => {
  if(e.key == "Enter"){
    e.target.blur(); 
    evaluate();
  }
})

// del btn
document.body.addEventListener("keydown", (e) => {
  if (e.key === "Delete") {
    clearData();
  }
});

// backspace btn
backSpaceBtnEl.addEventListener("click", backSpaceFn)
// keyboard backspace btn
document.body.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
      backSpaceFn()
  }
});
//backspace Fn
function backSpaceFn() {
  const sliced = finalResult.innerText.slice(0, -1);
  finalResult.innerText = sliced;
}

function evaluate() {
  const quesVar = finalResult.textContent
  let result;
  // power calc
  if (quesVar.includes("^")) {
    let[num1 , num2] = quesVar.split("^")
     result = Math.pow(num1,num2)
  }else{
     result = eval(finalResult.textContent);
  }
  finalResult.innerText = result;

  
  const historyVar = `${quesVar}=${result}` 

  sessionStorageArr.unshift(historyVar)
  if (sessionStorageArr.length > 10) {
    sessionStorageArr.pop()
  }  
  
  sessionStorage.setItem(SESSION_STORAGE_KEY , sessionStorageArr)
  getSessionData();
}


function getSessionData() {
  const gottenData = sessionStorage.getItem(SESSION_STORAGE_KEY)

  if (gottenData === null) {
    return
  }else{
  let gottenDataArr = (gottenData !== null) ? gottenData.split(",") : null;
  
  historyListElArr.forEach((liEl,index) => {
    liEl.textContent = gottenDataArr[index]
  })
  }
  
}
getSessionData();

clearSessionHistoryBtn.addEventListener("click", clearSessionHistoryFn);

function clearSessionHistoryFn(e) {
  sessionStorage.clear();
  historyListElArr.forEach((liEl, index) => {
    liEl.textContent = "";
  });
  sessionStorageArr = [];
}

// logical operands
logicalOperandsArr.forEach(operand => operand.addEventListener("click", logicalOperandFn))
// logical operands
function logicalOperandFn(e){
    const val = e.target.value;
    switch (val) {
      case "square":
        finalResult.textContent =
          finalResult.textContent * finalResult.textContent;
        break;
      case "power":
        finalResult.textContent += "^"
        break;
      case "square-root":
        finalResult.textContent = Math.sqrt(finalResult.textContent)
        break;
      default:
        return;
        break;
    }
}

// for toggle
const toggleCheckEl = document.getElementById("theme-toggle-btn")
const toggleSpanEl = document.getElementById("toggle-span")

// toggle fn
toggleCheckEl.addEventListener("click",themeChangeFN)

function themeChangeFN() {
  // console.dir(toggleCheckEl);
  if (toggleCheckEl.checked) {
    document.children[0].classList.add("dark");
    toggleSpanEl.textContent = "Dark mode"
  }else{
    document.children[0].classList.remove("dark");
    toggleSpanEl.textContent = "Light mode";
  }
}