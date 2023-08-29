<?php
// Database credentials
$host = "localhost";
$username = "root";
$password = "";
$dbname = "dtr"; // database name

try {
    // Create a new PDO instance
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo "Can't Connect to Database";
    exit;
}
?>