$(document).ready(function() {
    // Login Form Begin
    $('#loginForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        var $submitButton = $(this).find('button[type="submit"]');
        $submitButton.prop('disabled', true).text('Logging you in'); // Change button text to indicate it's processing
        $.ajax({
            type: 'POST',
            url: 'inc/auth.php', 
            data: $(this).serialize() + '&login=true', // Serialize form data
            dataType: 'json',
            success: function(response) {
                // Clear any previous notifications
                if(response.status === 'success'){
                    // console.log(response);
                    showNotification(response.redirect_url, 'success'); // Show notification
                    window.location.href = response.redirect_url; // Redirect on success
                } else if (response.status == 'info'){
                    showNotification(response.message, 'info'); // Yellow notification
                } else if (response.status == 'error'){
                    showNotification(response.message, 'error'); // Red notification
                } else{
                    showNotification(response.message, 'error');
                }
            },
            error: function(xhr, status, error) {
                showNotification(`An error occurred while processing your request. ${error}`, `error`);
            },
            complete: function() {
                // Re-enable the submit button after the request is complete
                $submitButton.prop('disabled', false).text('Log in');
                // $submitButton.text('You are logged in!');
            }
        });
    });
    // Login Form End
});