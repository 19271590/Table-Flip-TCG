if (localStorage.getItem("sum")) {
    sum = parseInt(localStorage.getItem("sum"));
}

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}


// 2. DOM Elements
const checkoutItemsContainer = document.querySelector('.checkoutitems');
const checkouttotal = document.getElementById('checkouttotal');;

// 6. The Most Important Function: Render the Cart UI
function renderCart() {
    // Clear the current cart display
    checkoutItemsContainer.innerHTML = '';

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
        checkoutItemsContainer.appendChild(cartItemEl);
    });
}
renderCart();
