<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Headers: *");

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

$client_name =
$data['client_name'];

$website_url =
$data['website_url'];

$api_key = md5(

    uniqid()

);

$sql = "

INSERT INTO clients(

    client_name,

    website_url,

    api_key

)

VALUES(

    '$client_name',

    '$website_url',

    '$api_key'

)

";

$conn->query($sql);

echo json_encode([

    "status" => "success"

]);

?>