<?php
include 'db.php';
// Query to retrieve data from your table


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM transactions";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Set headers for CSV download
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="transactions.csv"');
    header('Pragma: no-cache');
    header('Expires: 0');
    header('Content-Length: ' . ob_get_length());
    
    // Output CSV data directly to the browser
    $output = fopen('php://output', 'w');
    fputcsv($output, array('id', 'description', 'amount', 'type', 'dateOfTransaction', 'createdAt', 'updatedAt')); // Adjust column names

    foreach ($data as $row) {
        fputcsv($output, $row);
    }

    fclose($output);
    exit(); // Make sure to exit after output
}
?>