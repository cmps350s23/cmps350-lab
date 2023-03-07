import promptSync from "prompt-sync";
const prompt = promptSync();

const products = [
  { id: 1, name: "Apple 14 Pro Max", price: 4500 },
  { id: 2, name: "iPad Pro 12.9-inch", price: 5600 },
  { id: 3, name: "Samsung Galaxy S14", price: 3900 },
  { id: 4, name: "Microsoft Surface Book 3", price: 6700 },
  { id: 5, name: "Sony PlayStation 5", price: 3500 },
  { id: 6, name: "Dell XPS 13", price: 4500 },
  { id: 7, name: "LG 65-inch OLED TV", price: 9800 },
  { id: 8, name: "Bose QuietComfort 35 II", price: 1800 },
];

function menu() {
  console.log("(1) Add item");
  console.log("(2) Change quantity");
  console.log("(3) Delete item");
  console.log("(4) Display invoice");
  console.log("(0) Exit");
}

function displayProducts() {
  console.log(
    products
      .map((p) => `${p.id}: ${p.name} (QR${p.price.toLocaleString()})`)
      .join("\n")
  );
}

function displayCart() {
  if (cart.length > 1) {
    const min = cart.reduce(
      (min, item, index, cart) => (cart[min].price < item.price ? min : index),
      0
    );
    const max = cart.reduce(
      (max, item, index, cart) => (cart[max].price > item.price ? max : index),
      0
    );

    console.log(
      cart
        .map(
          (item, index) =>
            `${item.id}: ${item.quantity} * ${
              item.name
            } (QR${item.price.toLocaleString()})${
              index === min ? " *" : index === max ? " **" : ""
            }`
        )
        .join("\n")
    );
  } else {
    console.log(
      `${cart[0].id}: ${cart[0].quantity} * ${
        cart[0].name
      } (QR${cart[0].price.toLocaleString()})`
    );
  }
}

function addItem() {
  displayProducts();
  const id = Number(prompt("ID: "));

  const product = products.findIndex((p) => p.id === id);
  if (product === -1) {
    console.log("Invalid product ID.");
    return;
  }

  const item = cart.findIndex((i) => i.id === id);
  const quantity = Number(prompt("Quantity: "));
  if (item === -1) {
    cart.push({ ...products[product], quantity });
  } else {
    cart[item].quantity += quantity;
  }
}

function changeQuantity() {
  if (cart.length) {
    displayCart();
    const id = Number(prompt("ID: "));

    const item = cart.findIndex((i) => i.id === id);
    if (item === -1) {
      console.log("Item not found.");
    } else {
      const quantity = Number(prompt("Quantity: "));
      if (quantity === 0) {
        cart.splice(item, 1);
        console.log(`Item ${id} removed.`);
      } else {
        cart[item].quantity = quantity;
      }
    }
  } else {
    console.log("Empty cart!");
  }
}

function deleteItem() {
  if (cart.length) {
    displayCart();
    const id = Number(prompt("ID: "));

    const item = cart.findIndex((i) => i.id === id);
    if (item === -1) {
      console.log("Item not found.");
    } else {
      cart.splice(item, 1);
      console.log(`Item ${id} removed.`);
    }
  } else {
    console.log("Empty cart!");
  }
}

function displayInvoice() {
  if (cart.length) {
    displayCart();
    console.log(
      "Total:",
      `QR${cart.reduce((t, i) => t + i.price * i.quantity, 0).toLocaleString()}`
    );
  } else {
    console.log("Empty cart!");
  }
}

const cart = [];

let selection;
do {
  menu();
  selection = prompt("Selection: ");

  switch (selection) {
    case "1":
      addItem();
      break;
    case "2":
      changeQuantity();
      break;
    case "3":
      deleteItem();
      break;
    case "4":
      displayInvoice();
      break;
    case "0":
      break;

    default:
      console.log("Invalid choice.");
      break;
  }
} while (selection !== "0");
