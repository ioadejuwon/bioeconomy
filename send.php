<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Load PHPMailer
require 'inc/drc.php'; // Load DRC
require 'inc/env.php'; // Load DRC

// function sendConfirmationEmail($email, $fname, &$response) {
//     $mail = new PHPMailer(true);

//     try {
//         // SMTP Configuration
//         $mail->isSMTP();
//         $mail->Host       = 'smtp.hostinger.com'; // Replace with your SMTP server
//         $mail->SMTPAuth   = true;
//         $mail->Username   = 'hello@bioeconomyconf.com'; // SMTP email
//         $mail->Password   = 'N6a@d8?DSm'; // SMTP password
//         $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
//         $mail->Port       = 587; // 465 for SSL, 587 for TLS

//         // Sender & Recipient
//         $mail->setFrom('hello@bioeconomyconf.com', 'Bioeconomy Conference'); // Must match your SMTP Username
//         $mail->addAddress($email, $fname);
//         $mail->addReplyTo('hello@bioeconomyconf.com', 'Bioeconomy Conference');

//         // Email Content
//         $mail->isHTML(true);
//         $mail->Subject = 'Registration Successful 📮';
//         $mail->Body    = "<p>Hi <b>{$fname}</b>,<br>Welcome to our event! 🎉</p>";

//         // Send email
//         $mail->send();
//         return true;
//     } catch (Exception $e) {
//         $response['email_error'] = "Mail error: " . $mail->ErrorInfo;
//         return false;
//     }
// }




function sendEmail($to, $toName, $subject, $htmlFile, &$response, $placeholders = [], $from = BRAND_EMAIL, $fromName = BRAND_EMAIL, $replyTo = null, $cc = [], $bcc = [], $attachments = []) {
    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com'; // Replace with your SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = BRAND_EMAIL; // Must match `setFrom`
        $mail->Password   = EMAIL_PASSWORD; // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
        $mail->Port       = 587; // 465 for SSL, 587 for TLS

        // Sender & Recipient
        $mail->setFrom($from, $fromName);
        $mail->addAddress($to, $toName);

        // Optional Reply-To
        if ($replyTo) {
            $mail->addReplyTo($replyTo);
        }

        // Optional CC & BCC
        foreach ($cc as $email) {
            $mail->addCC($email);
        }
        foreach ($bcc as $email) {
            $mail->addBCC($email);
        }

        // Optional Attachments
        foreach ($attachments as $filePath) {
            $mail->addAttachment($filePath);
        }

        // Load email content from HTML file
        if (!file_exists($htmlFile)) {
            throw new Exception("Email template file not found: $htmlFile");
        }

        $message = file_get_contents($htmlFile);

        // Replace placeholders in the HTML content
        foreach ($placeholders as $key => $value) {
            $message = str_replace("{{{$key}}}", $value, $message);
        }

        // Email Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        // Send email
        $mail->send();
        return true;
    } catch (Exception $e) {
        $response['email_error'] = "Mail error: " . $mail->ErrorInfo;
        return false;
    }
}
?>

?>
