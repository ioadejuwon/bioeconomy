<?php
include_once "config.php";
include_once "randno.php"; // Ensure this file exists
include_once "drc.php";
include_once "env.php";
require '../send.php';

header('Content-Type: application/json');

$response = ['status' => 'error', 'message' => ''];

// Ensure the request is POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    $response['message'] = "Invalid request method.";
    echo json_encode($response);
    exit;
}

$fileLocation = 'abstracts/';
$uploadDir = '../abstracts/';
$allowedTypes = ['doc', 'docx', 'pdf'];

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if (isset($_FILES['file']) && is_array($_FILES['file']['name'])) {
    // Get form data
    $fname = $_POST['fname'] ?? '';
    $lname = $_POST['lname'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $mode = $_POST['mode'] ?? '';

    // Validate form data
    if (empty($fname) || empty($lname) || empty($email) || empty($phone) || empty($mode)) {
        $response['message'] = "All fields are required.";
        echo json_encode($response);
        exit;
    }

    $identifier = 0;
    $uploadedFiles = []; // Array to track successfully uploaded files

    for ($i = 0; $i < count($_FILES['file']['name']); $i++) {
        $fileName = $_FILES['file']['name'][$i];
        $fileTmpName = $_FILES['file']['tmp_name'][$i];
        $fileSize = $_FILES['file']['size'][$i];
        $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $identifier += 1;

        // $newFileName = $fname . '-' . $lname . '-' . $identifier . '.' . $fileType;
        // $newFileName = $fname . '-' . $lname . '-' . $abstract_files . '-'. $identifier. '-' . uniqid() . '.' . $fileType;
        $newFileName = $fname . '-' . $lname . '-' . $abstract_files . '-' . $identifier . '.' . $fileType;
        $targetFile = $uploadDir . $newFileName;
        $location = $fileLocation . $newFileName;

        if (in_array($fileType, $allowedTypes) && $fileSize <= 2097152) {
            if (move_uploaded_file($fileTmpName, $targetFile)) {
                $uploadedFiles[] = $targetFile; // Track successfully uploaded files

                // Insert into database
                $insertAbstractQuery = "INSERT INTO bio_abstracts (abstract_id, first_name, last_name, email, phone, mode, file_path) VALUES (?, ?, ?, ?, ?, ?, ?)";
                $stmt = mysqli_prepare($conn, $insertAbstractQuery);
                mysqli_stmt_bind_param($stmt, "sssssss", $abstract_id, $fname, $lname, $email, $phone, $mode, $location);

                if (!mysqli_stmt_execute($stmt)) {
                    // Database insertion failed, remove uploaded files
                    foreach ($uploadedFiles as $file) {
                        if (file_exists($file)) {
                            unlink($file);
                        }
                    }

                    $response = ['status' => 'error', 'message' => 'Database error: ' . mysqli_stmt_error($stmt)];
                    echo json_encode($response);
                    exit();
                }

                mysqli_stmt_close($stmt);
            } else {
                $response = ['status' => 'error', 'message' => 'Error moving uploaded file: ' . $fileName];
                echo json_encode($response);
                mysqli_close($conn);
                exit();
            }
        } else {
            $response = ['status' => 'error', 'message' => 'Invalid file type or size: ' . $fileName];
            echo json_encode($response);
            mysqli_close($conn);
            exit();
        }
    }
    if($identifier > 1){
        $plural = 'Abstracts sent successfully.';
    }else{
        $plural = 'Abstract sent successfully.';
    }

    $subject = "Abstract Submitted Successful 📮";
    $emailSent = sendEmail(
        $to = $email,
        $toName = $fname,
        $subject,
        '../email/abstract.html', // Path to the email template
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
        // $response['status'] = 'success';
        // $response['message'] = 'Registration successful.';
        // $response['message'] = 'Email sent successfully.';
        $subject = "New Abstract Submitted 📮";
        $emailSent = sendEmail(
            $to = 'ioadejuwon@gmail.com',
            $toName = $fname,
            $subject,
            '../email/abstract.html', // Path to the email template
            $response,
            [
                'FIRST_NAME' => $fname,
                'YEAR' => FOOTERYEAR,
                'ABTSRACT_LINK' => 'abstract-link'
            ],
            $from = BRAND_EMAIL,
            $fromName = COMPANY,
            $replyTo = REPLY_TO,
        );
        if ($emailSent) {
            // $response['status'] = 'success';
            // $response['message'] = 'Registration successful.';
            // $response['message'] = 'Email sent successfully.';
            $response = ['status' => 'success', 'message' => $plural];
        } else {
            $response['message'] = "Email failed: " . ($response['email_error'] ?? 'Unknown error');
        }

        // $response = ['status' => 'success', 'message' => 'Files uploaded successfully.'];
    } else {
        $response['message'] = "Email failed: " . ($response['email_error'] ?? 'Unknown error');
    }
} else {
    $response = ['status' => 'error', 'message' => 'No files uploaded or file upload error.'];
}

mysqli_close($conn);
echo json_encode($response);


// -------------------------------------------------------------


// // Check if files are uploaded
// if (empty($_FILES['files']['name'][0])) {
//     $response['message'] = "No files uploaded.";
//     echo json_encode($response);
//     exit;
// }

// // Loop through uploaded files
// $uploaded_files = [];
// // foreach ($_FILES['files']['tmp_name'] as $key => $tmp_name) {
// foreach ($_FILES['files']['name'] as $key => $file_name) {
//     $file_tmp = $_FILES['files']['tmp_name'][$key];
//     $file_error = $_FILES['files']['error'][$key];

//     if ($file_error !== UPLOAD_ERR_OK) {
//         $response['message'] = "Error uploading file: " . $file_name . " (Error Code: " . $file_error . ")";
//         echo json_encode($response);
//         exit;
//     }

//     // $file_name = $_FILES['files']['name'][$key];
//     // $file_tmp = $_FILES['files']['tmp_name'][$key];
//     // $file_error = $_FILES['files']['error'][$key];

//     // // Check for upload errors
//     // if ($file_error !== UPLOAD_ERR_OK) {
//     //     $response['message'] = "Error uploading file: " . $file_name . " (Error Code: " . $file_error . ")";
//     //     echo json_encode($response);
//     //     exit;
//     // }

//     // Set upload directory
//     $upload_dir = "abstracts/";
//     if (!is_dir($upload_dir)) {
//         mkdir($upload_dir, 0777, true); // Create folder if it doesn't exist
//     }

//     // Set file path
//     $file_path = $upload_dir . uniqid() . "_" . basename($file_name);

//     // Move uploaded file to target directory
//     if (move_uploaded_file($file_tmp, $file_path)) {
//         $uploaded_files[] = $file_path;

//         // Insert into database
//         $stmt = $conn->prepare("INSERT INTO bio_abstracts (first_name, last_name, email, phone, mode, file_name, file_path) VALUES (?, ?, ?, ?, ?, ?, ?)");
//         $stmt->bind_param("sssssss", $fname, $lname, $email, $phone, $mode, $file_name, $file_path);

//         if (!$stmt->execute()) {
//             $response['message'] = "Database error: " . $stmt->error;
//             echo json_encode($response);
//             exit;
//         }
//     } else {
//         $response['message'] = "Failed to move uploaded file: " . $file_name;
//         echo json_encode($response);
//         exit;
//     }
// }

// if ($stmt->execute()) {
//     $response['status'] = "success";
//     $response['message'] = count($uploaded_files) . " file(s) uploaded successfully.";
//     $response['files'] = $uploaded_files;
// } else {
//     $response['message'] = "Database error: " . $stmt->error;
// }

// echo json_encode($response);
