<?php

error_reporting(E_ALL);

ini_set('display_errors', 1);

// DATABASE

$conn = new mysqli(

    "localhost",

    "root",

    "",

    "mini_splunk"

);

// CONNECTION CHECK

if ($conn->connect_error) {

    die("Database Connection Failed");

}

// CSV HEADERS

header("Content-Type: text/csv");

header(

    "Content-Disposition: attachment; filename=security_logs.csv"

);

// OUTPUT

$output = fopen(

    "php://output",

    "w"

);

// COLUMN HEADERS

fputcsv($output, [

    "ID",

    "Message",

    "Level",

    "IP Address",

    "Browser",

    "Device",

    "Country",

    "City",

    "ISP",

    "Created Time"

]);

// FETCH LOGS

$sql = "

SELECT *

FROM logs

ORDER BY id DESC

";

$result = $conn->query($sql);

// WRITE CSV

if ($result) {

    while (

        $row = $result->fetch_assoc()

    ) {

        fputcsv($output, [

            isset($row['id'])

                ? $row['id']

                : "",

            isset($row['log_message'])

                ? $row['log_message']

                : "",

            isset($row['log_level'])

                ? $row['log_level']

                : "",

            isset($row['ip_address'])

                ? $row['ip_address']

                : "",

            isset($row['browser'])

                ? $row['browser']

                : "",

            isset($row['device_info'])

                ? $row['device_info']

                : "",

            isset($row['country'])

                ? $row['country']

                : "",

            isset($row['city'])

                ? $row['city']

                : "",

            isset($row['isp'])

                ? $row['isp']

                : "",

            isset($row['created_at'])

                ? $row['created_at']

                : ""

        ]);

    }

}

fclose($output);

$conn->close();

exit();

?>