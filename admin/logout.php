<?php
session_start();
include_once "../inc/config.php"; // Include config at the beginning
include_once "../inc/drc.php"; // Include config at the beginning
$url = ! empty( $_GET['url'] ) ? $_GET['url'] : ADMIN_DASHBOARD;
if ( isset( $_SESSION['admin_id'] ) ) {
	$logout_id = $_SESSION['admin_id'];
	// Use prepared statement to prevent SQL injection
	$stmt = $conn->prepare("SELECT * FROM bio_admin WHERE admin_id = ?");
	$stmt->bind_param( "s", $logout_id );
	$stmt->execute();
	$stmt->close();
	session_unset();
	session_destroy();
	// header( "location: " . ADMIN_LOGIN );
	header( "location: " . ADMIN_LOGIN . "?url=" . $url);// redirect to login page if not signed in
} else {
	// header( "location: " . ADMIN_LOGIN );
	header( "location: " . ADMIN_LOGIN . "?url=" . $url);// redirect to login page if not signed in
}
