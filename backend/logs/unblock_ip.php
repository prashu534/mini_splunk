<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json");

$conn = new mysqli(

    "localhost",

    "root",

    "",

    "mini_splunk"

);

$data = json_decode(

    file_get_contents("php://input"),

    true

);

$id = $data['id'];

$sql = "

DELETE FROM blocked_ips

WHERE id='$id'

";

$conn->query($sql);

echo json_encode([

    "status" => "success"

]);

?>