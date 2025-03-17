<?php
include_once '../../inc/config.php';
include_once "../../inc/randno.php";
include_once "../../inc/drc.php";


$response = array(); // Initialize response array

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($_POST['categoryname']) || empty($_POST['biz_id'])) {
        $response['status'] = 'error';
        $response['message'] = 'Please fill in the required field';
    } else {
        // Capture and sanitize input
        $unique_id = $_POST['unique_id'];

        $categoryName = $_POST['categoryname'];
        
        $categoryID = $admin_category_id; // Generate a unique ID
        // $category_link = $domainstore . $biz_id . '?category=' . $categoryID;

        // Check if the category already exists using a prepared statement
        $stmt = $conn->prepare("SELECT COUNT(*) FROM admin_categories WHERE categoryName = ?");
        $stmt->bind_param("s", $categoryName);
        $stmt->execute();
        $stmt->bind_result($count_row);
        $stmt->fetch();
        $stmt->close();

        if($count_row > 0){
            $response['status'] = 'info';
            $response['message'] = 'You used this name before. Please try another.';
        }elseif (empty($categoryName) || preg_match('/[^\w\s]/', $categoryName)) {

            $response['status'] = 'error';
            $response['message'] = 'One or more characters is not allowed!';
        }else {
            // Insert the new category using a prepared statement
            $stmt = $conn->prepare("INSERT INTO admin_categories (categoryID, categoryName, unique_id) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $categoryID, $categoryName, $unique_id);

            if ($stmt->execute()) {
                $response['status'] = 'success';
                $response['message'] = 'Category added successfully!';
                $response['categorylink'] = CATEGORIES."?c=".$categoryID;
                $response['categoryid'] = $categoryID;
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Failed to add category. Please try again.';
            }

            $stmt->close();
        }
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method.';
}

// Close the database connection
$conn->close();

// Return the response as JSON
echo json_encode($response);