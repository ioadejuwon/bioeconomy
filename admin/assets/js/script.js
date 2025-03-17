// Sign Up and Login show password
function Pass() {
    var x = document.getElementById("loginPassword");
    var passwordeyeicon = document.getElementById("loginPasswordicon");
    if (x.type === "password") {
        x.type = "text";
        passwordeyeicon.innerHTML = "<i class='fa-regular fa-eye'></i>";
    } else {
        x.type = "password";
        passwordeyeicon.innerHTML = "<i class='fa-regular fa-eye-slash'></i>";
    }
}

function confirmPass() {
    var confirmPassword = document.getElementById("confirmPassword");
    var confirmpasswordeyeicon = document.getElementById("confirmPasswordicon");
    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
        confirmpasswordeyeicon.innerHTML = "<i class='fa-regular fa-eye'></i>";
    } else {
        confirmPassword.type = "password";
        confirmpasswordeyeicon.innerHTML = "<i class='fa-regular fa-eye-slash'></i>";
    }
}





// document.addEventListener('DOMContentLoaded', function() {
//     // console.log('Script loaded.');
  
//     var currentUrl = window.location.href;
//     // console.log('Current URL:', currentUrl);
  
//     var sidebarLinks = document.querySelectorAll('.sidebar__item a');
//     // console.log('Sidebar links:', sidebarLinks);
  
//     sidebarLinks.forEach(function(link) {
//         // console.log('Link HREF:', link.href);
//         if (link.href === currentUrl) {
//             // console.log('Match found:', link.href);
//             link.parentElement.classList.add('-is-active');
//         }
//     });
//   });

document.addEventListener('DOMContentLoaded', function() {
    var currentUrl = window.location.href;
    var currentPathname = new URL(currentUrl).pathname;

    // Extract the base domain and path dynamically
    var baseUrl = new URL(currentUrl).origin; // Gets the protocol + domain
    var basePath = new URL(currentUrl).pathname.replace(/\/[^\/]*$/, '/'); // Extracts the base path

    // console.log('Base URL:', baseUrl);
    // console.log('Base Path:', basePath);
    // console.log('Current Pathname:', currentPathname);

    var sidebarLinks = document.querySelectorAll('.sidebar__item a');
    // console.log('Sidebar links:', sidebarLinks);

    sidebarLinks.forEach(function(link) {
        var linkHref = new URL(link.href).pathname;
        // console.log('Link Href:', linkHref);

        // Ensure base path is removed from paths for comparison
        var relativeLinkHref = linkHref.replace(basePath, '');
        var relativeCurrentPathname = currentPathname.replace(basePath, '');

        // Check if the current path is within the section or matches the link
        if (relativeCurrentPathname === relativeLinkHref || 
            (relativeLinkHref === 'orders' && relativeCurrentPathname.startsWith('order')) || 
            (relativeLinkHref === 'create' && (relativeCurrentPathname.startsWith('image') || relativeCurrentPathname.startsWith('thumbnail'))) ||
            (relativeLinkHref === 'products' && (relativeCurrentPathname.startsWith('edit')))
        ) {
            link.parentElement.classList.add('-is-active');
        }
    });
});











