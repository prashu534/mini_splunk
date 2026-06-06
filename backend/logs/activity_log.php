<?php

// =====================================
// CORS HEADERS
// =====================================

header(

    "Access-Control-Allow-Origin: *"

);

header(

    "Access-Control-Allow-Methods: POST"

);

header(

    "Access-Control-Allow-Headers: Content-Type"

);

header(

    "Content-Type: application/json"

);

// =====================================
// DATABASE CONNECTION
// =====================================

$conn = new mysqli(

    "localhost",

    "root",

    "",

    "mini_splunk"

);

// =====================================
// DATABASE CHECK
// =====================================

if (

    $conn->connect_error

) {

    die(

        json_encode([

            "status" => "error",

            "message" =>

            "Database Connection Failed"

        ])

    );

}

// =====================================
// LOAD ALERT FILES
// =====================================

require_once "send_alert.php";

require_once "send_sms.php";

// =====================================
// GET POST DATA
// =====================================

$page =

$_POST['page']

?? "Unknown Activity";

// =====================================
// API KEY
// =====================================

$api_key =

$_POST['api_key']

?? "";

// =====================================
// VALIDATE API KEY
// =====================================

$check_api = "

SELECT *

FROM clients

WHERE api_key='$api_key'

";

$api_result =

$conn->query($check_api);

// =====================================
// INVALID CLIENT
// =====================================

if (

    $api_result->num_rows === 0

) {

    $blocked_ip =

    $_SERVER['REMOTE_ADDR']

    ?? "Unknown IP";

    $reason =

    "Unauthorized Client API";

    // SAVE BLOCKED CLIENT

    $block_sql = "

    INSERT INTO blocked_clients(

        api_key,

        ip_address,

        reason

    )

    VALUES(

        '$api_key',

        '$blocked_ip',

        '$reason'

    )

    ";

    $conn->query($block_sql);

    // RESPONSE

    echo json_encode([

        "status" => "blocked",

        "message" =>

        "Unauthorized Client"

    ]);

    exit;

}

// =====================================
// CLIENT DETAILS
// =====================================

$public_ip =

$_POST['public_ip']

?? $_SERVER['REMOTE_ADDR']

?? "Unknown IP";

$browser =

$_POST['browser']

?? $_SERVER['HTTP_USER_AGENT']

?? "Unknown Browser";

$device =

$_POST['device']

?? php_uname();

$country =

$_POST['country']

?? "India";

$city =

$_POST['city']

?? "Hyderabad";

$isp =

$_POST['isp']

?? "Unknown ISP";

$client_name =

$_POST['client_name']

?? "Unknown Client";

// =====================================
// DEFAULT LEVEL
// =====================================

$level = "INFO";

// =====================================
// HIGH ALERTS
// =====================================

if (

    stripos($page, "sql") !== false ||

    stripos($page, "xss") !== false ||

    stripos($page, "traversal") !== false ||

    stripos($page, "malware") !== false ||

    stripos($page, "brute force") !== false ||

    stripos($page, "bruteforce") !== false ||

    stripos($page, "command injection") !== false ||

    stripos($page, "file traversal") !== false

) {

    $level = "HIGH";

}

// =====================================
// LOW ALERTS
// =====================================

else if (

    stripos(

        $page,

        "admin"

    ) !== false ||

    stripos(

        $page,

        "login"

    ) !== false ||

    stripos(

        $page,

        "visit"

    ) !== false ||

    stripos(

        $page,

        "user"

    ) !== false

) {

    $level = "LOW";

}

// =====================================
// ATTACK COUNT SYSTEM
// =====================================

$attack_count = 0;

// CHECK EXISTING IP

$check_ip = "

SELECT *

FROM blocked_ips

WHERE ip_address='$public_ip'

";

$ip_result =

$conn->query($check_ip);

// EXISTING IP

if (

    $ip_result->num_rows > 0

) {

    $row =

    $ip_result->fetch_assoc();

    $attack_count =

    $row['attack_count'];

    // INCREASE ONLY FOR HIGH ALERTS

    if (

        strtoupper($level)

        === "HIGH"

    ) {

        $attack_count++;

        // UPDATE COUNT

        $update_ip = "

        UPDATE blocked_ips

        SET attack_count='$attack_count'

        WHERE ip_address='$public_ip'

        ";

        $conn->query($update_ip);

    }

}

// NEW IP

else {

    // INSERT ONLY HIGH ALERTS

    if (

        strtoupper($level)

        === "HIGH"

    ) {

        $attack_count = 1;

        $insert_ip = "

        INSERT INTO blocked_ips(

            ip_address,

            attack_count

        )

        VALUES(

            '$public_ip',

            '1'

        )

        ";

        $conn->query($insert_ip);

    }

}

// =====================================
// AUTO BLOCK AFTER 20 ATTACKS
// =====================================

$blocked_status = "NO";

if (

    $attack_count >= 5

) {

    $blocked_status = "YES";

}

// =====================================
// INSERT LOG
// =====================================

$sql = "

INSERT INTO logs(

    client_name,

    log_message,

    log_level,

    ip_address,

    browser,

    device_info,

    country,

    city,

    isp,

    blocked_status,

    created_at

)

VALUES(

    '$client_name',

    '$page',

    '$level',

    '$public_ip',

    '$browser',

    '$device',

    '$country',

    '$city',

    '$isp',

    '$blocked_status',

    NOW()

)

";

// =====================================
// SAVE LOG
// =====================================

if (

    $conn->query($sql)

) {

    // =====================================
    // SEND ALERTS ONLY FOR HIGH ALERTS
    // =====================================

    if (

        strtoupper($level)

        === "HIGH"

    ) {

        // EMAIL ALERT

        sendThreatAlert(

            $page,

            $public_ip,

            $level

        );

        // SMS ALERT

        sendSMSAlert(

            $page,

            $public_ip,

            $level

        );

    }

    // =====================================
    // SUCCESS RESPONSE
    // =====================================

    echo json_encode([

        "status" => "success",

        "message" =>

        "Log Recorded Successfully",

        "level" =>

        $level,

        "attack_count" =>

        $attack_count,

        "blocked_status" =>

        $blocked_status

    ]);

}

else {

    // =====================================
    // ERROR RESPONSE
    // =====================================

    echo json_encode([

        "status" => "error",

        "message" =>

        "Failed To Save Log"

    ]);

}

?>