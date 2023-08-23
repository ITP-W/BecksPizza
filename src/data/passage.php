<?php

function tryToPass($input): string
{
    require_once ('deployment.php');
    $asyncQuery = (new DeploymentService)->getDatabase();
    $sql = "SELECT * FROM 'logkey';";

    $kommando = $asyncQuery->prepare($sql);
    $kommando->execute();
    $data = $kommando->fetch();

    if ($data[0] == $input) return "pass"; else return "fail";
}