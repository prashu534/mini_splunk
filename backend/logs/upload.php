<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../config/db.php";

if(isset($_FILES['logfile'])) {

    $file = $_FILES['logfile']['tmp_name'];

    $content = file_get_contents($file);

    $lines = explode("\n", $content);

    foreach($lines as $line) {

        $line = trim($line);

        if(empty($line)) {
            continue;
        }

        /*
        ----------------------------
        Threat Detection Rules
        ----------------------------
        */

        $level = "LOW";

        // SQL Injection Detection
        if(
            stripos($line, "SQL") !== false ||
            stripos($line, "UNION SELECT") !== false ||
            stripos($line, "DROP TABLE") !== false
        ) {

            $level = "HIGH";
        }

        // Brute Force Detection
        elseif(
            stripos($line, "Brute") !== false ||
            stripos($line, "Failed Login") !== false
        ) {

            $level = "MEDIUM";
        }

        // XSS Detection
        elseif(
            stripos($line, "XSS") !== false ||
            stripos($line, "<script>") !== false
        ) {

            $level = "MEDIUM";
        }

        // Port Scan Detection
        elseif(
            stripos($line, "nmap") !== false ||
            stripos($line, "port scan") !== false
        ) {

            $level = "HIGH";
        }

        // Suspicious Admin Access
        elseif(
            stripos($line, "admin login") !== false
        ) {

            $level = "MEDIUM";
        }

        /*
        ----------------------------
        Insert Into Database
        ----------------------------
        */

        $stmt = $conn->prepare(

            "INSERT INTO logs(log_message, log_level)
             VALUES(?, ?)"

        );

        $stmt->bind_param(
            "ss",
            $line,
            $level
        );

        $stmt->execute();
    }

    echo json_encode([

        "status" => "success",

        "message" => "Logs Uploaded Successfully"

    ]);

} else {

    echo json_encode([

        "status" => "error",

        "message" => "No File Uploaded"

    ]);
}

?>