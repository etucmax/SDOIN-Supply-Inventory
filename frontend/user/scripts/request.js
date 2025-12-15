$(document).ready(function() {
    // Get cart items from localStorage (passed from items page)
    let requestItems = [];

    // Load cart items from localStorage
    function loadCartItems() {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            requestItems = JSON.parse(savedCart);
            renderRequestItems();
        } else {
            // If no cart items, show empty state
            requestItems = [];
            renderRequestItems();
        }
    }

    // Function to render request items in table
    function renderRequestItems() {
        const tbody = $('#request-items-tbody');
        tbody.empty();

        if (requestItems.length === 0) {
            tbody.html('<tr><td colspan="4" class="text-center text-gray-500 py-8">No items requested</td></tr>');
            return;
        }

        requestItems.forEach((item, index) => {
            const row = `
                <tr>
                    <td>
                        <img src="${item.image}" alt="${item.name}" class="request-item-image">
                    </td>
                    <td>
                        <div class="request-item-description">${item.name}</div>
                    </td>
                    <td>
                        <div class="request-item-unit">REAM</div>
                    </td>
                    <td>
                        <div class="request-item-actions">
                            <div class="request-quantity-controls">
                                <button class="request-quantity-btn request-quantity-minus" data-index="${index}">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" class="request-quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                                <button class="request-quantity-btn request-quantity-plus" data-index="${index}">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <button class="request-delete-btn" data-index="${index}">
                                <i class="fas fa-trash"></i>
                                DEL
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    // User data (will be loaded from data source later)
    const userData = {
        name: "James Supot",
        title: "Administrative Officer IV"
    };

    // Update user profile
    $('#user-name').text(userData.name);
    $('#user-title').text(userData.title);

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    $('#date-requested').val(today);

    // Set default name from user data
    $('#requester-name').val(userData.name);
    $('#designation').val(userData.title);

    // Quantity controls
    $(document).on('click', '.request-quantity-plus', function() {
        const index = $(this).data('index');
        requestItems[index].quantity += 1;
        renderRequestItems();
        saveCartItems();
    });

    $(document).on('click', '.request-quantity-minus', function() {
        const index = $(this).data('index');
        if (requestItems[index].quantity > 1) {
            requestItems[index].quantity -= 1;
            renderRequestItems();
            saveCartItems();
        }
    });

    $(document).on('change', '.request-quantity-input', function() {
        const index = $(this).data('index');
        const newQuantity = parseInt($(this).val()) || 1;
        if (newQuantity > 0) {
            requestItems[index].quantity = newQuantity;
            saveCartItems();
        }
    });

    // Delete item
    $(document).on('click', '.request-delete-btn', function() {
        const index = $(this).data('index');
        if (confirm('Are you sure you want to remove this item?')) {
            requestItems.splice(index, 1);
            renderRequestItems();
            saveCartItems();
            
            // If no items left, redirect to items page
            if (requestItems.length === 0) {
                window.location.href = 'items.html';
            }
        }
    });

    // Save cart items to localStorage
    function saveCartItems() {
        localStorage.setItem('cartItems', JSON.stringify(requestItems));
    }

    // Function to show confirmation modal
    function showConfirmModal() {
        $('#confirm-modal').removeClass('hidden');
    }

    // Function to hide confirmation modal
    function hideConfirmModal() {
        $('#confirm-modal').addClass('hidden');
    }

    // Function to submit request
    function submitRequest() {
        // Prepare request data
        const requestData = {
            division: $('#division').val(),
            office: $('#office').val(),
            requesterName: $('#requester-name').val(),
            designation: $('#designation').val(),
            dateRequested: $('#date-requested').val(),
            purpose: $('#purpose').val(),
            items: requestItems
        };

        console.log('Request submitted:', requestData);
        // Backend functionality will be added later
        
        // Clear cart and redirect
        localStorage.removeItem('cartItems');
        hideConfirmModal();
        alert('Request submitted successfully!');
        // window.location.href = 'items.html';
    }

    // Submit button handler
    $('#submit-request-btn').on('click', function() {
        // Validate form
        const office = $('#office').val();
        const requesterName = $('#requester-name').val();
        const designation = $('#designation').val();
        const dateRequested = $('#date-requested').val();
        const purpose = $('#purpose').val();

        if (!requesterName || !designation || !dateRequested || !purpose) {
            alert('Please fill in all required fields.');
            return;
        }

        if (requestItems.length === 0) {
            alert('Please add at least one item to the request.');
            return;
        }

        // Show confirmation modal
        showConfirmModal();
    });

    // Confirmation modal handlers
    $('#cancel-confirm').on('click', function() {
        hideConfirmModal();
    });

    $('#ok-confirm').on('click', function() {
        submitRequest();
    });

    // Close modal when clicking overlay
    $('#confirm-modal').on('click', function(e) {
        if ($(e.target).hasClass('modal-overlay')) {
            hideConfirmModal();
        }
    });

    // Initialize page
    loadCartItems();
});

