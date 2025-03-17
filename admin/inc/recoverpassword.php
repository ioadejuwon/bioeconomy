<?php


set_time_limit(60); // Set the time limit to 60 seconds


include_once "../../inc/config.php";
include_once "../../inc/drc.php";
include_once "../../inc/randno.php";
session_start();

$error = null;
$response = array(); // Initialize response array

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['recover'])) {
    $email = mysqli_real_escape_string($conn, $_POST['email']);

    if (!empty($email)) {
        

        $selector = bin2hex(random_bytes(8));
        $token = (random_bytes(32));
        $url = RESET."?s=". $selector . "&v=".bin2hex($token);
        $expires = date("U") + 1800;
        $email = $_POST['email'];
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            $sql = "SELECT email, fname FROM users WHERE email = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $email); // Bind the parameter to the placeholder
            mysqli_stmt_execute($stmt); // Execute the query
            mysqli_stmt_bind_result($stmt, $resultEmail, $fname); // Bind the result variable
            mysqli_stmt_fetch($stmt); // Fetch the result
            if($resultEmail){
                $sql = "DELETE FROM pwdReset WHERE pwdResetEmail = ?;";
                $stmt = mysqli_stmt_init($conn);
                if(!mysqli_stmt_prepare($stmt, $sql)){
                    $response['status'] = 'error';
                    $response['message'] = 'There was an error!';
                    exit();
                }else{
                    mysqli_stmt_bind_param($stmt, "s", $email);
                    mysqli_stmt_execute($stmt);
                    mysqli_stmt_close($stmt); // Close the DELETE statement
                }
                $sql = "INSERT INTO pwdReset (pwdResetEmail, PwdResetSelector, pwdResetToken, pwdResetExpires) VALUES (?, ?, ?, ?);"; // Prepare a new statement for the INSERT
                $stmt = mysqli_stmt_init($conn);
                if(!mysqli_stmt_prepare($stmt, $sql)){
                    $response['status'] = 'error';
                    $response['message'] = 'There was an error!';
                    exit();
                }else{
                    $hashedToken = password_hash($token, PASSWORD_DEFAULT);
                    mysqli_stmt_bind_param($stmt, "ssss", $email, $selector, $hashedToken, $expires);
                    mysqli_stmt_execute($stmt);
                    mysqli_stmt_close($stmt); // Close the INSERT statement
                }
                mysqli_close($conn); // Close the database connection
                $to = $email;
                $subject = "🚨 Did you request for a change of password on MartVille?";

               
                $templateFilePath = '../email/recover.html';
                if (file_exists($templateFilePath)) {
                    $message = file_get_contents($templateFilePath);
                    $message = str_replace('{{FIRST_NAME}}', $fname, $message);
                    $message = str_replace('{{RESET_URL}}', $url, $message);
                    $message = str_replace('{{YEAR}}', FOOTERYEAR, $message);
    


                    $headers = 'From: MartVille <noreply@martville.app>' . "\r\n" .
                    'Reply-To: hello@martville.app' . "\r\n" .
                    'X-Mailer: PHP/' . phpversion() . "\r\n" .
                    'MIME-Version: 1.0' . "\r\n" .
                    'Content-Type: text/html; charset=ISO-8859-1';
    
                    $mail_sent = mail($to, $subject, $message, $headers);
    
                    if($mail_sent){
                        $response['status'] = 'success';
                        $response['message'] = 'Reset email has been sent to your email address!';
                        // $response['redirect_url'] = !empty($_POST['url']) ? $_POST['url'] : DASHBOARD; // Add redirect URL to response
                    }else{
                        $response['status'] = 'error';
                        $response['message'] = 'Email not sent';
                    }
    
    
                }else {
                    $response['status'] = 'error';
                    $response['message'] = 'Template file not found: ' .$templateFilePath;
                }
    
                
            }else{
                $response['status'] = 'info';
                $response['message'] = 'You should get an email soon if the email address is in our records!';
            }   
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Invalid Email address.';
        }



    } else {
        $response['status'] = 'error';
        $response['message'] = 'Please enter your details.';
    }

    // Output the response in JSON format
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}elseif (isset($_SESSION['unique_id'])) {
    header("Location: ". (!empty($_GET['url']) ? $_GET['url'] : DASHBOARD));
    exit;
}