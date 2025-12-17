const products = [
  {
    id: 1,
    name: "Laptop",
    price: "$999",
    image: "https://png.pngtree.com/png-vector/20250522/ourmid/pngtree-modern-laptop-computer-with-screen-open-technology-digital-device-png-image_16345445.png"
  },
  {
    id: 2,
    name: "Headphones",
    price: "$199",
    image: "https://toppng.com/uploads/preview/headphone-11530972547el05n3vobv.png"
  },
  {
    id: 3,
    name: "Smartphone",
    price: "$799",
    image: "https://pngimg.com/image/8519"
  },
  {
    id: 4,
    name: "Smartwatch",
    price: "$299",
    image: "https://pngtree.com/so/smartwatch"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { name: "Laptop", price: "$1000" },
    { name: "Phone", price: "$600" },
    { name: "Headphones", price: "$150" },
    { name: "Watch", price: "$250" }
  ];

  const productsDiv = document.getElementById("products");

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow";

    card.innerHTML = `
      <h2 class="text-lg font-bold">${product.name}</h2>
      <p class="text-gray-600">${product.price}</p>
    `;

    productsDiv.appendChild(card);
  });
});

