<?php
// Database connection details
$servername = "localhost";
$username = "root"; // Use your MySQL username
$password = "your_password"; // Use your MySQL password
$dbname = "explore_srilanka";


$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize response array
$response = array(
    'success' => false,
    'message' => '',
    'redirect' => ''
);

// Process login data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize
    $username = filter_var(trim($_POST["username"]), FILTER_SANITIZE_STRING);
    $password = $_POST["password"];
    $userType = $_POST["userType"];
    
    // Validate input
    if (empty($username) || empty($password)) {
        $response['message'] = "Please enter both username and password";
        echo json_encode($response);
        exit;
    }
    
    // Prepare SQL statement based on user type
    if ($userType == "admin") {
        $sql = "SELECT * FROM admins WHERE username = ?";
    } else {
        $sql = "SELECT * FROM users WHERE username = ?";
    }
    
    // Create prepared statement
    $stmt = $conn->prepare($sql);
    
    // Bind parameters to statement
    $stmt->bind_param("s", $username);
    
    // Execute statement
    $stmt->execute();
    
    // Get result
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        // User exists, verify password
        $user = $result->fetch_assoc();
        
        if (password_verify($password, $user['password'])) {
            // Password is correct, start session
            session_start();
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $username;
            $_SESSION['user_type'] = $userType;
            
            // Set user ID in session
            $_SESSION['user_id'] = $user['id'];
            
            // Set success response
            $response['success'] = true;
            $response['message'] = "Login successful!";
            
            // Set redirect URL based on user type
            if ($userType == "admin") {
                $response['redirect'] = "admin2.html";
            } else {
                $response['redirect'] = "Home.html";
            }
        } else {
            // Incorrect password
            $response['message'] = "Invalid username or password";
        }
    } else {
        // User doesn't exist
        $response['message'] = "Invalid username or password";
    }
    
    // Close statement
    $stmt->close();
    
    // Return JSON response
    echo json_encode($response);
}


protected function processLogin($sql, $username, $password) {
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            return $user;
        }
    }
    return null;
}

// Close connection
$conn->close();
?>