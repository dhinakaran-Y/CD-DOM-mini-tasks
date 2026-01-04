import "../css/style.css"

const formEl = document.getElementById("user-form");
const nameInputEl = document.getElementById("user-name");
const jobInputEl = document.getElementById("job-role");
const infoListEL = document.getElementById("info-list");

EmployeeListVisibleFn();

formEl.addEventListener("submit", (e) => employeeDataManagingFn(e));

function employeeDataManagingFn(e) {
  e.preventDefault();
  //  console.log(e);
  const nameValue = nameInputEl.value;
  const jobRoleValue = jobInputEl.value;

  // console.log(nameValue , jobRoleValue);
  // validation name
  const regex = /^[\p{L}\s.'-]{2,50}$/u;
  if (!regex.test(nameValue) || nameValue.length < 3 || nameValue.length > 25) {
    nameInputEl.nextElementSibling.classList.remove("hidden");
    nameInputEl.nextElementSibling.innerText =
      "Name contains invalid characters...";
    if (nameValue.length < 3 || nameValue.length > 25) {
      nameInputEl.nextElementSibling.innerText =
        "characters length must be above 2 and below 25...";
    }
    return;
  } else {
    nameInputEl.nextElementSibling.classList.add("hidden");
  }

  // updateFn
  employeeInfoUpdateFn(nameValue, jobRoleValue);
}

function employeeInfoUpdateFn(name, role) {
  // li
  const liEL = document.createElement("li");
  liEL.classList.add("card");
  // div
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("card-content");
  // name
  const employeeNameEL = document.createElement("h2");
  employeeNameEL.innerText = name;
  // role
  const employeeRoleEL = document.createElement("p");
  employeeRoleEL.innerText = role;
  // div
  const cancelDiv = document.createElement("div");
  // span
  const cancelBtn = document.createElement("span");
  cancelBtn.innerText = "x";
  cancelBtn.classList.add("cancel-btn");
  // append
  cancelDiv.append(cancelBtn);
  contentDiv.append(employeeNameEL, employeeRoleEL);
  liEL.append(contentDiv, cancelDiv);
  infoListEL.append(liEL);

  //color-change-fn
  cardColorChange(role, liEL);

  // remove
  cancelFn(cancelBtn, liEL);

  // visible
  EmployeeListVisibleFn();
}

function cardColorChange(role, card) {
  // console.log(role , card);
  switch (role) {
    case "Developer":
      card.classList.add("bg-green-200!");
      break;
    case "Designer":
      card.classList.add("bg-violet-200!");
      break;
    case "QA & Test Engineer":
      card.classList.add("bg-purple-200!");
      break;
    case "DevOps Engineer":
      card.classList.add("bg-blue-200!");
      break;
    case "Security Engineer":
      card.classList.add("bg-red-200!");
      break;
    case "Sales Engineer":
      card.classList.add("bg-lime-200!");
      break;
    default:
      // card.classList.add("bg-gray-100!")
      break;
  }
}

// remove fn
function cancelFn(btn, card) {
  // console.log(btn , card);
  btn.addEventListener("click", () => {
    card.remove();
    let employeeCount = infoListEL.childElementCount;
    // console.log(employeeCount);

    // visible
    EmployeeListVisibleFn();
  });
}

// visible Fn
function EmployeeListVisibleFn() {
  let employeeCount = infoListEL.childElementCount;
  if (employeeCount <= 1) {
    infoListEL.parentElement.parentElement.classList.add("hidden");
  } else {
    infoListEL.parentElement.parentElement.classList.remove("hidden");
  }
}
