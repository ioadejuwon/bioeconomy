<?php
set_time_limit(60);
include_once "config.php";
include_once "drc.php";
include_once "randno.php";
require '../send.php';
session_start();

$response = ['status' => 'error', 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Trim and sanitize inputs
    $email = trim($_POST['email']);
    $fname = trim($_POST['fname']);
    $lname = trim($_POST['lname']);
    $fullname = $fname . ' ' . $lname;
    $phone = trim($_POST['phone']);
    $fee = trim($_POST['fee']);
    $student = trim($_POST['student']);
    $address = trim($_POST['address']);

    // Validate required fields
    if (empty($fname) || empty($lname)) {
        $response['message'] = 'Please fill in your name.';
    } elseif (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Please enter a valid email address.';
    } elseif (empty($phone)) {
        $response['message'] = 'Please fill in your phone number.';
    } elseif (empty($fee)) {
        $response['message'] = 'Please indicate the fee you paid.';
    } else {
        // Check if email already exists
        $sql = "SELECT email FROM bio_participants WHERE email = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);

        if (mysqli_stmt_num_rows($stmt) > 0) {
            $response['status'] = 'info';
            $response['message'] = 'Looks like you registered for the event already.';
        } else {
            mysqli_stmt_close($stmt);

            // Handle file uploads
            $studentproof = uploadFile($_FILES['studentproof'], 'student_', $file_id, $response);
            $proof = uploadFile($_FILES['proof'], 'Proof_', $file_id, $response);

            if (!$studentproof) {
                $response['message'] = 'Student proof upload failed. Check file type and size.';
                exit;
            } elseif (!$proof) {
                $response['message'] = 'Payment proof upload failed. Check file type and size.';
                exit;
            } else {


                // Insert user into database
                // if (insertUser($conn, $user_id, $fname, $lname, $email, $phone, $fee, $student, $studentproof, $proof, $address)) {
                //     $_SESSION['user_id'] = $user_id;
                //     $response['status'] = 'success';
                //     $response['message'] = sendConfirmationEmail($email, $fname, $response) ?
                //         'Registration successful. Confirmation email sent.' :
                //         'Registration successful, but email could not be sent.';
                //     // $response['redirect_url'] = BASE_URL;
                // } else {
                //     $response['message'] = 'There was an error registering the user.';
                // }

                // if (insertUser($conn, $user_id, $fname, $lname, $email, $phone, $fee, $student, $studentproof, $proof, $address)) {
                //     $_SESSION['user_id'] = $user_id;
                //     $response['status'] = 'success';
                //     $emailSent = sendConfirmationEmail($email, $fname, $response);

                //     $response['message'] = 'Registration successful.';
                //     if (!$emailSent) {
                //         $response['email_status'] = 'Email could not be sent: ' . ($response['email_error'] ?? 'Unknown error.');
                //     }else{
                //         $response['email_status'] = 'Email sent successfully.';
                //     }
                // } else {
                //     $response['status'] = 'error';
                //     $response['message'] = 'There was an error registering the user.';
                // }


                if (insertUser($conn, $user_id, $fname, $lname, $email, $phone, $fee, $student, $studentproof, $proof, $address)) {
                    $_SESSION['user_id'] = $user_id;
                    $response['status'] = 'success';

                    $subject = "Registration Successful 📮";


                    $emailSent = sendEmail(
                        $to = $email,
                        $toName = $fname,
                        $subject,
                        '../email/register.html', // Path to the email template
                        $response,
                        [
                            'FIRST_NAME' => $fname,
                            'YEAR' => FOOTERYEAR
                        ],
                        $from = BRAND_EMAIL,
                        $fromName = COMPANY,
                        $replyTo = BRAND_EMAIL,
                    );

                    if ($emailSent) {
                        // echo "Registration email sent!";
                        $response['message'] = 'Registration successful.';
                        $response['message'] = 'Email sent successfully.';
                    } else {
                        $response['message'] = "Email failed: " . ($response['email_error'] ?? 'Unknown error');
                    }
                    // $response['message'] = 'Registration successful.xdc';

                } else {
                    $response['status'] = 'error';
                    $response['message'] = 'There was an error registering the user.';
                }
            }
        }
    }
}

header('Content-Type: application/json');
echo json_encode($response);
exit;

