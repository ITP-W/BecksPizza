<?php

function tryToPass($input)
{

    $asyncQuery = new PDO("mysql:host=localhost;dbname=becks-pizza", "becks-pizza", "Z"."u"."e"."f"."l"."e"."P"."a"."$"."$"."w"."0"."r"."d");

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