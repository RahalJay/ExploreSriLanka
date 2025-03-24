<?php
// Database connection details
$servername = "localhost";
$username = "root"; // Use your MySQL username
$password = "your_password"; // Use your MySQL password
$dbname = "explore_srilanka";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $fullName = $_POST["fullName"];
    $email = $_POST["email"];
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Prepare SQL statement
    $sql = "INSERT INTO users (full_name, email, username, password) 
            VALUES (?, ?, ?, ?)";
    
    // Create prepared statement
    $stmt = $conn->prepare($sql);
    
    // Bind parameters to statement
    $stmt->bind_param("ssss", $fullName, $email, $username, $hashed_password);
    
    // Execute statement and check for success
    if ($stmt->execute()) {
        echo "Registration successful!";
        // Redirect to login page after 3 seconds
        header("refresh:3;url=Login.html");
    } else {
        echo "Error: " . $stmt->error;
    }
    
    // Close statement
    $stmt->close();
}

// Check if username or email already exists
$check_sql = "SELECT * FROM users WHERE username = ? OR email = ?";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("ss", $username, $email);
$check_stmt->execute();
$result = $check_stmt->get_result();

if ($result->num_rows > 0) {
    echo "Username or email already exists!";
    exit;
}
$check_stmt->close();


// Validate and sanitize input
$fullName = filter_var(trim($_POST["fullName"]), FILTER_SANITIZE_STRING);
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$username = filter_var(trim($_POST["username"]), FILTER_SANITIZE_STRING);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email format";
    exit;
}

// Validate username length
if (strlen($username) < 4) {
    echo "Username must be at least 4 characters long";
    exit;
}

// Validate password length
if (strlen($_POST["password"]) < 8) {
    echo "Password must be at least 8 characters long";
    exit;
}

// Close connection
$conn->close();
?>





<?php

/**
 * Singleton Pattern (Ensures a single instance of Database connection)
 */
class Database {
    private static $instance = null;
    private $connection;
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "explore_srilanka";

    private function __construct() {
        $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance->connection;
    }
}

/**
 * Strategy Pattern (For Validation Strategies)
 */
interface ValidationStrategy {
    public function validate($input);
}

class EmailValidation implements ValidationStrategy {
    public function validate($input) {
        return filter_var($input, FILTER_VALIDATE_EMAIL);
    }
}

class PasswordValidation implements ValidationStrategy {
    public function validate($input) {
        return strlen($input) >= 8;
    }
}

class Validator {
    private $strategy;
    
    public function __construct(ValidationStrategy $strategy) {
        $this->strategy = $strategy;
    }
    
    public function validate($input) {
        return $this->strategy->validate($input);
    }
}

/**
 * Template Method Pattern (For Database Query Execution)
 */
abstract class DatabaseModel {
    protected $conn;

    public function __construct() {
        $this->conn = Database::getInstance();
    }

    abstract protected function executeQuery($stmt);

    public function run($stmt) {
        return $this->executeQuery($stmt);
    }
}

class UserModel extends DatabaseModel {
    protected function executeQuery($stmt) {
        return $stmt->execute();
    }
}

/**
 * Observer Pattern (For Notifications)
 */
interface Observer {
    public function update($message);
}

class EmailNotifier implements Observer {
    public function update($message) {
        echo "Email sent: " . $message . "<br>";
    }
}

class UserRegistration {
    private $observers = [];

    public function addObserver(Observer $observer) {
        $this->observers[] = $observer;
    }

    public function notifyObservers($message) {
        foreach ($this->observers as $observer) {
            $observer->update($message);
        }
    }

    public function registerUser($fullName, $email, $username, $password) {
        $conn = Database::getInstance();
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        $sql = "INSERT INTO users (full_name, email, username, password) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $fullName, $email, $username, $hashed_password);

        if ($stmt->execute()) {
            $this->notifyObservers("User $username registered successfully.");
        }
        $stmt->close();
    }
}

// Usage Example
$fullName = "John Doe";
$email = "john@example.com";
$username = "johndoe";
$password = "securepass123";

$emailValidator = new Validator(new EmailValidation());
if (!$emailValidator->validate($email)) {
    die("Invalid email format");
}

$passwordValidator = new Validator(new PasswordValidation());
if (!$passwordValidator->validate($password)) {
    die("Password must be at least 8 characters long");
}

$userRegistration = new UserRegistration();
$userRegistration->addObserver(new EmailNotifier());
$userRegistration->registerUser($fullName, $email, $username, $password);

?>
