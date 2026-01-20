const formEL = document.getElementById("my-form");
const habitNameEl = document.getElementById("habit-name");
const cartSectionEl = document.getElementById("cart-section");
const tbodyEL = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-btn");
let doneHabits = 0;

clearBtn.addEventListener("click", () => clearFn());

cartSectionVisibleFn();

formEL.addEventListener("submit", (event) => {
  event.preventDefault();
  const habitName = habitNameEl.value.trim();

  // validation
  // name
  if (habitName.length < 3) {
    habitNameEl.nextElementSibling.classList.remove("hidden");
    return;
  } else {
    habitNameEl.nextElementSibling.classList.add("hidden");
  }

  //cc
  //   tr
  const cartList = document.createElement("tr");
  cartList.classList.add("productInfo");
  //   td
  // name
  const hName = document.createElement("td");
  hName.classList.add("p-name");
  hName.innerText = habitName;
  cartList.append(hName);
  // action
  const tdAction = document.createElement("td");
  cartList.append(tdAction);
  const actionDiv = document.createElement("div");
  tdAction.append(actionDiv);
  // check
  const checkBtn = document.createElement("button");
  checkBtn.classList.add("check-btn");
  // checkBtn.setAttribute("onclick",'crossLineFn(event)')
  // in vite build the set attribute's function-crossLineFn is searched in the window object. But, u created function "crossLineFn" is not attached to window object.
  checkBtn.addEventListener("click", crossLineFn);
  checkBtn.addEventListener("click", doneHabitsCount)
  checkBtn.addEventListener("click", scoreFN);
  checkBtn.textContent = `done`;
  actionDiv.append(checkBtn);
  //del
  const delBtn = document.createElement("button");
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", deleteFn);
  delBtn.addEventListener("click", doneHabitsCount);
  delBtn.addEventListener("click", scoreFN)
  delBtn.textContent = `delete`;
  actionDiv.append(delBtn);

  tbodyEL.append(cartList);

  // total items calculation
  totalItemsCalculation();
  doneHabitsCount()
  scoreFN();
  clearFn();
  cartSectionVisibleFn();
});

function clearFn() {
  habitNameEl.value = "";
  //   console.log("hii");
}

function crossLineFn(event) {

  let rowEl = event.target.closest("tr");
  let checkBtn = rowEl.querySelector(".check-btn");

  //   toggle Fn
  //   console.log(checkBtn);
  rowEl.classList.toggle("*:not-last:line-through");
  checkBtn.classList.toggle("checked");
  //   console.log(checkBtn.classList.contains("checked"));
  if (checkBtn.classList.contains("checked")) {
    checkBtn.innerText = "not-yet";
  } else {
    checkBtn.innerText = "done";
  }
}

function deleteFn(event) {
  let rowEl = event.target.closest("tr");
  rowEl.remove();

  // total items calculation
  totalItemsCalculation();

  //total cost calculation
  // totalCostCalculation();

  cartSectionVisibleFn();
}

// total items calculation
function totalItemsCalculation() {
  const totalProductsEL = document.getElementById("total-products");
  totalProductsEL.innerText = tbodyEL.childElementCount;
   
}

// done habits
function doneHabitsCount() {
  let checkedELs = document.getElementsByClassName("checked");
  doneHabits = checkedELs.length;
  
  document.getElementById("total-items").textContent = doneHabits; 
}

function scoreFN() {
  let totalHabits = tbodyEL.childElementCount;
  let score = Number.isNaN((doneHabits / totalHabits) * 100) ?  0 : (doneHabits / totalHabits) * 100 ;
  
  document.getElementById("score").textContent = score.toFixed(1) + "%";
}


// cart section visible Fn
function cartSectionVisibleFn() {
  console.log(cartSectionEl);
  
  if (tbodyEL.childElementCount < 1) {
    cartSectionEl.classList.add("hidden");
  } else {
    cartSectionEl.classList.remove("hidden");
  }
}

// back navigation
window.addEventListener("keyup", (event) => {
  if (event.target.tagName !== "INPUT") {
    if (event.code === "Backspace") {
      window.location = "./index.html";
    }
  }
});
