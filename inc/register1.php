<?php
set_time_limit(60); // Set the time limit to 60 seconds
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
		echo json_encode($response);
		exit;
	}
	if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$response['message'] = 'Please enter a valid email address.';
		echo json_encode($response);
		exit;
	}
	if (empty($phone)) {
		$response['message'] = 'Please fill in your phone number.';
		echo json_encode($response);
		exit;
	}
	if (empty($fee)) {
		$response['message'] = 'Please indicate the fee you paid.';
		echo json_encode($response);
		exit;
	}

	// Handle file uploads
	$studentproof = null;
	$proof = null;

	if (!empty($_FILES['studentproof']['name'])) {
		$studentproof = uploadFile($_FILES['studentproof'], $type = 'student_', $file_id);
		if (!$studentproof) {
			$response['message'] = 'Student proof upload failed. Check file type and size.';
			echo json_encode($response);
			exit;
		}
	} else {
		$response['message'] = 'Please submit the evidence of studentship.';
		echo json_encode($response);
		exit;
	}

	if (!empty($_FILES['proof']['name'])) {
		$proof = uploadFile($_FILES['proof'],$type = 'proof_', $file_id);
		
		if (!$proof) {
			$response['message'] = 'Payment proof upload failed. Check file type and size.';
			echo json_encode($response);
			exit;
		}
	} else {
		$response['message'] = 'Please submit the evidence of payment.';
		echo json_encode($response);
		exit;
	}

	// Check if email already exists
	$sql = "SELECT email FROM bio_participants WHERE email = ?";
	$stmt = mysqli_prepare($conn, $sql);
	mysqli_stmt_bind_param($stmt, "s", $email);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_store_result($stmt);

	if (mysqli_stmt_num_rows($stmt) > 0) {
		$response['status'] = 'info';
		$response['message'] = 'Looks like you registered for the event already.';
		echo json_encode($response);
		exit;
	}

	mysqli_stmt_close($stmt);

	// Generate unique user ID
	// $user_id = uniqid('user_');

	// Insert user into database
	if (insertUser($conn, $user_id, $fname, $lname, $email, $phone, $fee, $student, $studentproof, $proof, $address)) {
		$response['status'] = 'success';
		$response['message'] = 'User registered successfully!';
		$_SESSION['user_id'] = $user_id;

		// Send confirmation email
		$to = $email;
		$subject = "Registration Successful 📮";
		$templateFilePath = '../email/confirmation.html';

		if (file_exists($templateFilePath)) {
			$message = file_get_contents($templateFilePath);
			$message = str_replace('{{FIRST_NAME}}', $fname, $message);
			$message = str_replace('{{YEAR}}', FOOTERYEAR, $message);
			$message = str_replace('{{VERIFY_URL}}', $url, $message);

			$headers = 'From: Bioeconomy Conference <noreply@bioeconomyconf.com>' . "\r\n" .
				'Reply-To: hello@bioeconomyconf.com' . "\r\n" .
				'X-Mailer: PHP/' . phpversion() . "\r\n" .
				'MIME-Version: 1.0' . "\r\n" .
				'Content-Type: text/html; charset=ISO-8859-1';

			if (mail($to, $subject, $message, $headers)) {
				$response['message'] = 'Registration successful. Confirmation email sent.';
			} else {
				$response['message'] = 'Registration successful, but email could not be sent.';
			}
		} else {
			$response['message'] = 'Registration successful, but email template not found.';
		}

		mysqli_close($conn);
	} else {
		$response['message'] = 'There was an error registering the user.';
	}
}

// Output JSON response
header('Content-Type: application/json');
echo json_encode($response);
exit;

/*** Inserts a new user into the database. */
// function insertUser($conn, $user_id, $fname, $lname, $email, $phone, $fee, $student, $studentproof, $proof, $address){
// 	$sql = "INSERT INTO bio_participants (user_id, first_name, last_name, email, phone, fee, student, studentproof, proof, affiliation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
// 	$stmt = mysqli_prepare($conn, $sql);
// 	mysqli_stmt_bind_param($stmt, "ssssssssss", $user_id, $fname, $lname, $email, $phone, $fee, $student, $studentproof, $proof, $address);
// 	return mysqli_stmt_execute($stmt);
// }

/*** Handles file uploads.*/
function uploadFile($file, $type, $file_id)
{
	$uploadDir = "uploads/";
	if (!is_dir($uploadDir)) {
		mkdir($uploadDir, 0777, true);
	}

	// Validate file size
	if ($file["size"] > 5 * 1024 * 1024) { // 5MB limit
		error_log("File too large: " . $file["size"]);
		return null;
	}

	// Validate file type
	$allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
	if (!in_array($file["type"], $allowedTypes)) {
		error_log("Invalid file type: " . $file["type"]);
		return null;
	}

	$fileName = $type .$file_id . "_" . basename($file["name"]);
	$filePath = $uploadDir . $fileName;

	if (move_uploaded_file($file["tmp_name"], $filePath)) {
		return $filePath;
	} else {
		error_log("File upload failed: " . $file["error"]);
		return null;
	}
}
