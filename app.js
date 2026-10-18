const PRICES = {
    Espresso: 45,
    Latte: 65,
    Croissant: 40,
};

const form = document.getElementById("orderForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const productInput = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const ordersBox = document.getElementById("orders");

function setError(fieldId, message) {
    document.getElementById(fieldId + "Error").textContent = message;
}
function clearErrors() {
    ["name", "phone", "product", "quantity"].forEach((id) =>
        setError(id, "")
    );
}

function validate() {
    clearErrors();
    let ok = true;

    const name = nameInput.value.trim();
    if (!name) {
        setError("name", "Name is required");
        ok = false;
    } else if (name.length < 3) {
        setError("name", "Name must be at least 3 characters");
        ok = false;
    }

    const phone = phoneInput.value.trim();
    const phoneRegex = /^01\d{9}$/;
    if (!phone) {
        setError("phone", "Phone is required");
        ok = false;
    } else if (!phoneRegex.test(phone)) {
        setError("phone", "Phone must be 11 digits and start with 01");
        ok = false;
    }

    const product = productInput.value;
    if (!product) {
        setError("product", "Please choose a product");
        ok = false;
    }

    const quantity = Number(quantityInput.value);
    if (!quantityInput.value) {
        setError("quantity", "Quantity is required");
        ok = false;
    } else if (quantity < 1 || quantity > 10) {
        setError("quantity", "Quantity must be from 1 to 10");
        ok = false;
    }

    return ok;
}


function calcTotal(price, quantity) {
    let total = price * quantity;
    if (quantity >= 3) total *= 0.9;
    return total;
}


function showOrder({ name, product, quantity, total, freeDelivery }) {
    const card = document.createElement("div");
    card.className = "order-card";
    card.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Product:</strong> ${product} × ${quantity}</p>
    <p><strong>Total:</strong> ${total.toFixed(1)} EGP</p>
    ${freeDelivery ? '<p class="free">🚚 Free Delivery</p>' : ""}
  `;
    ordersBox.prepend(card);
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) return;

    const name = nameInput.value.trim();
    const product = productInput.value;
    const quantity = Number(quantityInput.value);
    const price = PRICES[product];
    const total = calcTotal(price, quantity);
    const freeDelivery = total > 200;

    showOrder({ name, product, quantity, total, freeDelivery });

    form.reset();
    clearErrors();
});
