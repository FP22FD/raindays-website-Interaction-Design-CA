// let x = localStorage.getItem("favorites");
// let favorites = JSON.parse(x);

let favorites = JSON.parse(localStorage.getItem("favorites"));

//--------section product details---------------------//

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
// console.log(id);

let data=undefined;

async function displayJacket(id) {
  const url = "https://api.noroff.dev/api/v1/rainy-days/" + id;

  const response = await fetch(url);
  data = await response.json();
  console.log("data", data);

  const section = document.querySelector("#product-details");

  section.querySelector("#title").innerHTML = data.title;
  section.querySelector("#price").innerHTML = data.price;
  section.querySelector("#description").innerHTML = data.description;
  section.querySelector("img").src = data.image;
}

displayJacket(id);

//--------secction products---------------------------//

// referenza globale per poter utilizzare i prodotti nelle varie funzioni
let products = [];

async function displayJackets() {
  const url = "https://api.noroff.dev/api/v1/rainy-days";

  const response = await fetch(url);
  const data = await response.json();
  console.log("data", data);

  data.sort(function (a, b) {
    const sortOrder = a.title.localeCompare(b.title);
    return sortOrder;
  });

  products = data;

  updateProducts(data);
}

function updateProducts(data) {
  const products = document.querySelector("#products");
  products.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const template = document.querySelector("#product");

    const product = template.content.cloneNode(true);

    product.querySelector("h4").innerText = item.title;
    product.querySelector("span").innerText = item.price;
    product.querySelector("img").alt = item.title;
    product.querySelector("img").src = item.image;

    product.querySelector("a").href = "product.html?id=" + item.id;

    const favoriteIcon = product.querySelector("i.fa-heart");
    if (favorites.includes(item.id)) {
      favoriteIcon.style.color = "red";
      favoriteIcon.classList.add("fa-solid");
    } else {
      favoriteIcon.classList.add("fa-regular");
    }

    product.querySelector("i.fa-heart").addEventListener("click", function () {
      console.log(item.id);

      if (favorites.includes(item.id) === false) {
        favorites.push(item.id);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        updateProducts(data);
      } else {
        favorites = favorites.filter((favoriteId) => favoriteId !== item.id);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        updateProducts(data);
      }
    });

    products.appendChild(product);
  }
}

displayJackets();

/* bag */
let bag = JSON.parse(localStorage.getItem("bag"));
// questo si può semplificare con
// let bag = JSON.parse(localStorage.getItem("bag")) || [];
if (bag === null) {
  bag = [];
}

/* add to bag */

document.querySelector("#btnAddToBag").addEventListener("click", function () {
  const inBag = bag.find((x) => x.id === id);
  if (inBag === undefined) {
    // non trovato, aggiungilo
    bag.push({ id: id, qty: 1, image: data.image, title:data.title, price:data.price });
  } else {
    // trovato, modifica la qty
    inBag.qty = inBag.qty + 1;
  }

  localStorage.setItem("bag", JSON.stringify(bag));

  // quando abbiamo finito...
  // equivale a <a href="bag.html">...</a>
  window.location.href = "bag.html";
});

function removeFromBag(id) {
  const inBag = bag.find((x) => x.id === id);
  if (inBag === undefined) {
    // errore
  } else {
    bag.filter((x) => x.id !== id);
    localStorage.setItem("bag", JSON.stringify(bag));
  }
}

function changeQty(id, qty) {
  const inBag = bag.find((x) => x.id === id);
  if (inBag === undefined) {
    // errore
  } else {
    inBag.qty = qty;
    localStorage.setItem("bag", JSON.stringify(bag));
  }
}

function getTotal() {
  let total = 0;

  // per ogni prodotto del carrello
  for (let i = 0; i < bag.length; i++) {
    // item/prodotto del carrello
    const item = bag[i];

    // prendi il suo id
    const productId = item.id;

    // da tutti i prodotti (che vengono dalle api caricate all'inizio della pagina)
    // trova quello con l'id del ciclo corrente
    const productData = products.find((x) => x.id === productId);

    // moltiplica il suo prezzo al totale x la qty voluta
    const price = productData.price * item.qty;

    // aggiungi il suo prezzo al totale
    total = total + productData.price;
  }
  return total;
}

function displayBag() {
  const bag = document.querySelector("#bag??");
  bag.innerHTML = "";

  for (let i = 0; i < bag.length; i++) {
    const item = bag[i];
    const productData = products.find((x) => x.id === item.id);

    const template = document.querySelector("#bag-product???");

    const product = template.content.cloneNode(true);

    // quantita in carrello
    product.querySelector("???").innerText = item.qty;

    // dati del prodotto dalal lista generale che arriva dalle API
    product.querySelector("???").innerText = productData.title;
    product.querySelector("???").innerText = productData.price;
    product.querySelector("???").alt = productData.title;
    product.querySelector("???").src = productData.image;

    // product.querySelector("???btn-rimuovi???").data.id = item.id;
    // product.querySelector("???input-text-qty???").data.id = item.id;

    // product.querySelector("a").href = "product.html?id=" + item.id;

    // btn rimuovi dal carrello
    product.querySelector("???").addEventListener("click", function (event) {
      // aggiungere nel html del btn data-id="id"
      // const productId = event.target.data.id;

      // oppure si può usare l'id che abbiamo nel ciclo for
      const productId = item.id;

      console.log(productId);

      removeFromBag(productId);
    });

    // input number qty - event input = valore cambiato
    product.querySelector("???").addEventListener("input", function (event) {
      // aggiungere nel html del btn data-id="id"
      // const productId = event.target.data.id;

      // oppure si può usare l'id che abbiamo nel ciclo for
      const productId = item.id;

      // event è l'evento e il suo contesto, in particolare ebent.target è l'elemento che ha generato l'evento
      const qtyText = event.target.value;

      const qty = parseInt(qtyText);
      console.log(productId, qty);

      changeQty(productId, qty);
    });

    products.appendChild(product);
  }
}

/*
{
    "id": "b4eaa52e-2efe-4075-9772-e0c6d7ba04bb",
    "title": "Rainy Days Venture Jacket",
    "description": "The Women's Rainy Days Venture jacket is a lightweight and packable rain jacket that is perfect for travel.",
    "gender": "Female",
    "sizes": [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],
    "baseColor": "Purple",
    "price": 99.99,
    "discountedPrice": 89.99,
    "onSale": true,
    "image": "https://static.cloud.noroff.dev/public/rainy-days/10-venture-jacket.jpg",
    "tags": [
        "jacket",
        "womens"
    ],
    "favorite": false
}
*/
