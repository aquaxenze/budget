<?php
include "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Transaction log
    try {
        $sql = "SELECT * FROM `transactions` ORDER BY `dateOfTransaction` DESC, `createdAt` DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $transactionRows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Initialize variables to store the sums of credit and debit amounts
        $creditTotal = 0;
        $debitTotal = 0;
        $creditCardTotal = 0;
        // Loop through the $transactionRows array and add the amounts based on the type
        foreach ($transactionRows as $row) {
            $amount = (float) $row['amount']; // Convert amount to a float for correct addition

            if ($row['type'] === 'Credit') {
                $creditTotal += $amount;
            } elseif ($row['type'] === 'Debit') {
                $debitTotal += $amount;
            } elseif ($row['type'] === 'CC') {
                $creditCardTotal += $amount;
            }
        }
        $response = array(
            'transactions' => (count($transactionRows) > 0) ? $transactionRows : "No record in database.",
            'totalCredit' => $creditTotal,
            'totalDebit' => $debitTotal,
            'totalCreditCard' => $creditCardTotal,
            'error' => false,
            'errorCode' => 'No Error'
        );
    } catch (PDOException $e) {
        // Handle the exception/error here
        // echo "An error occurred: " . $e->getMessage();
        // echo 'error-1.0';
        $response = array(
            'error' => true,
            'errorCode' => 'error-1.0',
            'errorMsg' => "An error occurred: " . $e->getMessage()
        );
    }

    echo json_encode($response);
} else if (isset($_POST['operation'])) {
    $id = $_POST['id'] ?? null;
    $operation = $_POST['operation'] ?? null;
    $isForgotten = $_POST['isForgotten'] ?? null;
    $description = $_POST['description'] ?? null;
    $amount = $_POST['amount'] ?? null;
    $type = $_POST['type'] ?? null;
    $transactionDate = $_POST['dateOfTransaction']  ?? null;
    $dateTimeToday = date('Y-m-d H:i:s');

    if ($operation === 'add') {
        try {
            $stmt = $conn->prepare("INSERT INTO transactions (description, amount, type, dateOfTransaction, createdAt) VALUES (:description, :amount, :type, :dateOfTransaction, :createdAt)");
            // Bind the parameters
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':amount', $amount);
            $stmt->bindParam(':type', $type);
            $stmt->bindParam(':dateOfTransaction', $transactionDate);
            $stmt->bindParam(':createdAt', $dateTimeToday);
            $stmt->execute();
            echo 'added';
        } catch (PDOException $e) {
            // Handle the exception/error here
            echo "An error occurred: " . $e->getMessage();
            echo 'error-2.0';
            return;
        }
    } else if ($operation === 'save') {
        $timeUpdated = date('Y-m-d H:i:s');
        try {
            $sql = 'UPDATE transactions SET description = :description, amount = :amount, type = :type, dateOfTransaction = :dateOfTransaction, updatedAt = :updatedAt WHERE id = :id';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':amount', $amount);
            $stmt->bindParam(':type', $type);
            $stmt->bindParam(':dateOfTransaction', $transactionDate);
            $stmt->bindParam(':updatedAt', $timeUpdated);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            echo 'updated';
        } catch (PDOException $e) {
            // Handle the exception/error here
            echo "An error occurred: " . $e->getMessage();
            echo 'error-2.1';
        }
    } else if ($operation === 'delete') {
        // PROCESS DELETE
        try {
            $query = "DELETE FROM transactions WHERE id = :id";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            echo 'deleted';
        } catch (PDOException $e) {
            // Handle the exception/error here
            echo "An error occurred: " . $e->getMessage();
            echo 'error-2.2';
        }
    }
} else {
    echo "error-1.0";
}
