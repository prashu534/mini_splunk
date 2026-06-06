<?php

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "mini_splunk";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {

    die("Database Failed");

}

?>