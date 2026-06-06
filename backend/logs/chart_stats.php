<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../config/db.php";

$high = 0;
$medium = 0;
$low = 0;

$result1 = $conn->query(
    "SELECT COUNT(*) as total
     FROM logs
     WHERE log_level='HIGH'"
);

if($result1) {

    $row = $result1->fetch_assoc();

    $high = (int)$row['total'];
}

$result2 = $conn->query(
    "SELECT COUNT(*) as total
     FROM logs
     WHERE log_level='MEDIUM'"
);

if($result2) {

    $row = $result2->fetch_assoc();

    $medium = (int)$row['total'];
}

$result3 = $conn->query(
    "SELECT COUNT(*) as total
     FROM logs
     WHERE log_level='LOW'"
);

if($result3) {

    $row = $result3->fetch_assoc();

    $low = (int)$row['total'];
}

$data = [

    [
        "name" => "HIGH",
        "value" => $high
    ],

    [
        "name" => "MEDIUM",
        "value" => $medium
    ],

    [
        "name" => "LOW",
        "value" => $low
    ]

];

echo json_encode($data);

?>