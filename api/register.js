$j(document).ready(function() {
    console.log("Register form loaded");

    // Ensure 'Student Proof' is required only when 'Yes' is selected
    $j('select[name="student"]').on("change", function() {
        if ($j(this).val() === "1") {
            $j('input[name="studentproof"]').prop("required", true);
        } else {
            $j('input[name="studentproof"]').prop("required", false);
        }
    });

    // Show selected file name
    $j('input[type="file"]').on("change", function() {
        let fileName = $j(this).val().split("\\").pop();
        if (fileName) {
            $j(this).next('.file-name-display').remove();
            $j(this).after(`<small class="file-name-display text-muted">${fileName}</small>`);
        }
    });

    if ($j("#registerForm").length) {
        $j("#registerForm").on("submit", function(event) {
            event.preventDefault(); // Prevent default form submission

            var formData = new FormData(this); // Use FormData to handle file uploads
            var $submitButton = $j(this).find('button[type="submit"]');

            $submitButton.prop("disabled", true).text("Processing...");

            $j.ajax({
                type: "POST",
                url: "inc/register1.php",
                data: formData, 
                contentType: false, 
                processData: false, 
                dataType: "json",
                success: function(response) {
                    if (response.status === "success") {
                        // showNotification(response.redirect_url, "success");
                        showNotification(response.message, "success");
                        window.location.href = response.redirect_url;
                    } else if (response.status === "info") {
                        showNotification(response.message, "info");
                    } else {
                        showNotification(response.message, "error");
                    }
                },
                error: function(xhr, status, error) {
                    showNotification(`An error occurred while processing your request. ${error}`, "error");
                },
                complete: function() {
                    $submitButton.prop("disabled", false).text("Register");
                }
            });
        });
    } else {
        // console.error("Error: #registerForm not found in DOM!");
    }
});
