<?php
set_time_limit(60);
include_once "config.php";
include_once "drc.php";
include_once "randno.php";
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
        // Handle file uploads
        $studentproof = uploadFile($_FILES['studentproof'], 'student_', $file_id, $response);
        $proof = uploadFile($_FILES['proof'], 'Proof_', $file_id, $response);

        if (!$studentproof) {
            $response['message'] = 'Student proof upload failed. Check file type and size.';
        } elseif (!$proof) {
            $response['message'] = 'Payment proof upload failed. Check file type and size.';
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

                // Insert user into database
                if (insertUser($conn, $user_id, $fname, $lname, $email, $phone, $fee, $student, $studentproof, $proof, $address)) {
                    $_SESSION['user_id'] = $user_id;
                    $response['status'] = 'success';
                    $response['message'] = sendConfirmationEmail($email, $fname) ?
                        'Registration successful. Confirmation email sent.' :
                        'Registration successful, but email could not be sent.';
                    // $response['redirect_url'] = BASE_URL;
                } else {
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

function uploadFile($file, $type, $file_id, $response)
{
    $uploadDir = "uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if ($file["size"] > 5 * 1024 * 1024) {
        $response['message'] = $type.' file size is too large.';
        return null;
    }

    $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!in_array($file["type"], $allowedTypes)) {
        $response['message'] = $type.' file type not allowed. Upload only PDF, JPG or PNG.';
        return null;
    }

    $fileName = $type . $file_id . "_" . basename($file["name"]);
    $filePath = $uploadDir . $fileName;

    return move_uploaded_file($file["tmp_name"], $filePath) ? $filePath : null;
}

function sendConfirmationEmail($email, $fname)
{
    $templateFilePath = '../email/confirmation.html';
    if (!file_exists($templateFilePath)) {
        return false;
    }

    $message = file_get_contents($templateFilePath);
    $message = str_replace('{{FIRST_NAME}}', $fname, $message);
    $message = str_replace('{{YEAR}}', FOOTERYEAR, $message);

    $headers = 'From: Bioeconomy Conference <noreply@bioeconomyconf.com>' . "\r\n" .
        'Reply-To: hello@bioeconomyconf.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion() . "\r\n" .
        'MIME-Version: 1.0' . "\r\n" .
        'Content-Type: text/html; charset=ISO-8859-1';
    return mail($email, "Registration Successful 2 📮", $message, $headers);
}
