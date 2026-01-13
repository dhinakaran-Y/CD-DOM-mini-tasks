const formEL = document.getElementById("my-form");
const productNameEl = document.getElementById("product-name");
const productPriceEl = document.getElementById("product-price");
const productCountEl = document.getElementById("product-count");
const cartSectionEl = document.getElementById("cart-section");
const tbodyEL = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-btn");

clearBtn.addEventListener("click", () => clearFn());

cartSectionVisibleFn();

formEL.addEventListener("submit", (event) => {
  event.preventDefault();
  const productName = productNameEl.value.trim();
  const productPrice = productPriceEl.value.trim();
  const productCount = productCountEl.value.trim();

  // validation
  // name
  if (productName.length < 3) {
    productNameEl.nextElementSibling.classList.remove("hidden");
    return;
  } else {
    productNameEl.nextElementSibling.classList.add("hidden");
  }
  // price
  if (productPrice < 1 || productPrice > 10000000) {
    productPriceEl.nextElementSibling.classList.remove("hidden");
    return;
  } else {
    productPriceEl.nextElementSibling.classList.add("hidden");
  }
  // count
  if (productCount < 1 || productCount > 1000) {
    productCountEl.nextElementSibling.classList.remove("hidden");
    return;
  } else {
    productCountEl.nextElementSibling.classList.add("hidden");
  }

  //cc
  //   tr
  const cartList = document.createElement("tr");
  cartList.classList.add("productInfo");
  //   td
  // name
  const pName = document.createElement("td");
  pName.classList.add("p-name");
  pName.innerText = productName;
  cartList.append(pName);
  // price
  const pPrice = document.createElement("td");
  pPrice.classList.add("p-price");
  pPrice.textContent = productPrice;
  cartList.append(pPrice);
  // count
  const pCount = document.createElement("td");
  pCount.classList.add("p-count");
  pCount.textContent = productCount;
  cartList.append(pCount);
  // total
  const pTotal = document.createElement("td");
  pTotal.classList.add("p-total");
  pTotal.textContent = productPrice * productCount;
  cartList.append(pTotal);
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
  checkBtn.textContent = `checked`;
  actionDiv.append(checkBtn);
  //del
  const delBtn = document.createElement("button");
  delBtn.classList.add("delete-btn");
  //   delBtn.setAttribute("onclick", "deleteFn");
  delBtn.addEventListener("click", deleteFn);
  delBtn.textContent = `delete`;
  actionDiv.append(delBtn);

  tbodyEL.append(cartList);

  // total items calculation
  totalItemsCalculation();

  //total cost calculation
  totalCostCalculation();

  cartSectionVisibleFn();
});

function clearFn() {
  productNameEl.value = "";
  productPriceEl.value = "";
  productCountEl.value = "";
  //   console.log("hii");
}

function crossLineFn(event) {
  console.log("checked");

  let rowEl = event.target.closest("tr");
  let checkBtn = rowEl.querySelector(".check-btn");

  //   toggle Fn
  //   console.log(checkBtn);
  rowEl.classList.toggle("*:not-last:line-through");
  checkBtn.classList.toggle("checked");
  //   console.log(checkBtn.classList.contains("checked"));
  if (checkBtn.classList.contains("checked")) {
    checkBtn.innerText = "uncheck";
  } else {
    checkBtn.innerText = "checked";
  }
}

function deleteFn(event) {
  let rowEl = event.target.closest("tr");
  rowEl.remove();

  // total items calculation
  totalItemsCalculation();

  //total cost calculation
  totalCostCalculation();

  cartSectionVisibleFn();
}

// total items calculation
function totalItemsCalculation() {
  const totalProductsEL = document.getElementById("total-products");
  totalProductsEL.innerText = tbodyEL.childElementCount;

  let countEL = document.getElementsByClassName("p-count");
  let countList = [...countEL];

  let totalItems = countList.reduce((accumulator, current) => {
    let cur = Number(current.innerText);
    return accumulator + cur;
  }, 0);

  document.getElementById("total-items").innerText = totalItems;
}

// total cost calculation Fn
function totalCostCalculation() {
  let priceEL = document.getElementsByClassName("p-total");
  let priceList = [...priceEL];

  let totalCost = priceList.reduce((accumulator, current) => {
    let cur = Number(current.innerText);
    return accumulator + cur;
  }, 0);

  document.getElementById("total-cost").innerText = totalCost;
}

// cart section visible Fn
function cartSectionVisibleFn() {
  if (tbodyEL.childElementCount < 1) {
    cartSectionEl.classList.add("hidden");
  } else {
    cartSectionEl.classList.remove("hidden");
  }
}


// back navigation
window.addEventListener("keyup", (event) => {
  if (event.code === "Backspace") {
    window.location = "./index.html";
  }
})