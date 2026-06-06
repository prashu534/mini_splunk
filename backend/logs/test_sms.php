<?php

require_once '../../vendor/autoload.php';

use Twilio\Rest\Client;

// =====================================
// TWILIO DETAILS
// =====================================

$sid = "AC8aaf7bfac31c46e80d73552c7b4b59f5";

$token = "75bd7191862dc89a2e1ae3e301d0a13f";

$twilio_number = "+12052364468";

// =====================================
// YOUR VERIFIED NUMBER
// =====================================

$to = "+919392414367";

try {

    $client = new Client(

        $sid,

        $token

    );

    $message =

    $client->messages->create(

        $to,

        [

            'from' =>

            $twilio_number,

            'body' =>

            'Mini Splunk SMS Test Working'

        ]

    );

    echo "SMS SENT SUCCESSFULLY";

}

catch (Exception $e) {

    echo $e->getMessage();

}

?>