$(document).ready(function() {
    // Tab switching functionality
    $('#offices-tab').on('click', function() {
        // Update tab appearance
        $('#offices-tab').addClass('border-b-4 border-blue-600 text-blue-700').removeClass('text-blue-900 text-opacity-70');
        $('#admin-tab').removeClass('border-b-4 border-blue-600 text-blue-700').addClass('text-blue-900 text-opacity-70');
        
        // Show offices form, hide admin form
        $('#offices-form').removeClass('hidden');
        $('#admin-form').addClass('hidden');
    });

    $('#admin-tab').on('click', function() {
        // Update tab appearance
        $('#admin-tab').addClass('border-b-4 border-blue-600 text-blue-700').removeClass('text-blue-900 text-opacity-70');
        $('#offices-tab').removeClass('border-b-4 border-blue-600 text-blue-700').addClass('text-blue-900 text-opacity-70');
        
        // Show admin form, hide offices form
        $('#admin-form').removeClass('hidden');
        $('#offices-form').addClass('hidden');
    });

    // Form submission handlers (no functionality yet)
    $('#offices-form').on('submit', function(e) {
        e.preventDefault();
        // Backend functionality will be added later
        console.log('Offices form submitted');
    });

    $('#admin-form').on('submit', function(e) {
        e.preventDefault();
        // Backend functionality will be added later
        console.log('Admin form submitted');
    });
});

