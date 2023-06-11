<?php
require('deployment.php');

function tryToPass($input)
{

    $asyncQuery = new PDO(getDatabase());

    $sql = "SELECT * FROM logkey;";

    $kommando = $asyncQuery->prepare($sql);
    $kommando->execute();
    $data = $kommando->fetch();

    if ($data[0] == $input) {
        return "pass";
    } else {
        return "fail";
    }
}