const nameInputEl = document.getElementById("user-name")
const passwordInputEl = document.getElementById("password-input")

const visibleBtnEl = document.getElementById("visible-btn")
const notVisibleBtnEl = document.getElementById("not-visible-btn")

visibleBtnEl.addEventListener("click", passwordVisibleFN)
notVisibleBtnEl.addEventListener("click", passwordVisibleFN)

function passwordVisibleFN() {
    // console.log(event.target.id , visibleBtnEl , notVisibleBtnEl);

    if (event.target.id === "not-visible-btn") {
      // console.dir(event.target.id);
      event.target.classList.toggle("hidden");
      visibleBtnEl.classList.toggle("hidden");
      passwordInputEl.attributes.type.value = "text";
    }
    if (event.target.id === "visible-btn") {
    //   console.dir(event.target.id);
      event.target.classList.toggle("hidden");
      notVisibleBtnEl.classList.toggle("hidden")
      passwordInputEl.attributes.type.value = "password";

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
