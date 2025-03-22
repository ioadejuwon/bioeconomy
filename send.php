<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Load PHPMailer

function sendConfirmationEmail($email, $fname, &$response) {
    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com'; // Replace with your SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'hello@bioeconomyconf.com'; // SMTP email
        $mail->Password   = 'N6a@d8?DSm'; // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
        $mail->Port       = 587; // 465 for SSL, 587 for TLS

        // Sender & Recipient
        $mail->setFrom('hello@bioeconomyconf.com', 'Bioeconomy Conference'); // Must match your SMTP Username
        $mail->addAddress($email, $fname);
        $mail->addReplyTo('hello@bioeconomyconf.com', 'Bioeconomy Conference');

        // Email Content
        $mail->isHTML(true);
        $mail->Subject = 'Registration Successful 📮';
        $mail->Body    = "<p>Hi <b>{$fname}</b>,<br>Welcome to our event! 🎉</p>";

        // Send email
        $mail->send();
        return true;
    } catch (Exception $e) {
        $response['email_error'] = "Mail error: " . $mail->ErrorInfo;
        return false;
    }
}
?>
