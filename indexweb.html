const menuItems = [
    {
        id: 1,
        name: "Борщ Домашний",
        category: "soup",
        price: 900,
        calories: 250,
        image: "https://images.unsplash.com/photo-1547592166-23acbe3a624b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Традиционный свекольный суп со сметаной и зеленью."
    },
    {
        id: 2,
        name: "Котлета по-киевски",
        category: "main",
        price: 1200,
        calories: 550,
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Сочная куриная грудка с маслом и зеленью внутри."
    },
    {
        id: 3,
        name: "Салат Цезарь",
        category: "salad",
        price: 1050,
        calories: 320,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Классический рецепт с курицей, сухариками и пармезаном."
    },
    {
        id: 4,
        name: "Пюре с гуляшом",
        category: "main",
        price: 1100,
        calories: 450,
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Нежное картофельное пюре с мясной подливой."
    },
    {
        id: 5,
        name: "Солянка",
        category: "soup",
        price: 950,
        calories: 280,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Наваристый суп с несколькими видами мяса и лимоном."
    },
    {
        id: 6,
        name: "Греческий Салат",
        category: "salad",
        price: 900,
        calories: 200,
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Свежие овощи, сыр фета, оливки и оливковое масло."
    },
    {
        id: 7,
        name: "Морс Клюквенный",
        category: "drink",
        price: 300,
        calories: 80,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Домашний витаминный напиток из свежих ягод."
    },
    {
        id: 8,
        name: "Чизкейк Нью-Йорк",
        category: "dessert",
        price: 750,
        calories: 350,
        image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Нежный творожный десерт с ванильным вкусом."
    }
];

let cart = [];

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('search-input');

// Initialize
function init() {
    renderMenu('all');
    updateCartUI();
}

// Render Menu
function renderMenu(category, searchTerm = '') {
    menuGrid.innerHTML = '';

    let filteredItems = menuItems;

    if (category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === category);
    }

    if (searchTerm) {
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (filteredItems.length === 0) {
        menuGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">Ничего не найдено 😔</div>';
        return;
    }

    filteredItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'menu-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-img">
            <div class="item-details">
                <div class="item-header">
                    <h3 class="item-title">${item.name}</h3>
                    <span class="item-price">${item.price} ₸</span>
                </div>
                <p class="item-desc">${item.description}</p>
                <div class="item-footer">
                    <span class="item-cals">🔥 ${item.calories} ккал</span>
                    <button class="add-btn" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i> В корзину
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(itemEl);
    });
}

// Add to Cart
window.addToCart = function (id) {
    const item = menuItems.find(i => i.id === id);
    const existingItem = cart.find(i => i.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
    showNotification(`"${item.name}" добавлен в корзину`);
};

// Remove from Cart
window.removeFromCart = function (id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
};

// Change Quantity
window.changeQuantity = function (id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartUI();
        }
    }
};

// Update Cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Корзина пуста 😔</div>';
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price} ₸ x ${item.quantity}</div>
                </div>
                <div class="cart-controls">
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    cartTotalEl.textContent = total;
    cartCountEl.textContent = count;
}

// Notifications
function showNotification(message) {
    const container = document.getElementById('notification-container');
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;

    container.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'slideIn 0.3s reverse';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Event Listeners
cartBtn.addEventListener('click', () => cartModal.classList.add('open'));
closeCartBtn.addEventListener('click', () => cartModal.classList.remove('open'));
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.classList.remove('open');
});

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMenu(btn.dataset.category, searchInput.value);
    });
});

searchInput.addEventListener('input', (e) => {
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    renderMenu(activeCategory, e.target.value);
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Спасибо за заказ! Ожидайте готовности.');
        cart = [];
        updateCartUI();
        cartModal.classList.remove('open');
    }
});

// Start
init();

