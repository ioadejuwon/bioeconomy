$(document).ready(function() {
    // Add category to the Database begin
    $('#categoryForm').on('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
        // console.log("You clicked add category button");
        
        var formData = $(this).serialize(); // Serialize the form data

        var $submitButton = $(this).find('button[type="submit"]');
        $submitButton.prop('disabled', true).text('Adding Category'); // Change button text to indicate it's processing

        
        $.ajax({
            type: 'POST',
            url: 'inc/addcategory.php', // The URL to the PHP script that handles the form submission
            data: formData, // Send the serialized form data
            dataType: 'json', // Expect JSON response
            success: function(response) {if (response.status === 'success') {
                showNotification(response.message, 'success');
                // Append new category to the table only if the category was created successfully
                $('#categoryTableBody').append(
                    `<tr>
                        <td class="underline">
                            <a href="`+response.categorylink+`">` + $('input[name="categoryname"]').val() + `</a>
                        </td>
                        <td>0</td>

                        <td class="dropdown">
                            <span class="material-symbols-outlined">more_horiz</span>
                            <div class="dropdown-content">
                                <a data-toggle="modal" data-target="#edit-`+response.categoryid+`">Edit Category</a>
                                <a data-toggle="modal" data-target="#copy-`+response.categoryid+`">Copy Category link</a>
                                <a data-toggle="modal" data-target="#delete-`+response.categoryid+`">Delete</a>
                            </div>
                        </td>
                    </tr>`
                );
                
                setTimeout(function() {
                    $('#error-message').html(`
                            <label class="text-16 lh-1 fw-500 text-dark-1 mb-10">Category Name <span class="text-error-1">*</span> </label>
                            <input type="text" name="categoryname" id="category" placeholder="Enter the name of the category" required>
                            `);
                    }, 3000); // 3000 milliseconds = 3 seconds
                } else if (response.status == 'info'){
                    showNotification(response.message, 'info'); // Yellow notification
                } else if (response.status == 'error'){
                    showNotification(response.message, 'error'); // Red notification
                } else {
                    // setTimeout(function() {
                    //     $('#error-message').html('<input type="text" name="categoryname" id="category" placeholder="Enter the name of the category" required>');
                    // }, 3000); // 3000 milliseconds = 3 seconds
                }
            },
            error: function(xhr, status, error) {
                showNotification('An error occurred: ' + xhr.responseText);
                setTimeout(function() {
                    $('#error-message').html('<input type="text" name="categoryname" id="category" placeholder="Enter the name of the category" required>');
                }, 3000); // 3000 milliseconds = 3 seconds
            },
            complete: function() {
                // Re-enable the submit button after the request is complete
                $submitButton.prop('disabled', false).text('Add Category');
            }
        });
    });
    // Add category to the Database end
    
    // Update category in the Database begin
    $('.updateCategoryForm').on('submit', function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        var $submitButton = $(this).find('button[type="submit"]');
        $submitButton.prop('disabled', true).text('Saving Category'); // Change button text to indicate it's processing
        
        var modal = $(this).closest('.modal');
        var categoryId = new URLSearchParams(formData).get('categoryID');

        $.ajax({
            type: 'POST',
            url: 'inc/updatecategory.php', // Replace with your PHP script path
            data: formData,
            dataType: 'json', // Expect JSON response from server
            success: function (response) {
                var messageHtml;
                
                if (response.success) {
                    showNotification(response.message), 'success';
                    // Find the table row using categoryId and update the category name
                    var categoryRow = $('tr[data-id="' + categoryId + '"]'); // Find the table row to update
                    if (categoryRow.length) {
                        categoryRow.find('td.underline a.category-name').text(response.newCategoryName); // Update the category name link
                    } else {
                    }
                    modal.modal('hide'); // Use Bootstrap method to hide modal
                } else {
                    // Create error message
                    messageHtml = '<div class="bg-red-1 text-white text-center py-10 rounded-8 mb-10">' + response.message + '</div>';
                }
                $('.error-message2').html(messageHtml);// Display the message
                setTimeout(() => {
                    $('.error-message2').html('');// Clear the message after 3 seconds
                }, 3000);
            },
            error: function (xhr, status, error) {
                // Handle AJAX error
                console.error(xhr.responseText);
                $('.error-message2').html('<div class="bg-red-1 text-white text-center py-10 rounded-8 mb-5">An error occurred. Please try again.</div>');
                // Clear the message after 3 seconds
                setTimeout(() => {
                    $('.error-message2').html('');
                }, 3000);
            },
            complete: function() {
                // Re-enable the submit button after the request is complete
                $submitButton.prop('disabled', false).text('Save Category');
            }
        });
    });
    // Update category in the Database end
    
});