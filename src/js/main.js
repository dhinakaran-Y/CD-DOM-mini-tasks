import productListData from "../data/product-list-data.json";

// console.log(productListData);
const tbodyEl = document.getElementById("product-list-tbody");
const productListArray = productListData;
// console.log(productListArray);

function addProducts(data) {
  const fragmentEl = document.createDocumentFragment();
  productListArray.forEach((product) => {
    // console.log(product);
    const trEL = document.createElement("tr");
    trEL.classList.add("list-row");
    const productIdEL = document.createElement("td");
    productIdEL.innerText = `${product.id}`;
    const productNameEL = document.createElement("td");
    productNameEL.innerText = `${product.productName}`;
    const productQuantityEL = document.createElement("td");
    productQuantityEL.innerText = `${product.quantity}`;
    const productPriceEL = document.createElement("td");
    productPriceEL.innerText = `₹ ${product.price}`;

    trEL.append(productIdEL, productNameEL, productQuantityEL, productPriceEL);
    fragmentEl.append(trEL);
  });

  tbodyEl.append(fragmentEl);
}

addProducts();
