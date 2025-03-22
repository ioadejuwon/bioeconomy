<?php
require 'send.php';

if (function_exists('mail')) {
    echo "PHP mail() function is enabled!";
} else {
    echo "PHP mail() function is disabled on this server.";
}


$to = "ioadejuwon@gmail.com"; // Replace with your email
$subject = "Test Email from Hostinger";

// if (mail($to, $subject, $message, $headers)) {
//     echo "Mail sent successfully!";
// } else {
//     echo "Mail sending failed. Check server configuration.";
//     error_log(print_r(error_get_last(), true)); // Log the error for debugging
// }
// ?>

// <?php


$response = [];
$emailSent = sendConfirmationEmail($to, 'John Doe', $response);

if ($emailSent) {
    echo "Email sent successfully!";
} else {
    echo "Email failed: " . $response['message'];
}
?>

