// ===== PRODUCT CONFIG =====
let price = 120;
let quantity = 1;

// ===== DOM ELEMENTS =====
const quantityEl = document.getElementById("quantity");
const cartDrawer = document.getElementById("cartDrawer");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

// ===== LOAD CART FROM LOCAL STORAGE =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== UPDATE CART UI =====
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.quantity * item.price;

    cartItems.innerHTML += `
      <div class="flex justify-between items-center border-b pb-4">
        <div>
          <h4 class="font-semibold">${item.name}</h4>
          <p class="text-sm text-gray-500">${item.quantity} × $${item.price}</p>
        </div>
        <button onclick="removeItem(${index})" 
          class="text-red-500 text-sm hover:underline">
          Remove
        </button>
      </div>
    `;
  });

  cartTotal.innerText = "$" + total;
  cartCount.innerText = cart.length;

  // SAVE TO LOCAL STORAGE
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== REMOVE ITEM =====
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// ===== QUANTITY CONTROLS =====
document.getElementById("increase").onclick = () => {
  quantity++;
  quantityEl.innerText = quantity;
};

document.getElementById("decrease").onclick = () => {
  if (quantity > 1) {
    quantity--;
    quantityEl.innerText = quantity;
  }
};

// ===== ADD TO CART =====
document.getElementById("addToCart").onclick = () => {
  
  // Check if product already in cart
  let existing = cart.find(item => item.name === "GO FlyEase");

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      name: "RK FlyEase",
      price: price,
      quantity: quantity
    });
  }

  quantity = 1;
  quantityEl.innerText = quantity;

  updateCart();

  // Open cart drawer
  cartDrawer.classList.remove("translate-x-full");
};

// ===== CART DRAWER CONTROL =====
document.getElementById("cartBtn").onclick = () => {
  cartDrawer.classList.remove("translate-x-full");
};

document.getElementById("closeCart").onclick = () => {
  cartDrawer.classList.add("translate-x-full");
};

// ===== MOBILE MENU =====
document.getElementById("mobileMenuBtn").onclick = () => {
  document.getElementById("mobileMenu").classList.toggle("hidden");
};

// ===== INITIAL LOAD =====
updateCart();

// ===== CHECKOUT BUTTON REDIRECT =====
document.getElementById("checkoutBtn").onclick = () => {

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  window.location.href = "checkout.html";
};
