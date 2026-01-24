const QUOTE_URL = "https://mimic-server-api.vercel.app/quotes/";
const quoteDiv = document.getElementById("quote-div");
const generateBtnEl = document.getElementById("generate-btn");

async function getQuote(id) {
    const response = await fetch(`${QUOTE_URL}${id}`)
    const data = await response.json()
    return data
}

generateBtnEl.addEventListener("click", randomFunction)

async function randomFunction() {
    let randomNum = Math.floor(Math.random() * 38);
    const randomQuoteObj = await getQuote(randomNum);

    const {id, quote, author} = randomQuoteObj;
    
    quoteDisplay(quote , author)
}

function quoteDisplay(quote, author) {
    // create span
    const authorSpanEL = document.createElement("span");
    authorSpanEL.className = "absolute bottom-2 right-3 text-base text-black/90";
    authorSpanEL.textContent = `- ${author}`

    quoteDiv.classList.remove("text-gray-400");
    quoteDiv.classList.add("font-semibold")
    quoteDiv.textContent = quote
    quoteDiv.append(authorSpanEL)
    
}

// back navigation
window.addEventListener("keyup", (event) => {
  if (event.target.tagName !== "INPUT") {
    if (event.code === "Backspace") {
      window.location = "./index.html";
    }
  }
});