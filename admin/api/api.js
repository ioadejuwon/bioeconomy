// Show Notification
function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            container.removeChild(notification);
        }, 500); // Match the transition duration
    }, 3000);
}


// function toggleDarkMode() {
//     const html = document.documentElement;
//     const isDarkMode = !html.classList.contains('-dark-mode');

//     console.log('Toggling dark mode:', isDarkMode);

//     html.classList.toggle('-dark-mode', isDarkMode);
//     localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
// }

// function applyTheme() {
//     const html = document.documentElement;
//     const savedTheme = localStorage.getItem('theme');

//     console.log('Applying theme:', savedTheme);

//     if (savedTheme === 'dark') {
//         html.classList.add('-dark-mode');
//     } else {
//         html.classList.remove('-dark-mode');
//     }
// }

// document.addEventListener('DOMContentLoaded', applyTheme);



function togglefilterDropdown() { // Dashboard filter
    const dropdown = document.getElementById('filterDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function fetchFiltered(timeframe) {
    // Hide the dropdown after a selection
    $('#filterDropdown').hide();
    
    // Update the dropdown button text with the selected timeframe
    $('#dropdownFilter').text(timeframe.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())); // Formats timeframe text
    
    // Retrieve the unique_id from the data attribute
    const uniqueId = $('[data-unique-id]').data('unique-id');
    
    // Send an AJAX request using jQuery
    $.ajax({
        url: 'inc/filterdashboard.php',
        type: 'GET',
        data: {
            filter: timeframe,
            unique_id: uniqueId
        },
        dataType: 'json',
        success: function(response) {
            // Update the store visits
            $('#storeVisits').text(response.storeclickstotal);
            
            // Update the total amount
            $('#totalAmount').text(response.totalAmount);
            
            // Clear existing product table rows
            $('#productstable tbody').empty();
            
            // Check if there are no products
            if (response.products.length === 0) {
                $('#noProductsMessage').remove();
                $('#productstable').append(
                    `<tr class="col-md-12 text-center">
                        <td colspan="4">
                            <div class="py-30 bg-light-4 rounded-8 border-light col-md-12 mt-50 mb-50 move-center">
                                <img src="assets/img/edit/store.png" style="width:20%">
                                <h3 class="px-30 text- fw-500 mt-20 mb-20">
                                    No products found for the specified period.
                                </h3>

                                <div class="col-md-6 col-8 move-center">
                                    <a href="create" class="button -md -deep-green-1 text-white p-0">Add Products</a>
                                </div>
                            </div>
                        </td>
                    </tr>`
                );
            } else {
                $('#noProductsMessage').remove();
                response.products.forEach(function(product) {
                    $('#productstable tbody').append(
                        `<tr>
                            <td class="sm:d-none">
                                <div class="size-50 rounded-8 brand-pic-display" style="background-image: url('${product.image_path_thumbnail}');"></div>
                            </td>
                            <td>${product.ptitle}</td>
                            <td>${product.pprice}</td>
                            <td>${product.orders_count}</td>
                        </tr>`
                    );
                });
            }
            
            // Clear existing link table rows
            $('#linkTable tbody').empty();
            
            // Check if there are no links
            if (response.links.length === 0) {
                $('#noLinksMessage').remove();
                $('#linkTable tbody').append(
                    `<tr class="col-md-12 text-center">
                        <td colspan="4">
                            <div class="py-30 bg-light-4 rounded-8 border-light col-md-12 mt-50 mb-50 move-center">
                                <img src="assets/img/edit/links.png" style="width:20%">
                                <h3 class="px-30 text- fw-500 mt-20 mb-20">
                                    No links found for the specified period.
                                </h3>
                                <div class="col-md-6 col-8 move-center">
                                    <a href="links" class="button -md -deep-green-1 text-white p-0">Add Links</a>
                                </div>
                            </div>
                        </td>
                    </tr>`
                );
            } else {
                $('#noLinksMessage').remove();
                response.links.forEach(function(link) {
                    $('#linkTable tbody').append(
                        `<tr>
                            <td>${link.title}</td>
                            <td class="sm:d-none">${link.randval}</td>
                            <td>${link.total_engagement}</td>
                        </tr>`
                    );
                });
            }
        },
        error: function() {
            console.error('Failed to fetch filtered data');
        }
    });
}



// Function to toggle dropdown visibility
function toggleDropdown() {
    var dropdownContent = document.getElementById("categoryDropdown");
    if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
        dropdownContent.style.display = "block";
    } else {
        dropdownContent.style.display = "none";
    }
}


function fetchFilteredProducts(categoryId) {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "inc/filter_products.php", true); // Adjust the URL to your PHP file that handles filtering
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Update the page content with the response
            document.querySelector(".row.y-gap-30.pt-30").innerHTML = xhr.responseText;
        }
    };
    
    xhr.send("category_id=" + categoryId);
    toggleDropdown();
}


