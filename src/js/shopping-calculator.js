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
  const regex = /^[\p{L}\s.'-]{2,50}$/u;
  if (
    !regex.test(productName) ||
    productName.length < 3 ||
    productName.length > 25
  ) {
    productNameEl.nextElementSibling.classList.remove("hidden");
    productNameEl.nextElementSibling.innerText =
      "Name contains invalid characters...";
    if (productName.length < 3 || productName.length > 25) {
      productNameEl.nextElementSibling.innerText =
        "character length must be above 2...";
    }
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
  const cartList = `<tr class="productInfo">
            <td class="p-name">${productName}</td>
            <td>₹ <span class="p-price">${productPrice}</span></td>
            <td class="p-count">${productCount}</td>
            <td class="p-total">${productPrice * productCount}<td>
            <td>
              <div class="">
                <button class="check-btn" onclick="crossLineFn(event)">checked</button>
                <button class="delete-btn" onclick="deleteFn(event)">delete</button>
              </div>
            </td>
          </tr>`;

  tbodyEL.innerHTML += cartList;

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
  console.log("hii");
}

function crossLineFn(event) {
  let rowEl = event.target.closest("tr");
  let checkBtn = rowEl.querySelector(".check-btn");

  //   toggle Fn
  console.log(checkBtn);
  rowEl.classList.toggle("*:not-last:line-through");
  checkBtn.classList.toggle("checked");
  //   console.log(checkBtn.classList.contains("checked"));
  if (checkBtn.classList.contains("checked")) {
    checkBtn.innerText = "uncheck";
  } else {
    checkBtn.innerText = "checked";
  }
}

function deleteFn(e) {
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
  let countEL = document.getElementsByClassName("p-count");
  let countList = [...countEL];

  let totalItems = countList.reduce((accumulator, current) => {
    let cur = Number(current.innerText);
    return accumulator + cur;
  }, 0);

  let totalProducts = tbodyEL.childElementCount;

  document.getElementById("total-items").innerText = totalItems;
  document.getElementById("total-products").innerText = totalProducts;
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
