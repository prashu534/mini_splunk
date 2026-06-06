<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

include "../config/db.php";

$data = json_decode(
    file_get_contents("php://input")
);

$id = $data->id ?? 0;

$stmt = $conn->prepare(

    "DELETE FROM logs
     WHERE id=?"

);

$stmt->bind_param(
    "i",
    $id
);

if($stmt->execute()) {

    echo json_encode([

        "status" => "success",

        "message" => "Log Deleted"

    ]);

} else {

    echo json_encode([

        "status" => "error"

    ]);

}

?>