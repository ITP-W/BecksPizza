<?php

function query($sql): bool|array
{
    require_once ('deployment.php');
    $asyncQuery = getDatabase();

    $kommando = $asyncQuery->prepare($sql);
    $kommando->execute();
    $data = $kommando->fetchAll(PDO::FETCH_OBJ);

    return $data;
}