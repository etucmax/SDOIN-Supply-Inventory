$(document).ready(function() {
    // Mock item data - 8 items
    const items = [
        {
            id: 1,
            name: "Paper, Multicopy, A4",
            image: "../assets/A4Image.jpg",
            available: true
        },
        {
            id: 2,
            name: "Paper, Multicopy, A4",
            image: "../assets/A4Image.jpg",
            available: false
        },
        {
            id: 3,
            name: "Paper, Multicopy, A4",
            image: "../assets/A4Image.jpg",
            available: true
        },
        {
            id: 4,
            name: "Paper, Multicopy, A4",
            image: "../assets/A4Image.jpg",
            available: true
        },
        {
            id: 5,
            name: "Paper, Multicopy, A4",
            image: "../assets/A4Image.jpg",
            available: false
        },
        {
            id: 6,
            name: "Paper, Multicopy, A4",
            image: "../assets/A4Image.jpg",
            available: true
        },
        {
            id: 7,
            name: "Paper, Multicopy, A4",
            image: "../assets/A4Image.jpg",
            available: true
        },
        {
            id: 8,
            name: "Paper, Multicopy, A4",
            image: "../assets/A4Image.jpg",
            available: false
        }
    ];

    // Mock product data for modal
    const productData = {
        name: "PAPER, MULTICOPY, A4",
        itemCode: "14111507-PP-M01",
        uom: "REAM",
        category: "Paper Products",
        status: "AVAILABLE",
        stocks: "21,926",
        image: "../assets/A4Image.jpg",
        available: true
    };

    // Function to render items
    function renderItems() {
        const grid = $('#items-grid');
        grid.empty();

        items.forEach(item => {
            const availabilityClass = item.available ? 'available' : 'unavailable';
            const availabilityText = item.available ? 'Available' : 'Unavailable';

            const itemCard = `
                <div class="item-card" data-item-id="${item.id}">
                    <div class="item-banner ${availabilityClass}">
                        ${availabilityText}
                    </div>
                    <div class="item-image-container">
                        <img src="${item.image}" alt="${item.name}" class="item-image">
                    </div>
                    <div class="item-name">
                        ${item.name}
                    </div>
                </div>
            `;

            grid.append(itemCard);
        });
    }

    // Function to open modal with product data
    function openProductModal(productData) {
        $('#modal-product-image').attr('src', productData.image);
        $('#modal-product-name').text(productData.name);
        $('#modal-item-code').text(productData.itemCode);
        $('#modal-uom').text(productData.uom);
        $('#modal-category').text(productData.category);
        $('#modal-status').text(productData.status);
        $('#modal-stocks').text(productData.stocks);
        
        // Update status class
        if (productData.available) {
            $('#modal-status').removeClass('status-unavailable').addClass('status-available');
        } else {
            $('#modal-status').removeClass('status-available').addClass('status-unavailable');
        }
        
        $('#product-modal').removeClass('hidden');
    }

    // Function to close modal
    function closeProductModal() {
        $('#product-modal').addClass('hidden');
    }

    // Cart data - declare early so it's available for all functions
    let cartItems = [];

    // Function to update cart badge
    function updateCartBadge() {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const badge = $('#cart-badge');
        
        if (totalItems > 0) {
            badge.text(totalItems);
            badge.removeClass('hidden');
        } else {
            badge.addClass('hidden');
        }
    }

    // Function to load cart from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            try {
                cartItems = JSON.parse(savedCart);
                updateCartBadge();
            } catch (e) {
                console.error('Error loading cart:', e);
                cartItems = [];
            }
        }
    }

    // Function to save cart to localStorage
    function saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartBadge();
    }

    // Function to open cart modal
    function openCartModal() {
        renderCartItems();
        $('#cart-modal').removeClass('hidden');
    }

    // Function to close cart modal
    function closeCartModal() {
        $('#cart-modal').addClass('hidden');
    }

    // Function to render cart items
    function renderCartItems() {
        const cartList = $('#cart-items-list');
        cartList.empty();

        if (cartItems.length === 0) {
            cartList.html('<div class="text-center text-gray-500 py-8">Your cart is empty</div>');
            return;
        }

        cartItems.forEach((item, index) => {
            const cartItem = `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-name">${item.name}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="cart-quantity-controls">
                            <button class="cart-quantity-btn cart-quantity-minus" data-index="${index}">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                            <button class="cart-quantity-btn cart-quantity-plus" data-index="${index}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="cart-delete-btn" data-index="${index}">
                            <i class="fas fa-trash"></i>
                            DEL
                        </button>
                    </div>
                </div>
            `;
            cartList.append(cartItem);
        });
    }

    // Initialize items display
    renderItems();
    
    // Load cart and update badge
    loadCart();
    
    // Cart icon click handler
    $('#cart-icon-btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (cartItems.length > 0) {
            openCartModal();
        } else {
            alert('Your cart is empty. Please add items to your cart first.');
        }
    });

    // User data will be loaded from data source later
    // For now, using mock data
    const userData = {
        name: "Maricar T. Tulep",
        title: "Administrative Officer IV"
    };

    // Update user profile (this will be replaced with actual data source later)
    $('#user-name').text(userData.name);
    $('#user-title').text(userData.title);

    // Item card click handler
    $(document).on('click', '.item-card', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openProductModal(productData);
    });

    // Close modal handlers
    $('#close-modal').on('click', function() {
        closeProductModal();
    });

    // Close modal when clicking overlay
    $('#product-modal').on('click', function(e) {
        if ($(e.target).hasClass('modal-overlay')) {
            closeProductModal();
        }
    });

    // Quantity controls
    $(document).on('click', '.quantity-plus', function() {
        const currentVal = parseInt($('#quantity-input').val()) || 1;
        $('#quantity-input').val(currentVal + 1);
    });

    $(document).on('click', '.quantity-minus', function() {
        const currentVal = parseInt($('#quantity-input').val()) || 1;
        if (currentVal > 1) {
            $('#quantity-input').val(currentVal - 1);
        }
    });

    // Add to cart button
    $(document).on('click', '.add-to-cart-btn', function() {
        const quantity = parseInt($('#quantity-input').val()) || 1;
        const itemData = {
            id: productData.itemCode,
            name: productData.name,
            image: productData.image,
            quantity: quantity
        };
        
        // Check if item already exists in cart
        const existingItemIndex = cartItems.findIndex(item => item.id === itemData.id);
        if (existingItemIndex >= 0) {
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            cartItems.push(itemData);
        }
        
        saveCart();
        
        // Hide product modal and show cart modal
        closeProductModal();
        openCartModal();
    });

    // Close cart modal handlers
    $('#close-cart-modal').on('click', function() {
        closeCartModal();
    });

    // Close cart modal when clicking overlay
    $('#cart-modal').on('click', function(e) {
        if ($(e.target).hasClass('modal-overlay')) {
            closeCartModal();
        }
    });

    // Cart quantity controls
    $(document).on('click', '.cart-quantity-plus', function() {
        const index = $(this).data('index');
        cartItems[index].quantity += 1;
        saveCart();
        renderCartItems();
    });

    $(document).on('click', '.cart-quantity-minus', function() {
        const index = $(this).data('index');
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
            saveCart();
            renderCartItems();
        }
    });

    $(document).on('change', '.cart-quantity-input', function() {
        const index = $(this).data('index');
        const newQuantity = parseInt($(this).val()) || 1;
        if (newQuantity > 0) {
            cartItems[index].quantity = newQuantity;
            saveCart();
            renderCartItems();
        }
    });

    // Delete cart item
    $(document).on('click', '.cart-delete-btn', function() {
        const index = $(this).data('index');
        cartItems.splice(index, 1);
        saveCart();
        renderCartItems();
    });

    // Cancel order button
    $('.cancel-order-btn').on('click', function() {
        if (confirm('Are you sure you want to cancel this order?')) {
            cartItems = [];
            saveCart();
            closeCartModal();
        }
    });

    // Proceed button - navigate to request page
    $('.proceed-btn').on('click', function() {
        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items to proceed.');
            return;
        }
        
        // Save cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Navigate to request page
        window.location.href = 'request.html';
    });
});

