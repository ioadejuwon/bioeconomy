<?php
set_time_limit(60); // Set the time limit to 60 seconds
include_once "../../inc/config.php";
include_once "../../inc/drc.php";
include_once "../../inc/randno.php";
session_start();

$response = array(); // Initialize response array

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['reset'])) {
    
    $selector = $_POST['selector'];
    $validator = $_POST['validator'];
    $pword = $_POST['pword'];
    $cword = $_POST['cword'];
    
    if(empty($pword) || empty($cword) || empty($selector) || empty($validator)){
        $response['status'] = 'error';
        $response['message'] = 'Please fill all the inputs with your details';
    } else {
        if($cword != $pword){
            $response['status'] = 'error';
            $response['message'] = 'Password is not the same as Confirm Password!';
        } else {
            $currentDate = date("U");
            $sql = "SELECT * FROM pwdReset WHERE pwdResetSelector = ? AND pwdResetExpires >= ?";
            $stmt = mysqli_stmt_init($conn);
            
            if(!mysqli_stmt_prepare($stmt, $sql)){
                $response['status'] = 'error';
                $response['message'] = 'There was an error preparing the password statements. If the issue persists, please contact support!';
            } else {
                mysqli_stmt_bind_param($stmt, "ss", $selector, $currentDate);
                mysqli_stmt_execute($stmt);
                
                $result = mysqli_stmt_get_result($stmt);
                if(!$row = mysqli_fetch_assoc($result)){
                    $response['status'] = 'error';
                    $response['message'] = 'The link expired! You need to resubmit your reset request.';
                } else {
                    $tokenBin = hex2bin($validator);
                    $tokenCheck = password_verify($tokenBin, $row["pwdResetToken"]);
                    
                    if($tokenCheck === false){
                        $response['status'] = 'error';
                        $response['message'] = 'Something is wrong! You need to resubmit your reset request.';
                    } elseif($tokenCheck === true) {
                        $tokenEmail = $row['pwdResetEmail'];
                        
                        $sql = "SELECT * FROM users WHERE email = ?";
                        $stmt = mysqli_stmt_init($conn);
                        if (!mysqli_stmt_prepare($stmt, $sql)) {
                            $response['status'] = 'error';
                            $response['message'] = 'There was an error preparing the statements';
                        } else {
                            mysqli_stmt_bind_param($stmt, "s", $tokenEmail);
                            mysqli_stmt_execute($stmt);
                            $result = mysqli_stmt_get_result($stmt);
                            if(!$row = mysqli_fetch_assoc($result)){
                                $response['status'] = 'error';
                                $response['message'] = 'There was an error with the fetch!';
                            } else {
                                $email = $row['email'];
                                $fname = $row['fname'];
                                
                                $update = "UPDATE users SET pwordhash = ? WHERE email = ?";
                                $stmt = mysqli_stmt_init($conn);
                                if (!mysqli_stmt_prepare($stmt, $update)) {
                                    $response['status'] = 'error';
                                    $response['message'] = 'There was an error with the update!';
                                } else {
                                    $pwordhash = password_hash($pword, PASSWORD_BCRYPT);
                                    mysqli_stmt_bind_param($stmt, "ss", $pwordhash, $tokenEmail);
                                    mysqli_stmt_execute($stmt);
                                    
                                    $sql = "DELETE FROM pwdReset WHERE pwdResetEmail = ?;";
                                    $stmt = mysqli_stmt_init($conn);
                                    if(!mysqli_stmt_prepare($stmt, $sql)){
                                        $response['status'] = 'error';
                                        $response['message'] = 'There was an error with the delete!';
                                    } else {
                                        mysqli_stmt_bind_param($stmt, "s", $tokenEmail);
                                        mysqli_stmt_execute($stmt);
                                        mysqli_stmt_close($stmt);
                                        
                                        mysqli_close($conn);
                                        
                                        $to = $email;
                                        $subject = "🚨 Password has been changed successfully";
                                        
                                        $templateFilePath = '../email/reset.html';
                                        if (file_exists($templateFilePath)) {
                                            $message = file_get_contents($templateFilePath);
                                            $message = str_replace('{{FIRST_NAME}}', $fname, $message);
                                            $message = str_replace('{{RECOVER_URL}}', RECOVER, $message);
                                            $message = str_replace('{{YEAR}}', FOOTERYEAR, $message);
                                            
                                            $headers = 'From: MartVille <noreply@martville.app>' . "\r\n" .
                                            'Reply-To: hello@martville.app' . "\r\n" .
                                            'X-Mailer: PHP/' . phpversion() . "\r\n" .
                                            'MIME-Version: 1.0' . "\r\n" .
                                            'Content-Type: text/html; charset=ISO-8859-1';
                                            
                                            $mail_sent = mail($to, $subject, $message, $headers);
                                            
                                            if($mail_sent){
                                                $response['status'] = 'success';
                                                $response['message'] = 'Password changed successfully!';
                                                $response['redirect_url'] = LOGIN . '?p=passwordupdated';
                                            } else {
                                                $response['status'] = 'error';
                                                $response['message'] = 'Email not sent';
                                            }
                                            
                                        } else {
                                            $response['status'] = 'error';
                                            $response['message'] = 'Template file not found: ' . $templateFilePath;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }   
        }
    }
  
    // Output the response in JSON format
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
  
} elseif (isset($_SESSION['unique_id'])) {
    header("Location: " . (!empty($_GET['url']) ? $_GET['url'] : DASHBOARD));
    exit;
}