<?php

function tryToPass($input)
{

    $asyncQuery = new PDO("mysql:host=localhost;dbname=example", "example_manage", "Example_0815");

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