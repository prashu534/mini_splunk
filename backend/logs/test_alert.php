<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ======================================
// LOAD PHPMailer FILES
// ======================================

require '../../PHPMailer-7.1.1/PHPMailer/src/Exception.php';
require '../../PHPMailer-7.1.1/PHPMailer/src/PHPMailer.php';
require '../../PHPMailer-7.1.1/PHPMailer/src/SMTP.php';

// ======================================
// CREATE MAIL OBJECT
// ======================================

$mail = new PHPMailer(true);

try {

    // ======================================
    // ENABLE SMTP
    // ======================================

    $mail->isSMTP();

    // ======================================
    // SMTP SETTINGS
    // ======================================

    $mail->Host = 'smtp.gmail.com';

    $mail->SMTPAuth = true;

    // YOUR GMAIL

    $mail->Username =
    'prasannakumarreddy843@gmail.com';

    // GOOGLE APP PASSWORD
    // NO SPACES
    // NO ENTER KEY

    $mail->Password =
    'vogpmxlaymblbvcf';

    // ======================================
    // ENCRYPTION
    // ======================================

    $mail->SMTPSecure =
    PHPMailer::ENCRYPTION_STARTTLS;

    // ======================================
    // PORT
    // ======================================

    $mail->Port = 587;

    // ======================================
    // DEBUG MODE
    // ======================================

    $mail->SMTPDebug = 2;

    // ======================================
    // FROM
    // ======================================

    $mail->setFrom(

        'prasannakumarreddy843@gmail.com',

        'Mini Splunk'

    );

    // ======================================
    // TO
    // ======================================

    $mail->addAddress(

        'prasannakumarreddy843@gmail.com'

    );

    // ======================================
    // EMAIL CONTENT
    // ======================================

    $mail->isHTML(true);

    $mail->Subject =
    '🚨 Mini Splunk SMTP Test';

    $mail->Body = '

    <h2 style="color:red;">

    SMTP Test Working

    </h2>

    <hr>

    <b>Status:</b>

    Email Alert System Active

    <br><br>

    <b>Time:</b>

    ' . date("Y-m-d H:i:s") . '

    ';

    // ======================================
    // SEND MAIL
    // ======================================

    $mail->send();

    echo "

    <h2 style='color:green;'>

    MAIL SENT SUCCESSFULLY

    </h2>

    ";

}

catch (Exception $e) {

    echo "

    <h2 style='color:red;'>

    MAIL FAILED

    </h2>

    ";

    echo "<br>";

    echo $mail->ErrorInfo;

}

?>