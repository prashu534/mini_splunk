<?php

include "../config/db.php";

$message = "Manual Test Log";

$level = "LOW";

$ip = "127.0.0.1";

$browser = "Chrome";

$device = "Windows";

$stmt = $conn->prepare(

    "INSERT INTO logs
    (
      log_message,
      log_level,
      ip_address,
      browser,
      device_info
    )
    VALUES (?, ?, ?, ?, ?)"

);

$stmt->bind_param(

    "sssss",

    $message,

    $level,

    $ip,

    $browser,

    $device

);

if ($stmt->execute()) {

    echo "INSERT SUCCESS";

} else {

    echo $stmt->error;

}

?>