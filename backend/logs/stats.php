<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../config/db.php";

$total_logs = 0;
$high_threats = 0;
$medium_threats = 0;

$result1 = $conn->query(
    "SELECT COUNT(*) as total FROM logs"
);

if($result1) {

    $row = $result1->fetch_assoc();

    $total_logs = $row['total'];
}

$result2 = $conn->query(
    "SELECT COUNT(*) as total
     FROM logs
     WHERE log_level='HIGH'"
);

if($result2) {

    $row = $result2->fetch_assoc();

    $high_threats = $row['total'];
}

$result3 = $conn->query(
    "SELECT COUNT(*) as total
     FROM logs
     WHERE log_level='MEDIUM'"
);

if($result3) {

    $row = $result3->fetch_assoc();

    $medium_threats = $row['total'];
}

echo json_encode([

    "total_logs" => $total_logs,
    "high_threats" => $high_threats,
    "medium_threats" => $medium_threats

]);

?>
