<?php
set_time_limit(60);
include_once "config.php";
include_once "drc.php";
include_once "env.php";
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
    $paymentproof = trim($_FILES['paymentproof']);
    $student = trim($_POST['student']);
    $studentproof1 = trim($_FILES['studentproof']);
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
    } elseif ( empty($studentproof1)) {
        $response['message'] = 'You need to upload evidence of studentship.';
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
            $studentproof = uploadFile($studentproof1, 'student_', $file_id, $response);
            $proof = uploadFile($paymentproof, 'paymentproof_', $file_id, $response);

            if (!$studentproof) {
                $response['message'] = 'Student proof upload failed. Check file type and size.';
                exit;
            } elseif (!$proof) {
                $response['message'] = 'Payment proof upload failed. Check file type and size.';
                exit;
            } else {


                // Insert user into database


                if (insertUser($conn, $user_id, $fname, $lname, $email, $phone, $fee, $student, $studentproof, $proof, $address)) {
                    $_SESSION['user_id'] = $user_id;
                    $response['status'] = 'success';

                    // $subject = "Registration Successful 📮";
                    $subject = "Registration Successful ";


                    $emailSent = sendEmail(
                        $to = $email,
                        $toName = $fname,
                        $subject,
                        '../email/registration.html', // Path to the email template
                        $response,
                        [
                            'FIRST_NAME' => $fname,
                            'YEAR' => FOOTERYEAR
                        ],
                        $from = BRAND_EMAIL,
                        $fromName = COMPANY,
                        $replyTo = REPLY_TO,
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
    $sql = "INSERT INTO bio_participants (user_id, first_name, last_name, email, phone, fee, student, studentproof, paymentproof, affiliation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ssssssssss", $user_id, $fname, $lname, $email, $phone, $fee, $student, $studentproof, $proof, $address);
    return mysqli_stmt_execute($stmt);
}

function uploadFile($file, $type, $file_id, &$response){
    $uploadDir = "proof/";
    $uploadlocation = "../" . $uploadDir;
    if (!is_dir($uploadlocation)) {
        mkdir($uploadlocation, 0777, true);
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
    // $safeName = preg_replace('/[^a-zA-Z0-9_-]/', '', pathinfo($file["name"], PATHINFO_FILENAME));

    // Ensure unique filename
    $fileName = $type . $file_id . "." . $extension;
    $filePath = $uploadDir . $fileName;
    $filePathLocation = $uploadlocation . $fileName;

    if (move_uploaded_file($file["tmp_name"], $filePathLocation)) {
        // $response['message'] = 'Failed to move file '. $filePath ;
        // return $filePath;
        return $filePath;
    } else {
        // $response['message'] = 'Failed to upload ' . $type . ' file.';
        return null;
    }
}
