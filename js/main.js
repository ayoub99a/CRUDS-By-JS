// DONE getTotal
// DONE createProduct
// DONE saveInLocalstorage
// DONE EmptyFields
// DONE showInPage
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

let requiredInputs = [productName, price, tax, ads, discount];
let allInputs = [productName, price, tax, ads, discount, count, category];
let allInputsAndTotal = [
  productName,
  price,
  tax,
  ads,
  discount,
  total,
  count,
  category,
];

// Calculate Total
requiredInputs.forEach((input) => {
  input.addEventListener("input", function () {
    calcTotal(total);
  });
});

// Create an Empty Array
let productsArr = [];

// EVENTS
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
    // Add Product To Array
    productsArr.push(obj);
    // Add Product To Page
    addToPage(obj);
    // Add Product To Localstorage
    addToLocalstorge(productsArr);
    // EMPTY the Input fileds
    clearInputs(allInputs);

    // Re-Focus to Product Name Filed
    name.focus();
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
  // Set class for ID Fields

  // Update Icon
  let updateTd = document.createElement("td");
  let updateIcon = document.createElement("img");
  updateIcon.className = "icon updateIcon";
  updateIcon.src = "./imgs/update.png";
  updateTd.append(updateIcon);
  productRow.append(updateTd);

  // Update Icon FUNCTION
  updateTd.addEventListener("click", function (e) {
    productName.focus();
    let targetProduct = e.target.parentElement.parentElement;
    console.log(targetProduct);
    // console.log(targetProduct.children[1].innerHTML);
    // TODO Working Correctly but STATIC.
    // productName.value = targetProduct.children[1].innerHTML;
    let targetChildren = targetProduct.children;
    for (let i = 1; i < targetChildren.length - 2; i++) {
      if (allInputsAndTotal[i - 1].nodeName === "INPUT") {
        allInputsAndTotal[i - 1].value = targetChildren[i].innerHTML;
      } else {
        // allInputsAndTotal[i - 1].innerHTML = targetChildren[i].innerHTML;
        calcTotal(total)
      }
    }
    createBtn.innerHTML = "Update";
    createBtn.addEventListener("click", function () {
      removeFromPage(e);
      removeFromArr(e);
      createBtn.innerHTML = "Create";
    });
  });

  // Delete Icon
  let deleteTd = document.createElement("td");
  let deleteIcon = document.createElement("img");
  deleteIcon.className = "icon deleteIcon";
  deleteIcon.src = "./imgs/delete.webp";
  deleteTd.append(deleteIcon);
  productRow.append(deleteTd);
  productsContainer.append(productRow);

  // Delete Icon FUNCTION
  deleteIcon.addEventListener("click", function (e) {
    removeFromPage(e);
    removeFromArr(e);
  });
}

function addToLocalstorge(arr) {
  window.localStorage.setItem("allProducts", JSON.stringify(arr));
}

function clearInputs(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}

function removeFromPage(e) {
  e.target.parentElement.parentElement.remove();
  // Renumbering in PAGE
  for (let i = 0; i < productsContainer.children.length; i++) {
    productsContainer.children[i].children[0].innerHTML = i + 1;
  }
}

function removeFromArr(e) {
  let theDeletedId = parseInt(
    e.target.parentElement.parentElement.firstChild.innerHTML
  );
  for (let i = 0; i < productsArr.length; i++) {
    // Remove From Array
    if (productsArr[i].id === theDeletedId) {
      productsArr.splice(i, 1);
      console.log(productsArr);
    }
    // Renumbering the Array
    if (productsArr[i]) {
      productsArr[i].id = i + 1;
    }
    // Add array AFTER UPDATE.
    addToLocalstorge(productsArr);
  }
}

// !Automatic ADD => For Testing

// productsArr = [
//   {
//     id: 1,
//     name: "Iphone 11 Pro",
//     price: "900",
//     tax: "0",
//     ads: "5",
//     discount: "10",
//     total: "895",
//     count: "1",
//     category: "Phone",
//   },
//   {
//     id: 2,
//     name: "Realme Q3 Pro",
//     price: "350",
//     tax: "0",
//     ads: "2",
//     discount: "5",
//     total: "347",
//     count: 1,
//     category: "Phone",
//   },
//   {
//     id: 3,
//     name: "Iphone 11 Pro",
//     price: "1200",
//     tax: "0",
//     ads: "10",
//     discount: "10",
//     total: "1200",
//     count: "1",
//     category: "Phone",
//   },
//   {
//     id: 4,
//     name: "Iphone 13 Pro",
//     price: "1300",
//     tax: "0",
//     ads: "10",
//     discount: "5",
//     total: "1305",
//     count: "2",
//     category: "Phone",
//   },
//   {
//     id: 5,
//     name: "Iphone 7",
//     price: "500",
//     tax: "0",
//     ads: "0",
//     discount: "0",
//     total: "500",
//     count: 1,
//     category: "Phone",
//   },
//   {
//     id: 6,
//     name: "Lenovo Ideapad 510",
//     price: "605",
//     tax: "0",
//     ads: "2",
//     discount: "2",
//     total: "605",
//     count: 1,
//     category: "Laptop",
//   },
//   {
//     id: 7,
//     name: "Huawei P10",
//     price: "410",
//     tax: "0",
//     ads: "0",
//     discount: "0",
//     total: "410",
//     count: 1,
//     category: "Phone",
//   },
//   {
//     id: 8,
//     name: "Samsung Tab s7fe",
//     price: "400",
//     tax: "0",
//     ads: "10",
//     discount: "10",
//     total: "400",
//     count: 1,
//     category: "Tablet",
//   },
// ];

// addToLocalstorge(productsArr);
