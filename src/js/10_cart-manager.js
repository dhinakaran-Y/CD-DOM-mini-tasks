const cardEL = document.getElementsByClassName("card");
const countIncBtn = document.getElementsByClassName("count-inc");
const countDecBtn = document.getElementsByClassName("count-dec");
const productRateEL = document.getElementsByClassName("product-rate");
const productCountNumEl = document.getElementsByClassName("count-num");
const totalAmountEl = document.getElementById("total-amount");
const subTotalAmountEls = document.getElementsByClassName("single-p-total");


const cardElArr = [...cardEL];
const countIncBtnArr = [...countIncBtn];
const countDecBtnArr = [...countDecBtn];
const productRateELArr = [...productRateEL];
const productCountNumElArr = [...productCountNumEl];

// console.dir(subTotalAmountElArr);

countIncBtnArr.forEach((btn) => {
  btn.addEventListener("click", incrementFn);
});

countDecBtnArr.forEach((btn) => {
  btn.addEventListener("click", decrementFn);
});

// ++
function incrementFn(e) {
  const countEl = e.target.previousElementSibling;
  let count = parseInt(countEl.textContent);
  if (count < 5)  count++; 
  countEl.textContent = count < 5 ? count : 5 ;
  singlePTotalFn(countEl , count)
  totalAmountFn();
}

// --
function decrementFn(e) {
  const countEl = e.target.nextElementSibling;
  let count = parseInt(countEl.textContent);
  if(count > 0) count--;
  countEl.textContent = count >= 1 ? count : 0;

  singlePTotalFn(countEl, count);
  totalAmountFn();
}

function singlePTotalFn(countEL , count) {
   
   const singlePTotalEl = countEL.closest(".card").querySelector(".single-p-total");
    
   const productPrice = parseInt(
     countEL.closest(".card").querySelector(".product-rate").textContent);

   singlePTotalEl.textContent = `₹ ${(count * productPrice).toFixed(2)}`;

//    console.log(count, "=" , productPrice, "=", count * productPrice );
   
   textColorChangeFN(count, singlePTotalEl);
}

function textColorChangeFN(count, singlePTotalEl) {

  if (count < 1) {
    singlePTotalEl.classList.remove("text-green-500");
    singlePTotalEl.classList.add("text-red-500")
  }else{
    singlePTotalEl.classList.remove("text-red-500");
    singlePTotalEl.classList.add("text-green-500");
  }
}

// total cart cal
function totalAmountFn() {
  const subTotalAmountElArr = [...subTotalAmountEls];
  //   console.dir(subTotalAmountElArr);

  const subAmountArr = subTotalAmountElArr.map((ele) => {
    return ele.textContent;
  });
  //   remove ₹
  const subAmountSymbolRemoverArr = subAmountArr.map((ele) =>
    ele.replace("₹ ", ""),
  );
// parsInt() all 
  const subAmountTotalArr = subAmountSymbolRemoverArr.map((ele) =>
    parseInt(ele),
  );

  const finalAmount = subAmountTotalArr.reduce((acc, cur) => acc + cur);
  //   console.log(finalAmount);

  totalAmountEl.textContent = `₹ ${finalAmount.toFixed(2)}`;
}

totalAmountFn()