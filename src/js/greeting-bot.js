import "../css/style.css";

const formEl = document.getElementById("user-form");
const nameInputEl = document.getElementById("user-name");
const greetDivEL = document.getElementById("greet-div");
// GreetFn();

formEl.addEventListener("submit", (e) => UserNameGetFn(e));

function UserNameGetFn(e) {
  e.preventDefault();
  //  console.log(e);
  const nameValue = nameInputEl.value;

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
  greetFn(nameValue);
  nameInputEl.value = "";

  // visible
  formEl.parentElement.classList.add("hidden")
  greetDivEL.parentElement.classList.remove("hidden")
}

function greetFn(name) {
  let greetEl = document.getElementById("greet-el")
    greetEl.innerHTML = `Hello <span class="capitalize text-red-400">${name}</span>,<br>
     Welcome to CyberDude!`;
  console.log(greetEl);
}

const greetAnotherBtn = document.getElementById("greet-another");
greetAnotherBtn.addEventListener("click", () =>{
  greetDivEL.parentElement.classList.add("hidden");
  formEl.parentElement.classList.remove("hidden");
}
);