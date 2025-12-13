$(document).ready(function() {
    // Mock history data
    const historyData = [
        {
            id: 1,
            no: 1,
            name: "james supot",
            office: "ITO",
            date: "9-10-2025",
            status: "Pending"
        },
        {
            id: 2,
            no: 2,
            name: "james supot",
            office: "ITO",
            date: "9-10-2025",
            status: "Pending"
        },
        {
            id: 3,
            no: 3,
            name: "james supot",
            office: "ITO",
            date: "9-10-2025",
            status: "Rejected"
        },
        {
            id: 4,
            no: 4,
            name: "james supot",
            office: "ITO",
            date: "9-10-2025",
            status: "Accepted"
        }
    ];

    let filteredData = [...historyData];

    // Function to get status class
    function getStatusClass(status) {
        const statusLower = status.toLowerCase();
        if (statusLower === 'pending') {
            return 'status-pending';
        } else if (statusLower === 'rejected') {
            return 'status-rejected';
        } else if (statusLower === 'accepted') {
            return 'status-accepted';
        }
        return '';
    }

    // Function to render history table
    function renderHistory() {
        const tbody = $('#history-tbody');
        tbody.empty();

        if (filteredData.length === 0) {
            tbody.html('<tr><td colspan="6" class="text-center text-gray-500 py-8">No history found</td></tr>');
            return;
        }

        filteredData.forEach(item => {
            const statusClass = getStatusClass(item.status);
            const row = `
                <tr>
                    <td>${item.no}</td>
                    <td>${item.name}</td>
                    <td>${item.office}</td>
                    <td>${item.date}</td>
                    <td>
                        <span class="status-badge ${statusClass}">${item.status}</span>
                    </td>
                    <td>
                        <button class="view-details-btn" data-id="${item.id}">
                            View Details
                        </button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    // User data (will be loaded from data source later)
    const userData = {
        name: "Maricar T. Tulep",
        title: "Administrative Officer IV"
    };

    // Update user profile
    $('#user-name').text(userData.name);
    $('#user-title').text(userData.title);

    // Sort by handler
    $('#sort-by').on('change', function() {
        const sortValue = $(this).val();
        
        if (sortValue === 'all') {
            filteredData = [...historyData];
        } else {
            filteredData = historyData.filter(item => 
                item.status.toLowerCase() === sortValue.toLowerCase()
            );
        }
        
        renderHistory();
    });

    // Mock request details data
    const requestDetailsData = {
        1: {
            risNumber: "",
            centerCode: "",
            fundCluster: "",
            division: "SDOIN",
            name: "james supot",
            office: "ITO",
            designation: "OJT",
            purpose: "TESTING",
            date: "9-10-2025",
            status: "Pending",
            items: [
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 },
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 },
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 },
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 }
            ]
        },
        2: {
            risNumber: "",
            centerCode: "",
            fundCluster: "",
            division: "SDOIN",
            name: "james supot",
            office: "ITO",
            designation: "OJT",
            purpose: "TESTING",
            date: "9-10-2025",
            status: "Pending",
            items: [
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 },
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 },
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 },
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 }
            ]
        },
        3: {
            risNumber: "",
            centerCode: "",
            fundCluster: "",
            division: "SDOIN",
            name: "james supot",
            office: "ITO",
            designation: "OJT",
            purpose: "TESTING",
            date: "9-10-2025",
            status: "Rejected",
            items: [
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 },
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 },
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 },
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 }
            ]
        },
        4: {
            risNumber: "",
            centerCode: "",
            fundCluster: "",
            division: "SDOIN",
            name: "james supot",
            office: "ITO",
            designation: "OJT",
            purpose: "TESTING",
            date: "9-10-2025",
            status: "Accepted",
            items: [
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 },
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 },
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 },
                { image: "../assets/A4Image.jpg", description: "PAPER, MULTICOPY, A4", unit: "REAM", quantity: 5 }
            ]
        }
    };

    // Function to open details modal
    function openDetailsModal(requestId) {
        const details = requestDetailsData[requestId];
        if (!details) return;

        // Update status
        $('#details-status').text(details.status);
        $('#details-status').removeClass('status-pending status-rejected status-accepted');
        $('#details-status').addClass(getStatusClass(details.status));

        // Update input fields
        $('#ris-number').val(details.risNumber);
        $('#center-code').val(details.centerCode);
        $('#fund-cluster').val(details.fundCluster);

        // Update requestor information
        $('#details-division').text(details.division);
        $('#details-name').text(details.name);
        $('#details-office').text(details.office);
        $('#details-designation').text(details.designation);
        $('#details-purpose').text(details.purpose);
        $('#details-date').text(details.date);

        // Render items
        renderDetailsItems(details.items);

        // Show modal
        $('#details-modal').removeClass('hidden');
    }

    // Function to close details modal
    function closeDetailsModal() {
        $('#details-modal').addClass('hidden');
    }

    // Function to render items in details table
    function renderDetailsItems(items) {
        const tbody = $('#details-items-tbody');
        tbody.empty();

        items.forEach(item => {
            const row = `
                <tr>
                    <td>
                        <img src="${item.image}" alt="${item.description}" class="details-item-image">
                    </td>
                    <td>
                        <div class="details-item-description">${item.description}</div>
                    </td>
                    <td>
                        <div class="details-item-unit">${item.unit}</div>
                    </td>
                    <td>
                        <div class="details-item-quantity">${item.quantity}</div>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    // View Details button handler
    $(document).on('click', '.view-details-btn', function() {
        const id = $(this).data('id');
        openDetailsModal(id);
    });

    // Close modal handlers
    $('#close-details-modal').on('click', function() {
        closeDetailsModal();
    });

    // Close modal when clicking overlay
    $('#details-modal').on('click', function(e) {
        if ($(e.target).hasClass('modal-overlay')) {
            closeDetailsModal();
        }
    });

    // Download file button handler
    $('#download-file-btn').on('click', function() {
        console.log('Download file clicked');
        // Backend functionality will be added later
        alert('Download functionality will be implemented later');
    });

    // Initialize page
    renderHistory();
});

