<?php

require_once '../../vendor/autoload.php';

use Twilio\Rest\Client;

// =====================================
// SEND SMS ALERT
// =====================================

function sendSMSAlert(

    $message,

    $ip,

    $level

) {

    // =====================================
    // TWILIO CONFIGURATION
    // =====================================

    $sid = "AC8aaf7bfac31c46e80d73552c7b4b59f5";

    $token = "75bd7191862dc89a2e1ae3e301d0a13f";

    $twilio_number = "+12052364468";

    // =====================================
    // ADMIN PHONE NUMBER
    // =====================================

    $admin_number = "+919392414367";

    try {

        // =====================================
        // CREATE CLIENT
        // =====================================

        $client = new Client(

            $sid,

            $token

        );

        // =====================================
        // SMS CONTENT
        // =====================================

        $sms =

        "HIGH ALERT DETECTED\n\n" .

        "Attack: $message\n" .

        "IP: $ip\n" .

        "Level: $level\n" .

        "Time: " .

        date("Y-m-d H:i:s");

        // =====================================
        // SEND SMS
        // =====================================

        $client->messages->create(

            $admin_number,

            [

                'from' =>

                $twilio_number,

                'body' =>

                $sms

            ]

        );

        return true;

    }

    catch (Exception $e) {

        error_log(

            "SMS Error: " .

            $e->getMessage()

        );

        return false;

    }

}

?>