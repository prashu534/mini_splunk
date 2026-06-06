<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json");

$conn = new mysqli(

    "localhost",

    "root",

    "",

    "mini_splunk"

);

$sql = "

SELECT *

FROM clients

ORDER BY id DESC

";

$result = $conn->query($sql);

$data = [];

while (

    $row = $result->fetch_assoc()

) {

    $data[] = $row;

}

echo json_encode($data);

?>