function insertUser($conn, $user_id, $fname, $lname, $email, $phone, $fee, $student, $studentproof, $proof, $address)
{
    $sql = "INSERT INTO bio_participants (user_id, first_name, last_name, email, phone, fee, student, studentproof, proof, affiliation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ssssssssss", $user_id, $fname, $lname, $email, $phone, $fee, $student, $studentproof, $proof, $address);
    return mysqli_stmt_execute($stmt);
}

function uploadFile($file, $type, $file_id, &$response)
{
    $uploadDir = "uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if ($file["size"] > 5 * 1024 * 1024) {
        $response['message'] = $type . ' file size is too large.';
        return null;
    }

    $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!in_array($file["type"], $allowedTypes)) {
        $response['message'] = $type . ' file type not allowed. Upload only PDF, JPG, or PNG.';
        return null;
    }

    // Extract file extension and sanitize filename
    $extension = pathinfo($file["name"], PATHINFO_EXTENSION);
    $safeName = preg_replace('/[^a-zA-Z0-9_-]/', '', pathinfo($file["name"], PATHINFO_FILENAME));

    // Ensure unique filename
    $fileName = $type . "_" . $file_id . "." . $extension;
    $filePath = $uploadDir . $fileName;

    if (move_uploaded_file($file["tmp_name"], $filePath)) {
        return $filePath;
    } else {
        $response['message'] = 'Failed to upload ' . $type . ' file.';
        return null;
    }
}



function sendConfirmationEmail($email, $fname, &$response)
{
    $templateFilePath = '../email/confirmation.html';
    if (!file_exists($templateFilePath)) {
        $response['message'] = 'Email template file not found!';
        return false;
    }

    // Load email template
    $message = file_get_contents($templateFilePath);
    $message = str_replace('{{FIRST_NAME}}', htmlspecialchars($fname, ENT_QUOTES, 'UTF-8'), $message);

    // Headers
    $headers = [
        'From: Bioeconomy Conference <noreply@bioeconomyconf.com>',
        'Reply-To: <hello@bioeconomyconf.com>',
        'X-Mailer: PHP/' . phpversion(),
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8'
    ];

    // Send email
    $result = mail($email, "Registration Successful 📮", $message, implode("\n", $headers)); // Use "\n" instead of "\r\n"

    if (!$result) {
        $response['email_error'] = error_get_last()['message'] ?? 'Email could not be sent.';
    }

    return $result;
}


// function sendConfirmationEmail($email, $fname, &$response){
//     $templateFilePath = '../email/confirmation.html';
//     if (!file_exists($templateFilePath)) {
//         $response['message'] = 'File not found!';
//         return false;
//     }

//     $message = file_get_contents($templateFilePath);
//     $message = str_replace('{{FIRST_NAME}}', $fname, $message);
//     $message = str_replace('{{YEAR}}', FOOTERYEAR, $message);

//     $headers = 'From: Bioeconomy Conference <noreply@bioeconomyconf.com>' . "\r\n" .
//         'Reply-To: hello@bioeconomyconf.com' . "\r\n" .
//         'X-Mailer: PHP/' . phpversion() . "\r\n" .
//         'MIME-Version: 1.0' . "\r\n" .
//         'Content-Type: text/html; charset=ISO-8859-1';
//     return mail($email, "Registration Successful 2 📮", $message, $headers);
// }

// function sendConfirmationEmail($email, $fname, &$response){
//     $templateFilePath = '../email/confirmation.html';
//     if (!file_exists($templateFilePath)) {
//         $response['message'] = 'Email template file not found!';
//         return false;
//     }

//     $message = file_get_contents($templateFilePath);
//     $message = str_replace('{{FIRST_NAME}}', htmlspecialchars($fname, ENT_QUOTES, 'UTF-8'), $message);
//     // $message = str_replace('{{YEAR}}', defined('FOOTERYEAR') ? FOOTERYEAR : date('Y'), $message);

//     $headers = [
//         'From: Bioeconomy Conference <noreply@bioeconomyconf.com>',
//         'Reply-To: hello@bioeconomyconf.com',
//         'X-Mailer: PHP/' . phpversion(),
//         'MIME-Version: 1.0',
//         'Content-Type: text/html; charset=ISO-8859-1'
//     ];

//     $result = mail($email, "Registration Successful 📮", $message, implode("\r\n", $headers));

//     if (!$result) {
//         $response['email_error'] = error_get_last()['message'] ?? 'Unknown email error';
//     }

//     return $result;
// }
