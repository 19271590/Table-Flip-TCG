function openNav() {
  document.getElementById("cartbar").style.maxWidth = "40%";
  document.getElementById("cartbar").style.width = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("cartbar").style.width = "0";
  document.getElementById("main").style.marginRight = "0";
}

// 1. The State
let cart = [];
let cartCount = 0;

if (localStorage.getItem("count")) {
    count = parseInt(localStorage.getItem("count"));
}

if (localStorage.getItem("sum")) {
    sum = parseInt(localStorage.getItem("sum"));
}

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}


// 2. DOM Elements
const cartItemsContainer = document.querySelector('.cartitems');
const totalEl = document.getElementById('total');
const cartCountEl = document.getElementById('cartCount');

// 3. Core Function: Add to Cart
function addToCart(productId, productName, productPrice, productImage){
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // If not, add the new item to the cart array
        cart.push({
            id: productId,
            name: productName,
            image: productImage,
            price: parseFloat(productPrice), // Ensure it's a number
            quantity: 1
        });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the UI to reflect the new state
    renderCart();
    }

// 4. Core Function: Remove from Cart
function removeFromCart(productId) {
    // Filter out the item with the matching ID
    cart = cart.filter(item => item.id !== productId);
    renderCart(); // Re-render the cart
}

// 5. Core Function: Update Quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        renderCart();
    }
}

// 6. The Most Important Function: Render the Cart UI
function renderCart() {
    // Clear the current cart display
    cartItemsContainer.innerHTML = '';

    let total = 0;

    // Loop through each item in the cart state and create its HTML
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cartimage">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="item-controls">
                <button class="btn-quantity" data-id="${item.id}" data-action="decrease">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="btn-quantity" data-id="${item.id}" data-action="increase">+</button>
                <button class="btn-remove" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });
// Update cart count
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountEl.textContent = cartCount;
    totalEl.textContent = total.toFixed(2);
}

// 8. Event Delegation: The Brain of the Operation
document.body.addEventListener('click', function(event) {
    const target = event.target;

    // Handle "Add to Cart" clicks from product cards
    if (target.classList.contains('addbutton')) {
        const productCard = target.closest('.productdisplay');
        const id = productCard.dataset.id;
        const name = productCard.dataset.name;
        const price = productCard.dataset.price;
        const image = productCard.dataset.image;
        addToCart(id, name, price, image);
    }

    // Handle "Increase/Decrease Quantity" and "Remove" clicks inside the cart
    if (target.classList.contains('btn-remove')) {
        const productId = (target.dataset.id);
        removeFromCart(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    if (target.classList.contains('btn-quantity')) {
        const productId = (target.dataset.id);
        const action = target.dataset.action;
        const item = cart.find(item => item.id === productId);

        if (item) {
            if (action === 'increase') {
                updateQuantity(productId, item.quantity + 1);
                localStorage.setItem("cart", JSON.stringify(cart));
            } else if (action === 'decrease') {
                updateQuantity(productId, item.quantity - 1);
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        }
    }
});

// Initialize
renderCart();
