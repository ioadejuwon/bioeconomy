<?php
include_once '../../inc/config.php';
include_once "../../inc/randno.php";
include_once "../../inc/drc.php";

// Set header for JSON response
header('Content-Type: application/json');

$response = array(); // Initialize response array

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $oldpass = htmlspecialchars($_POST['oldpass']);
        $newpass = htmlspecialchars($_POST['newpass']);
        $confirmpass = htmlspecialchars($_POST['confirmpass']);
        $unique_id = htmlspecialchars($_POST['unique_id']);

        if (!empty($oldpass) && !empty($newpass)) {
            $sql = "SELECT * FROM users WHERE unique_id = ?";
            $stmt = mysqli_stmt_init($conn);

            if (mysqli_stmt_prepare($stmt, $sql)) {
                mysqli_stmt_bind_param($stmt, "s", $unique_id);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($row = mysqli_fetch_assoc($result)) {
                    if ($newpass == $confirmpass) {
                        $enc_pass = $row['pwordhash'];

                        if (password_verify($oldpass, $enc_pass)) {
                            $newpasshash = password_hash($newpass, PASSWORD_BCRYPT);
                            $update = "UPDATE users SET pwordhash = ? WHERE unique_id = ?";
                            $stmt = mysqli_stmt_init($conn);

                            if (mysqli_stmt_prepare($stmt, $update)) {
                                mysqli_stmt_bind_param($stmt, "ss", $newpasshash, $unique_id);
                                if (mysqli_stmt_execute($stmt)) {
                                    $response['status'] = 'success';
                                    $response['message'] = 'Password updated successfully!';
                                } else {
                                    $response['status'] = 'error';
                                    $response['message'] = 'Failed to update password.';
                                }
                            } else {
                                $response['status'] = 'error';
                                $response['message'] = 'Failed to prepare update statement.';
                            }
                        } else {
                            $response['status'] = 'error';
                            $response['message'] = 'Your old password is incorrect!';
                        }
                    } else {
                        $response['status'] = 'error';
                        $response['message'] = 'New password and confirm password do not match!';
                    }
                } else {
                    $response['status'] = 'error';
                    $response['message'] = 'We could not find you in our records!';
                }
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Failed to prepare select statement.';
            }
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Please enter all required details!';
        }
  

    // Close the connection
    $conn->close();
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method.';
}

// Output the response in JSON format
echo json_encode($response);