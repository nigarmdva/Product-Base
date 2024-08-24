const name = document.querySelector("#name");
const price = document.querySelector("#price");
const list = document.querySelector(".list");
const add = document.querySelector("#add");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const productsList = document.querySelector(".products-list");

let products = JSON.parse(localStorage.getItem("products"));

add.onclick = addProduct;
showProducts();

function addProduct() {
  if (!name.value || !price.value) {
    alert("Məhsulun adı və qiyməti daxil edilməlidir");
    return;
  }
  products.push({
    name: name.value,
    price: price.value,
  });
  updateLocalStorage();
  showProducts();
  name.value = "";
  price.value = "";
}

function removeProduct(index) {
  products.splice(index, 1);
  updateLocalStorage();
  showProducts();
}

function showProducts() {
  let code = "";
  for (let i = 0; i < products.length; i++) {
    code += `<span class="product-span"><li class="product">${products[i].name} (${products[i].price} AZN) </li><button onclick="removeProduct(${i})" class="remove-button">Sil</button></span>`;
  }

  if (products.length === 0) {
    productsList.classList.add("hidden");
  } else {
    productsList.classList.remove("hidden");
  }

  list.innerHTML = code;
  count.innerHTML = products.length;
  total.innerHTML = products
    .map((p) => parseFloat(p.price))
    .reduce((a, b) => a + b, 0);
}

function updateLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}
