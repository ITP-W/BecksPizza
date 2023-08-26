<?php
require_once('DataBaseService.php');

class QueryService
{
    function query($sql): bool|array
    {
        $asyncQuery = (new DataBaseService)->getDatabase();

        $kommando = $asyncQuery->prepare($sql);
        $kommando->execute();
        $data = $kommando->fetchAll(PDO::FETCH_OBJ);

        return $data;
    }

    function tryToPass($input): string
    {
        $asyncQuery = (new DataBaseService)->getDatabase();
        $sql = "SELECT * FROM 'logkey';";

        $kommando = $asyncQuery->prepare($sql);
        $kommando->execute();
        $data = $kommando->fetch();

        if ($data[0] == $input) return "pass"; else return "fail";
    }
}