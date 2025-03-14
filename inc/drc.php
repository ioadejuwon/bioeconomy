<?php
$user_id = $_SESSION['user_id'];

$footeryear = date("Y");
define('FOOTERYEAR', $footeryear);

define('NAIRA', '₦');
define('DOLLAR', '$');
define('EURO', '€');

// Check if the site is running locally or on a hosting site
if ($_SERVER['HTTP_HOST'] == 'localhost:8888') {
    // Local environment
    define('BASE_URL', 'http://localhost:8888/bioeconomy/');
    define('ADMIN_URL', 'http://localhost:8888/bioeconomy/admin/');
}elseif ($_SERVER['HTTP_HOST'] == 'oreoluwas-macbook-pro.local:8888') {
    // Local environment
    define('BASE_URL', 'http://oreoluwas-macbook-pro.local:8888/bioeconomy/');
    define('ADMIN_URL', 'http://oreoluwas-macbook-pro.local:8888/bioeconomy/admin/');
} else {
    // Hosting environment
    define('BASE_URL', 'https://bioeconomyconf.com');
    define('ADMIN_URL', 'https://admin.bioeconomyconf.com');
}

// Pages
define('HOME', BASE_URL.'home');
define('REGISTER', BASE_URL.'register');
define('ABSTRACT_PAGE', BASE_URL.'abstract');





define('ADMIN_LOGIN', ADMIN_URL.'login');
define('SIGNUP', ADMIN_URL.'signup');
define('DASHBOARD', ADMIN_URL);
define('ADD_PRODUCT', ADMIN_URL.'create');
define('CATEGORIES', ADMIN_URL.'categories');
define('PRODUCTS', ADMIN_URL.'products');
define('REVIEWS', ADMIN_URL.'reviews');
define('ORDERS', ADMIN_URL.'orders');
define('COUPON', ADMIN_URL.'coupon');
define('PROFILE', ADMIN_URL.'profile');
define('SETTINGS', ADMIN_URL.'settings');
define('ADD_IMAGE', ADMIN_URL.'image');
define('EDIT_PRODUCT', ADMIN_URL.'edit');
define('DELETE_PRODUCT', ADMIN_URL.'../api/delete');
define('EDIT_THUMBNAIL', ADMIN_URL.'editthumbnail');
define('EDIT_IMAGES', ADMIN_URL.'editimages');
define('ORDER_DETAILS', ADMIN_URL.'order?o=');


define('ADMIN_LOGOUT', ADMIN_URL.'logout'); // Logout Link

// define('LOGOUT', BASE_URL.'logout?id='.$user_id); // Logout Link




$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://'; // Get the protocol (http or https)
$host = $_SERVER['HTTP_HOST']; // Get the host (domain name)
$uri = $_SERVER['REQUEST_URI']; // Get the current request URI
$current_url = $protocol . $host . $uri; // Combine the protocol, host, and URI to get the full URL
// echo "Current URL: $current_url"; // Output the current URL
$t = $pagetitle;

