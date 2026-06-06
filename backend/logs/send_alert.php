<?php
date_default_timezone_set('Asia/Kolkata');

/* rest of your code */
// ======================================
// ERROR REPORTING
// ======================================

error_reporting(E_ALL);

ini_set('display_errors', 1);

// ======================================
// IMPORT PHPMailer
// ======================================

use PHPMailer\PHPMailer\PHPMailer;

use PHPMailer\PHPMailer\Exception;

use PHPMailer\PHPMailer\SMTP;

// ======================================
// LOAD PHPMailer FILES
// ======================================

require '../../PHPMailer-7.1.1/PHPMailer/src/Exception.php';

require '../../PHPMailer-7.1.1/PHPMailer/src/PHPMailer.php';

require '../../PHPMailer-7.1.1/PHPMailer/src/SMTP.php';

// ======================================
// SEND THREAT ALERT FUNCTION
// ======================================

function sendThreatAlert(

    $message,

    $ip,

    $level

) {

    // ======================================
    // CREATE MAIL OBJECT
    // ======================================

    $mail = new PHPMailer(true);

    try {

        // ======================================
        // SMTP DEBUG
        // ======================================

        $mail->SMTPDebug = 0;

        // ======================================
        // SMTP CONFIGURATION
        // ======================================

        $mail->isSMTP();

        $mail->Host = 'smtp.gmail.com';

        $mail->SMTPAuth = true;

        // ======================================
        // YOUR GMAIL
        // ======================================

        $mail->Username =
        'prasannakumarreddy843@gmail.com';

        // ======================================
        // GOOGLE APP PASSWORD
        // ======================================

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
        // FROM EMAIL
        // ======================================

        $mail->setFrom(

            'prasannakumarreddy843@gmail.com',

            'Mini Splunk SOC'

        );

        // ======================================
        // RECEIVER EMAIL
        // ======================================

        $mail->addAddress(

            'prasannakumarreddy843@gmail.com'

        );

        // ======================================
        // EMAIL SETTINGS
        // ======================================

        $mail->isHTML(true);

        $mail->Subject =
        '🚨 HIGH THREAT ALERT DETECTED';

        // ======================================
        // EMAIL BODY
        // ======================================

        $mail->Body = "

        <div style='font-family:Arial;padding:20px;'>

            <h2 style='color:red;'>

                🚨 Mini Splunk Threat Alert

            </h2>

            <hr>

            <p>

                <b>Threat Message:</b>

                $message

            </p>

            <p>

                <b>Threat Level:</b>

                $level

            </p>

            <p>

                <b>IP Address:</b>

                $ip

            </p>

            <p>

                <b>Detection Time:</b>
                " . date("d M Y, h:i:s A") . " IST

            </p>

            <hr>

            <p>

                Active Threat Detected by
                Mini Splunk SOC System

            </p>

        </div>

        ";

        // ======================================
        // SEND EMAIL
        // ======================================

        if ($mail->send()) {

            // SUCCESS LOG

            error_log(

                "Threat Alert Email Sent Successfully"

            );

            return true;

        }

        else {

            // ERROR LOG

            error_log(

                "Mailer Send Failed: " .

                $mail->ErrorInfo

            );

            return false;

        }

    }

    catch (Exception $e) {

        // SAVE ERROR

        error_log(

            'Mailer Exception: ' .

            $mail->ErrorInfo

        );

        return false;

    }

}

?>