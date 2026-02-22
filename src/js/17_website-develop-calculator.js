const inputEls = document.querySelectorAll("input");
const totalEl = document.getElementById("total");
const outputListEl = document.getElementById("output-list");
const mediaYesEL = document.getElementById("media-yes");
const isHaveMediaEl = document.getElementById("is-have-media");
const emailYesEL = document.getElementById("email-yes");
const noResultAlertEl = document.getElementById("no-result-alert");
const restBtnEl = document.getElementById("reset-btn");
// const emailCountDiv = document.getElementById("no-email-div");
let checkedValArr = [];

// bug in email no btn click it closes but the inner div value is not reset.

// email
// email count update
const emailRangInputEl = document.getElementById("no-email");
const emailCountEl = document.getElementById("email-count");
emailCountEl.textContent = emailRangInputEl.value;

const inputElsArr = [...inputEls];

// form data
// const formEl = document.getElementById("website-requirement-form");
// const formData = new FormData(formEl);
// const userData = Object.fromEntries(formData);

emailCountDisableFn();

inputElsArr.forEach((input) =>
  input.addEventListener("click", () => {
    emailCountDisableFn();
    mediaInnerDiv2VisibleFn();
    addFeaturesToArrFn();
    addFeaturesToUI();
    totalCalFn();
    noResultAlertFn();
  }),
);

function addFeaturesToArrFn() {
  checkedValArr = [];
  const checkedInputEls = document.querySelectorAll("input:checked");
  const checkedInputElsArr = [...checkedInputEls];
  checkedInputElsArr.forEach((input) => {
    let amount = input.value;
    let feature = input.dataset.name;
    if (feature === "emailChecked") {
      emailPushArr();
    }
    if (feature !== undefined && feature !== "emailChecked") {
      checkedValArr.push({ feature, amount });
    }
  });
}

function addFeaturesToUI() {
  // rerender
  outputListEl.innerHTML = "";

  // UI append
  checkedValArr.forEach((feat) => {
    //   console.log(feat);
    outputListEl.innerHTML += `<li class="flex justify-between">
                    <span>${feat.feature}</span>
                    <span>${feat.amount}</span>
                </li>`;
  });
}

// total calc
function totalCalFn() {
  let amountListArr = [...outputListEl.children].map((amountList) =>
    parseInt(amountList.lastElementChild.textContent),
  );
  let totalAmount = amountListArr.reduce((acc, curr) => acc + curr, 0);

  totalEl.textContent = `₹${totalAmount}`;
}

// email disable fn
function emailCountDisableFn() {
  if (!emailYesEL.checked) {
    emailRangInputEl.disabled = true;
    let featIndex = checkedValArr.findIndex((feat) => feat.feature === "email");
    checkedValArr.splice(featIndex, 1);
  } else {
    emailRangInputEl.disabled = false;
    // ????
    // bug in email no btn click it closes but the inner div value is not reset.
  }
}

// inner media div visible fn
function mediaInnerDiv2VisibleFn() {
  if (mediaYesEL.checked) {
    isHaveMediaEl.classList.remove("hidden");
  } else {
    isHaveMediaEl.classList.add("hidden");
  }
}

emailRangInputEl.addEventListener("change", () => {
  // ui no count
  emailCountEl.textContent = emailRangInputEl.value;
});

// email amount calculate and push
function emailPushArr() {
  // arr push
  const amount = emailRangInputEl.value * 100;
  const feature = emailRangInputEl.dataset.name;
  checkedValArr.push({ feature, amount });
  //   console.log(checkedValArr);
}

// no requirement selected alert
function noResultAlertFn() {
  if (!outputListEl.childElementCount <= 0) {
    noResultAlertEl.classList.add("hidden");
  } else {
    noResultAlertEl.classList.remove("hidden");
  }
}

// reset fn
  restBtnEl.addEventListener("click",(e) => {
    checkedValArr = [];
    outputListEl.innerHTML = "";
    totalCalFn();
    noResultAlertFn();
  })

// back navigation
window.addEventListener("keyup", (event) => {
  if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
    if (event.code === "Backspace") {
      window.location = "./index.html";
    }
  }
});