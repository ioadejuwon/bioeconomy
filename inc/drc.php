<?php
$user_id = $_SESSION['user_id'];

$footeryear = date("Y");
define('FOOTERYEAR', $footeryear);

define('BRAND_EMAIL', 'hello@bioeconomyconf.com');


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
    define('BASE_URL', 'https://bioeconomyconf.com/');
    define('ADMIN_URL', 'https://admin.bioeconomyconf.com/');
}

// Pages
define('HOME', BASE_URL.'home');
define('REGISTER', BASE_URL.'register');
define('ABSTRACT_PAGE', BASE_URL.'abstract');

define('ABSTRACTS_URL', BASE_URL.'');

define('ADMIN_LOGIN', ADMIN_URL.'login');
define('SIGNUP', ADMIN_URL.'signup');
define('ADMIN_DASHBOARD', ADMIN_URL);
define('ADMIN_PARTICIPANTS', ADMIN_URL.'participants');
define('ADMIN_ABSTRACTS', ADMIN_URL.'abstracts');
define('PARTCIPIPANT_DETS', ADMIN_URL.'participant?id=');

define('ADMIN_LOGOUT', ADMIN_URL.'logout'); // Logout Link

// define('LOGOUT', BASE_URL.'logout?id='.$user_id); // Logout Link

$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://'; // Get the protocol (http or https)
$host = $_SERVER['HTTP_HOST']; // Get the host (domain name)
$uri = $_SERVER['REQUEST_URI']; // Get the current request URI
$current_url = $protocol . $host . $uri; // Combine the protocol, host, and URI to get the full URL
// echo "Current URL: $current_url"; // Output the current URL
$t = $pagetitle;