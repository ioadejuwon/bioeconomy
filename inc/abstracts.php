<?php
include_once "config.php";
include_once "randno.php"; // Ensure this file exists

header('Content-Type: application/json');

$response = ['status' => 'error', 'message' => ''];

// Ensure the request is POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    $response['message'] = "Invalid request method.";
    echo json_encode($response);
    exit;
}

// Get form data
$fname = $_POST['fname'] ?? '';
$lname = $_POST['lname'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$mode = $_POST['mode'] ?? '';

// Validate form data (Check if empty)
if (empty($fname) || empty($lname) || empty($email) || empty($phone) || empty($mode)) {
    $response['message'] = "All fields are required.";
    echo json_encode($response);
    exit;
}

// Check if files are uploaded
if (empty($_FILES['files']['name'][0])) {
    $response['message'] = "No files uploaded.";
    echo json_encode($response);
    exit;
}

// Loop through uploaded files
$uploaded_files = [];
foreach ($_FILES['files']['tmp_name'] as $key => $tmp_name) {
    $file_name = $_FILES['files']['name'][$key];
    $file_tmp = $_FILES['files']['tmp_name'][$key];
    $file_error = $_FILES['files']['error'][$key];

    // Check for upload errors
    if ($file_error !== UPLOAD_ERR_OK) {
        $response['message'] = "Error uploading file: " . $file_name . " (Error Code: " . $file_error . ")";
        echo json_encode($response);
        exit;
    }

    // Set upload directory
    $upload_dir = "abstracts/";
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true); // Create folder if it doesn't exist
    }

    // Set file path
    $file_path = $upload_dir . uniqid() . "_" . basename($file_name);

    // Move uploaded file to target directory
    if (move_uploaded_file($file_tmp, $file_path)) {
        $uploaded_files[] = $file_path;

        // Insert into database
        $stmt = $conn->prepare("INSERT INTO bio_abstracts (first_name, last_name, email, phone, mode, file_name, file_path) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", $fname, $lname, $email, $phone, $mode, $file_name, $file_path);
        
        if (!$stmt->execute()) {
            $response['message'] = "Database error: " . $stmt->error;
            echo json_encode($response);
            exit;
        }
    } else {
        $response['message'] = "Failed to move uploaded file: " . $file_name;
        echo json_encode($response);
        exit;
    }
}

// Final success response
$response['status'] = "success";
$response['message'] = count($uploaded_files) . " file(s) uploaded successfully.";
$response['files'] = $uploaded_files;
echo json_encode($response);

$conn->close();
exit;
