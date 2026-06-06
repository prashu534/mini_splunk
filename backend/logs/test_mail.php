<?php

require 'send_alert.php';

$result = sendThreatAlert(

    "SQL Injection Attack",

    "7.7.7.7",

    "HIGH"

);

if ($result) {

    echo "EMAIL SENT SUCCESSFULLY";

}

else {

    echo "EMAIL FAILED";

}

?>