<?php
set_time_limit( 60 ); // Set the time limit to 60 seconds
include_once "../../inc/config.php";
include_once "../../inc/drc.php";
include_once "../../inc/randno.php";
session_start();
$error = null;
$response = array(); // Initialize response array
if ( $_SERVER['REQUEST_METHOD'] === 'POST' && isset( $_POST['login'] ) ) {
	$email = mysqli_real_escape_string( $conn, $_POST['email'] );
	$pword = mysqli_real_escape_string( $conn, $_POST['pword'] );
	if ( ! empty( $email ) && ! empty( $pword ) ) {
		if ( filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
			$sql = "SELECT email, first_name, pword_hashed, admin_id FROM bio_admin WHERE email = ?";
			$stmt = mysqli_prepare( $conn, $sql );
			mysqli_stmt_bind_param( $stmt, "s", $email ); // Bind the parameter to the placeholder
			mysqli_stmt_execute( $stmt ); // Execute the query
			mysqli_stmt_bind_result( $stmt, $resultEmail, $fname, $resultPasswordHash, $admin_id ); // Bind the result variable
			mysqli_stmt_fetch( $stmt ); // Fetch the result
			if ( $resultEmail && password_verify( $pword, $resultPasswordHash ) ) {
				$_SESSION['admin_id'] = $admin_id;
				$_SESSION['last_activity'] = time();  // Set the time of the last activity
				//Send Login email to Vendor
				$to = $resultEmail; // Vendor's email address
				// $to = 'isaac@martville.app'; // Vendor's email address
				$subject = "🚨 Admin Login - Did you just log in?";
				$templateFilePath = '../email/login.html';
				if ( file_exists( $templateFilePath ) ) {
					$message = file_get_contents( $templateFilePath );
					$message = str_replace( '{{FIRST_NAME}}', $fname, $message );
					$message = str_replace( '{{YEAR}}', FOOTERYEAR, $message );
				} else {
					$response['status'] = 'error';
					$response['message'] = 'Template file not found: ' . $templateFilePath;
					// Handle the error gracefully
				}
				// Additional headers for HTML email
				$headers = 'From: MartVille <noreply@martville.app>' . "\r\n" .
					'Reply-To: hello@martville.app' . "\r\n" .
					'X-Mailer: PHP/' . phpversion() . "\r\n" .
					'MIME-Version: 1.0' . "\r\n" .
					'Content-Type: text/html; charset=ISO-8859-1';
				$mail_sent = mail( $to, $subject, $message, $headers ); //Mail sent to vendor
				if ( $mail_sent ) {
					$response['status'] = 'success';
					$response['message'] = 'Admin ID is ' . $admin_id;
					// $response['redirect_url'] = ! empty( $_POST['url'] ) ? $_POST['url'] : ADMIN_DASHBOARD; // Add redirect URL to response
				}
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
	header( 'Content-Type: application/json' );
	echo json_encode( $response );
	exit;
} 



