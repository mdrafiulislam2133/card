document.addEventListener("DOMContentLoaded", function () {

  const orderItems = document.getElementById("orderItems");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const errorMsg = document.getElementById("errorMsg");
  const cartCount = document.getElementById("cartCount");

  const SHIPPING = 10;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    let totalQty = 0;
    cart.forEach(item => {
      totalQty += Number(item.quantity) || 0;
    });

    if (cartCount) {
      cartCount.innerText = totalQty;
    }
  }

  function loadOrder() {

    orderItems.innerHTML = "";

    if (cart.length === 0) {
      orderItems.innerHTML =
        "<p class='text-gray-500'>Your cart is empty.</p>";
      subtotalEl.innerText = "$0";
      totalEl.innerText = "$0";
      return;
    }

    let subtotal = 0;

    cart.forEach(item => {

      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      const itemTotal = price * quantity;

      subtotal += itemTotal;

      const div = document.createElement("div");
      div.className = "flex justify-between";

      div.innerHTML = `
        <div>
          <h4 class="font-medium">${item.name}</h4>
          <p class="text-sm text-gray-500">
            ${quantity} × $${price}
          </p>
        </div>
        <span>$${itemTotal}</span>
      `;

      orderItems.appendChild(div);
    });

    subtotalEl.innerText = "$" + subtotal;
    totalEl.innerText = "$" + (subtotal + SHIPPING);
  }

  document.getElementById("checkoutForm")
    .addEventListener("submit", function (e) {

      e.preventDefault();

      const firstName = document.getElementById("firstName").value.trim();
      const email = document.getElementById("email").value.trim();
      const cardNumber = document.getElementById("cardNumber").value.trim();

      if (!firstName || !email || !cardNumber) {
        errorMsg.innerText = "Please fill all required fields.";
        errorMsg.classList.remove("hidden");
        return;
      }

      if (cardNumber.length < 12 || isNaN(cardNumber)) {
        errorMsg.innerText = "Invalid card number.";
        errorMsg.classList.remove("hidden");
        return;
      }

      errorMsg.classList.add("hidden");

      alert("Order placed successfully! 🎉");

      localStorage.removeItem("cart");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);

    });

  updateCartCount();
  loadOrder();

});
