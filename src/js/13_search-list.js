const dataListArr = ["c" , "c++" , "java", "python", "javascript", "golang", "rust", "php", "c#", "ruby", "kotlin", "scala"] ;

const tbodyEl = document.getElementById("product-list-tbody");
const searchInputEl = document.getElementById("search")
const noResultSpanEl = document.getElementById("no-result-span")

function addProducts(dataListArr) {
  
  const fragmentEl = document.createDocumentFragment();
  dataListArr.forEach((lang, index) => {
   
    // tr
    const trEL = document.createElement("tr");
    trEL.classList.add("list-row");
    // sno
    const sNoEL = document.createElement("td");
    sNoEL.innerText = `${index+1}`;
    // name
    const LanguageNameEL = document.createElement("td");
    LanguageNameEL.classList.add("capitalize")
    LanguageNameEL.innerText = `${lang}`;

    trEL.append(sNoEL, LanguageNameEL);
    fragmentEl.append(trEL);
  });

  tbodyEl.append(fragmentEl);
}

addProducts(dataListArr);

// search fn
searchInputEl.addEventListener("input",searchLangFn);

function searchLangFn(event) {
    let searchValue = event.target.value.toLowerCase();  

    const searchListArr = dataListArr.filter(lang => lang.includes(searchValue))
    tbodyEl.innerHTML = "";

    if (searchListArr.length === 0) {
      tbodyEl.parentElement.classList.add("hidden")
      noResultSpanEl.classList.remove("hidden")
    }else{
      tbodyEl.parentElement.classList.remove("hidden");
      noResultSpanEl.classList.add("hidden")
      addProducts(searchListArr);
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
