// Sample product data
const products = [
    {
        id: 1,
        name: "Full-Slevees Shirt",
        description: "Comfortable and trendy shirt for everyday wear.",
        price: 699.99,
        image: "https://i.pinimg.com/474x/3b/af/12/3baf12ba030768853aff6dc123b2ff72.jpg"
    },
    {
        id: 2,
        name: "Off-White Formal Pants",
        description: "Stylish pants to complete your look.",
        price: 899.99,
        image: "https://i.pinimg.com/474x/50/55/74/505574b112da1a7f089599ae7e6e8481.jpg"
    },
    {
        id: 3,
        name: "Old Money Shirt",
        description: "Stylish shirt for everyone.",
        price: 699.99,
        image: "https://i.pinimg.com/474x/04/1f/e5/041fe5e6d50df53052b680844a21f2b3.jpg"
    },
    {
        id: 4,
        name: "Light Beige Formal Pants",
        description: "Comfortable and stylish pants for office.",
        price: 899.99,
        image: "https://i.pinimg.com/474x/e3/5f/1d/e35f1d2ab73956cedfdd854c7c7af441.jpg"
    },
    {
        id: 5,
        name: "Textured Polo Shirt",
        description: "Subtle texture and casual buttoned style.",
        price: 550.00,
        image: "https://i.pinimg.com/474x/57/4a/fb/574afb1662f9e91254cfb99b2c2c78b3.jpg"
    },
    {
        id: 6,
        name: "Vertical Panel Tee",
        description: "Bold vertical stripes and modern look.",
        price: 550.00,
        image: "https://i.pinimg.com/474x/c3/79/6c/c3796cde45e11112a2e70b5f1a5a290b.jpg"
    }
];

// Cart functionality
let cart = [];

// DOM elements
const productGrid = document.querySelector('.product-grid');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.querySelector('.cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total span');
const checkoutBtn = document.querySelector('.checkout-btn');

// Display products
function displayProducts() {
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">₹${product.price.toFixed(2)}</span>  <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;

        productGrid.appendChild(productCard);
    });

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);

    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart modal
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${item.price.toFixed(2)}</div>  </div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <div class="remove-item" data-id="${item.id}">&times;</div>
            `;

            cartItems.appendChild(cartItem);
        });

        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Cart quantity functions
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCart();
}

function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    item.quantity += 1;
    updateCart();
}

function removeItem(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert(`Thank you for your purchase! Total: ₹${cartTotal.textContent}`);  // Changed to ₹
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
}

// Event listeners
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

checkoutBtn.addEventListener('click', checkout);

// Initialize the page
displayProducts();
updateCart();