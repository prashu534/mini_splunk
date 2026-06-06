<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json");

// DATABASE

$conn = new mysqli(

    "localhost",

    "root",

    "",

    "mini_splunk"

);

// CHECK

if ($conn->connect_error) {

    die(

        json_encode([

            "status" => "error"

        ])

    );

}

// FETCH LOGS

$sql =

"SELECT * FROM logs
 ORDER BY id DESC";

$result = $conn->query($sql);

$logs = [];

while (

    $row = $result->fetch_assoc()

) {

    $logs[] = $row;

}

// RETURN JSON

echo json_encode($logs);

$conn->close();

?>