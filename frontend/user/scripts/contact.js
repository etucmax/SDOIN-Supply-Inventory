$(document).ready(function() {
    // User data (will be loaded from data source later)
    const userData = {
        name: "Maricar T. Tulep",
        title: "Administrative Officer IV"
    };

    // Update user profile
    $('#user-name').text(userData.name);
    $('#user-title').text(userData.title);

    // Submit button handler
    $('#contact-submit-btn').on('click', function() {
        // Get form values
        const name = $('#contact-name').val().trim();
        const office = $('#contact-office').val();
        const feedback = $('#contact-feedback').val().trim();

        // Validate form
        if (!name) {
            alert('Please enter your name.');
            $('#contact-name').focus();
            return;
        }

        if (!feedback) {
            alert('Please enter your feedback.');
            $('#contact-feedback').focus();
            return;
        }

        // Prepare contact data
        const contactData = {
            name: name,
            office: office,
            feedback: feedback,
            date: new Date().toISOString()
        };

        console.log('Contact form submitted:', contactData);
        // Backend functionality will be added later

        // Show success message
        alert('Thank you for your feedback! We will get back to you soon.');

        // Reset form
        $('#contact-name').val('');
        $('#contact-office').val('ITO');
        $('#contact-feedback').val('');
    });
});

