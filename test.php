<?php
require 'send.php';
require 'inc/drc.php'; // Load DRC  

// if (function_exists('mail')) {
//     echo "PHP mail() function is enabled!";
// } else {
//     echo "PHP mail() function is disabled on this server.";
// }

$fname = 'Isaac';
$to = "ioadejuwon@gmail.com"; // Replace with your email
$subject = "Registration Successfull 🎉";
$replyTo = BRAND_EMAIL;

// if (mail($to, $subject, $message, $headers)) {
//     echo "Mail sent successfully!";
// } else {
//     echo "Mail sending failed. Check server configuration.";
//     error_log(print_r(error_get_last(), true)); // Log the error for debugging
// }




$response = [];
$emailSent = sendEmail(
    $to,
    $fname,
    $subject,
    'email/registration.html', // Path to the email template
    $response,
    [
        'FIRST_NAME' => $fname,
        'YEAR' => FOOTERYEAR
    ]
);

if ($emailSent) {
    echo "Registration email sent!";
} else {
    echo "Email failed: " . ($response['email_error'] ?? 'Unknown error');
}
