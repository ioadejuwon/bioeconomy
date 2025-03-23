<?php
set_time_limit(60); // Set the time limit to 60 seconds
include_once "../../inc/config.php";
include_once "../../inc/drc.php";
include_once "../../inc/randno.php";
session_start();
$error = null;
$response = array(); // Initialize response array
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
	$email = mysqli_real_escape_string($conn, $_POST['email']);
	$pword = mysqli_real_escape_string($conn, $_POST['pword']);
	if (! empty($email) && ! empty($pword)) {
		if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$sql = "SELECT email, first_name, pword_hashed, admin_id FROM bio_admin WHERE email = ?";
			$stmt = mysqli_prepare($conn, $sql);
			mysqli_stmt_bind_param($stmt, "s", $email); // Bind the parameter to the placeholder
			mysqli_stmt_execute($stmt); // Execute the query
			mysqli_stmt_bind_result($stmt, $resultEmail, $fname, $resultPasswordHash, $admin_id); // Bind the result variable
			mysqli_stmt_fetch($stmt); // Fetch the result
			if ($resultEmail && password_verify($pword, $resultPasswordHash)) {
				$_SESSION['admin_id'] = $admin_id;
				$_SESSION['last_activity'] = time();  // Set the time of the last activity
				//Send Login email to Vendor
				$to = $resultEmail; // Vendor's email address
				// $to = 'isaac@martville.app'; // Vendor's email address


				$subject = "🚨 Admin Login - Did you just log in?";
				$emailSent = sendEmail(
					$to = $resultEmail,
					$toName = $fname,
					$subject,
					'../email/login.html', // Path to the email template
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
					$response['status'] = 'success';
					// $response['message'] = 'Admin ID is ' . $admin_id;
					$response['redirect_url'] = ! empty($_POST['url']) ? $_POST['url'] : ADMIN_DASHBOARD; // Add redirect URL to response
				} else {
					$response['message'] = "Email failed: " . ($response['email_error'] ?? 'Unknown error');
				}


				$response['message'] = '2Admin ID is ' . $admin_id;
			} else {
				$response['status'] = 'error';
				$response['message'] = 'Looks like you entered the wrong email address or password!';
			}
		} else {
			$response['status'] = 'error';
			$response['message'] = 'Invalid Email address.';
		}
	} else {
		$response['status'] = 'error';
		$response['message'] = 'Please enter your detaimls.';
	}
	// Output the response in JSON format
	header('Content-Type: application/json');
	echo json_encode($response);
	exit;
}
