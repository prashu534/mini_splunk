<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json");

// GET IP

$ip =
    $_GET['ip'] ?? '';

// API URL

$url =
    "http://ip-api.com/json/" . $ip;

// FETCH

$response =
    file_get_contents($url);

// RETURN

echo $response;

?>