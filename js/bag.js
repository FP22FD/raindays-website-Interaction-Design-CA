//devi avare prima il HTMl finito, aggiungere gli eventi e sul click del botao devi chiamare quella funcione la, una funcione x ....

// const totalPrice = 1234;
// document.querySelector("#final-price").innerHTML = String(totalPrice);

function getTotal() {
  let total = 0;

  // per ogni prodotto del carrello
  for (let i = 0; i < bag.length; i++) {
    // item/prodotto del carrello
    const item = bag[i];

    // prendi il suo id
    const productId = item.id;
    // moltiplica il suo prezzo al totale x la qty voluta
    const price = item.price * item.qty;

    // aggiungi il suo prezzo al totale
    total = total + price;
  }
  return total;
}

let bag = JSON.parse(localStorage.getItem("bag"));
// questo si può semplificare con
// let bag = JSON.parse(localStorage.getItem("bag")) || [];
if (bag === null) {
  bag = [];
}

const products = document.querySelector("#main");
products.innerHTML = "";

for (let i = 0; i < bag.length; i++) {
  const item = bag[i];

  // trova il template "prodotto" da utilizzare
  const template1 = document.querySelector("#template1");
  const template2 = document.querySelector("#template2");

  // come fare a farne una copia => nota il .content e il cloneNode(true)
  // https://www.w3schools.com/tags/tag_template.asp
  const section1 = template1.content.cloneNode(true);
  const section2 = template2.content.cloneNode(true);

  section1.querySelector("img").src = item.image;

  // qui adesso modifichi i vari pezzi del template con i dati del singolo prodotto nel bag
  // product.querySelector("h4").innerText = item.title;

  const btnRemove = section2.querySelector("#btnRemove");
  btnRemove.addEventListener("click", () => {
    // closure
    console.log("event remove" + item.id);
  });

  // ...

  // ora lo prendi e lo appendi agli altri
  products.appendChild(section1);
  products.appendChild(section2);
}

// aggiunge il btn pay
const template3 = document.querySelector("#template3");
const section3 = template3.content.cloneNode(true);

const btnPay = section3.querySelector("#btnPay");
btnPay.addEventListener("click", () => {
  console.log("event pay");
});

// adesso calcolo il totale
const totalPrice = (section3.querySelector("#final-price").innerHTML = getTotal());

products.appendChild(section3);

// const btnRemove = document.querySelector("#btnRemove");
// btnRemove.addEventListener("click", () => {
//   console.log("event remove");
// });

//-----------------Eventi-------------------//
// document.querySelector("#btnPay").addEventListener("click", function () {
//   console.log(item.id);
//   if (bag.includes(item.id) === false) {
//     bag.push(item.id);
//     localStorage.setItem("bag", JSON.stringify(bag));
//     updateProducts(data);
//   } else {
//     bag = bag.filter((favoriteId) => bag !== item.id);
//     localStorage.setItem("bag", JSON.stringify(bag));
//     updateProducts(data);
//   }
// });

//fare un local storage con la key:"bag", poi metti un array vuoto [], pio controlla che la pagina riesca ad scrivere questo array vuoto.
//Poi devi agganciare gli eventi metti e togli del carrello.

//il carrello e una cosa a parte, che ha il suo local storage. Quindi della parte preferiti devi solo prendere quello del locale storage e mettere e togliere un elemento.
//La parte query string li, nella pagina prodotto e per sapere ID e visualizare i dati di quello prodotto. Per ora non ti serve questo qui nel codice della bag.

// let x = localStorage.getItem("favorites"); //vai a prendere la tasca favorites in forma de stringa in local storage
// let favorites = JSON.parse(x); //dopo prendemi la tasca favorites e trandorma in objeto con JSON

//--------section product details---------------------//

// const queryString = document.location.search;
// const params = new URLSearchParams(queryString);
// const id = params.get("id");
// // console.log(id);

// //--------call API---------------------//

// async function displayJacket(id) {
//   const url = "https://api.noroff.dev/api/v1/rainy-days/" + id;

//   const response = await fetch(url);
//   const data = await response.json();
// //   console.log("data", data);

//   const section = document.querySelector("#main");

//   section.querySelector("#title").innerHTML = data.title;
//   section.querySelector("#price").innerHTML = data.price;
//   section.querySelector("#description").innerHTML = data.description;
//   section.querySelector("img").src = data.image;
// }

// displayJacket(id);

//--------secction products---------------------------//

// async function displayJackets() {
//   const url = "https://api.noroff.dev/api/v1/rainy-days";

//   const response = await fetch(url);
//   const data = await response.json();
//   console.log("data", data);

//   data.sort(function (a, b) {
//     const sortOrder = a.title.localeCompare(b.title);
//     return sortOrder;
//   });

//   updateProducts(data);
// }

// function updateProducts(data) {
//   const products = document.querySelector("#products");
//   products.innerHTML = "";

//   for (let i = 0; i < data.length; i++) {
//     const item = data[i];

//     const template = document.querySelector("#product");

//     const product = template.content.cloneNode(true);

//     product.querySelector("h4").innerText = item.title;
//     product.querySelector("span").innerText = item.price;
//     product.querySelector("img").alt = item.title;
//     product.querySelector("img").src = item.image;

//     product.querySelector("a").href = "product.html?id=" + item.id;

//     const favoriteIcon = product.querySelector("i.fa-heart");
//     if (favorites.includes(item.id)) {
//       favoriteIcon.style.color = "red";
//       favoriteIcon.classList.add("fa-solid");
//     } else {
//       favoriteIcon.classList.add("fa-regular");
//     }

//     product.querySelector("i.fa-heart").addEventListener("click", function () {
//       console.log(item.id);

//       if (favorites.includes(item.id) === false) {
//         favorites.push(item.id);
//         localStorage.setItem("favorites", JSON.stringify(favorites));

//         updateProducts(data);
//       } else {
//         favorites = favorites.filter((favoriteId) => favoriteId !== item.id);
//         localStorage.setItem("favorites", JSON.stringify(favorites));

//         updateProducts(data);
//       }
//     });

//     products.appendChild(product);
//   }
// }

// displayJackets();

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
