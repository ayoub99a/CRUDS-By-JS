// DONE getTotal
// DONE createProduct
// ! saveInLocalstorage
// ! EmptyFields
// ! showInPage
// ! delete
// ! update
// ! search
// ! validateData
// Selectors
let productName = document.getElementById("productName");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let createBtn = document.getElementById("createBtn");
let productsContainer = document.getElementById("productsContainer");

function calcTotal(total) {
  if (productName.value && price.value) {
    let totalValue = +price.value + +tax.value + +ads.value - +discount.value;
    total.innerHTML = totalValue;
    total.style.backgroundColor = "#4caf50";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "rgb(255, 0, 0, 0.5)";
  }
}

let requiredInputs = [productName, price, tax, ads, discount];

requiredInputs.forEach((input) => {
  input.addEventListener("input", function () {
    calcTotal(total);
  });
});

// Create an Empty Array
let productsArr = [];

// Get from localstorage if exist
window.addEventListener("load", function () {
  if (this.localStorage.getItem("allProducts")) {
    productsArr = JSON.parse(this.localStorage.getItem("allProducts"));
    // console.log(productsObj);
    for (let i = 0; i < productsArr.length; i++) {
      addToPage(productsArr[i]);
    }
  }
});

createBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addProduct(productName, price, tax, ads, discount, count, category);
});

function addProduct(name, price, tax, ads, discount, count, category) {
  // Check if There are The REQUIRED Values.
  if (
    name.value &&
    price.value &&
    tax.value &&
    ads.value &&
    category.value &&
    total
  ) {
    // Create Obj for EVERY Product
    let obj = {
      id: productsContainer.children.length + 1,
      name: name.value,
      price: price.value,
      tax: tax.value,
      ads: ads.value,
      discount: discount.value || 0,
      total: total.innerHTML,
      count: count.value || 1,
      category: category.value,
    };
    productsArr.push(obj);
    addToPage(obj);
    addToLocalstorge(productsArr);
    clearInputs([requiredInputs, count, category]);
  } else {
    console.log("ERROR");
  }
}

function addToPage(obj) {
  let productRow = document.createElement("tr");
  productRow.className = "product";
  for (let i = 0; i < Object.keys(obj).length; i++) {
    let dataEle = document.createElement("td");
    dataEle.innerHTML = Object.values(obj)[i];
    productRow.append(dataEle);
  }
  let icons = ["./imgs/update.png", "./imgs/delete.webp"];
  for (let i = 0; i < icons.length; i++) {
    let iconTd = document.createElement("td");
    let icon = document.createElement("img");
    icon.className = "icon";
    icon.src = icons[i];
    iconTd.append(icon);
    productRow.append(iconTd);
  }
  productsContainer.append(productRow);
}

function addToLocalstorge(arr) {
  window.localStorage.setItem("allProducts", JSON.stringify(arr));
}

function clearInputs(inputs) {
  inputs.forEach((input) => {
    if (Array.isArray(input)) {
      input.forEach(singleInput => {
        singleInput.value = "";
      })
    } else {
      input.value = ""
    }
  });
}
