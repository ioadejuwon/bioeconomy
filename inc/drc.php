<?php
// $user_id = $_SESSION['user_id'];

$footeryear = date("Y");
define('FOOTERYEAR', $footeryear);

define('BRAND_EMAIL', 'hello@bioeconomyconf.com');
define('REPLY_TO', 'bioeconomy@oauife.edu.ng');
define('COMPANY', 'Bioeconomy Conference');


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
define('HOME', BASE_URL .'');
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
// $t = $pagetitle;




// About organization

// This is the start of one of the pages
// <?php
// $pagetitle = 'Abstract';
// include_once 'comp/head.php';

// Then in the head tag, I have this
// <script src="assets/js/jquery.min.js"></script>
// <?php
// include_once("inc/config.php");
// include_once("inc/drc.php");
//  ?
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="author" content="Softnio">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="shortcut icon" href="assets/images/oau.png">
//     <title><?php echo $pagetitle ? - Bioeconomy Conference</title>


// Than in the drc file I have this

// $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://'; // Get the protocol (http or https)
// $host = $_SERVER['HTTP_HOST']; // Get the host (domain name)
// $uri = $_SERVER['REQUEST_URI']; // Get the current request URI
// $current_url = $protocol . $host . $uri; // Combine the protocol, host, and URI to get the full URL
// // echo "Current URL: $current_url"; // Output the current URL
// $t = $pagetitle;

// Then in the 