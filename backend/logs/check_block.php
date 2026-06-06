<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json");

$conn = new mysqli(

    "localhost",

    "root",

    "",

    "mini_splunk"

);

if ($conn->connect_error) {

    die(json_encode([

        "blocked" => false

    ]));

}

$ip = $_GET['ip'];

$sql = "

SELECT *

FROM blocked_ips

WHERE ip_address='$ip'

AND blocked_until > NOW()

";

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    echo json_encode([

        "blocked" => true

    ]);

}

else {

    echo json_encode([

        "blocked" => false

    ]);

}

?>