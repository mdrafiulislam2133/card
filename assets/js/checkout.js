const orderItems = document.getElementById("orderItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const errorMsg = document.getElementById("errorMsg");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let shipping = 10;
let subtotal = 0;

function loadOrder() {
orderItems.innerHTML = "";
subtotal = 0;

cart.forEach(item => {
let itemTotal = item.price * item.quantity;
subtotal += itemTotal;

orderItems.innerHTML += `
<div class="flex justify-between">
<div>
<h4 class="font-medium">${item.name}</h4>
<p class="text-sm text-gray-500">${item.quantity} × $${item.price}</p>
</div>
<span>$${itemTotal}</span>
</div>
`;
});

subtotalEl.innerText = "$" + subtotal;
totalEl.innerText = "$" + (subtotal + shipping);
}

loadOrder();


document.getElementById("checkoutForm").addEventListener("submit", function(e) {
e.preventDefault();

let firstName = document.getElementById("firstName").value.trim();
let email = document.getElementById("email").value.trim();
let cardNumber = document.getElementById("cardNumber").value.trim();

if (!firstName || !email || !cardNumber) {
errorMsg.innerText = "Please fill all required fields.";
errorMsg.classList.remove("hidden");
return;
}

if (cardNumber.length < 12) {
errorMsg.innerText = "Invalid card number.";
errorMsg.classList.remove("hidden");
return;
}

localStorage.removeItem("cart");
alert("Order placed successfully!");

window.location.href = "index.html";
});