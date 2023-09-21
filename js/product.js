const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);

async function displayJacket(id) {
  const url = "https://api.noroff.dev/api/v1/rainy-days/" + id;

  const response = await fetch(url);
  const data = await response.json();
  console.log("data", data);

  const section = document.querySelector("#product-details");

  section.querySelector("#title").innerHTML = data.title;
  section.querySelector("#price").innerHTML = data.price;
  section.querySelector("#description").innerHTML = data.description;
  section.querySelector("img").src = data.image;
  //   }
}

displayJacket(id);

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
