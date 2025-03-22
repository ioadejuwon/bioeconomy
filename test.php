<?php
if (function_exists('mail')) {
    echo "PHP mail() function is enabled!";
} else {
    echo "PHP mail() function is disabled on this server.";
}
?>
<?php
$to = "ioadejuwon@gmail.com"; // Replace with your email
$subject = "Test Email from Hostinger";
$message = "This is a test email sent using PHP mail() function.";
$headers = "From: hello@bioeconomyconf.com" . "\r\n" . "Reply-To: hello@bioeconomyconf.com";

if (mail($to, $subject, $message, $headers)) {
    echo "Mail sent successfully!";
} else {
    echo "Mail sending failed. Check server configuration.";
    error_log(print_r(error_get_last(), true)); // Log the error for debugging
}
?>
