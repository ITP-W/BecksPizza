<?php
require('passage.php');

$asyncQuery = new PDO("mysql:host=localhost;dbname=example", "example_manage", "Example_0815");

$method = $_GET["method"];
$target = $_GET["target"];

switch ($target) {
    case "head":
        switch ($method){
            case "get":
                $sql = "SELECT * FROM `ueberschrift`;";
                break;
            case "set":
                $h = $_GET["h"];
                $sql = "TRUNCATE `ueberschrift`; INSERT INTO `ueberschrift` (`id`, `head`) VALUES (1, '" . $h . "');";
                break;
        }
        break;
    case "termin":
        switch ($method) {
            case "get":
                $sql = "SELECT * FROM `termin` WHERE id = (SELECT MAX(id) FROM `termin`);";
                break;
            case "set":
                $d = $_GET["d"];
                $sh = $_GET["sh"];
                $eh = $_GET["eh"];
                $i = $_GET["i"];
                $p = $_GET["p"];
                $sql = "SET FOREIGN_KEY_CHECKS = 0; TRUNCATE `bestellung`; TRUNCATE `pizza`; TRUNCATE `termin`; SET FOREIGN_KEY_CHECKS = 1; INSERT INTO `termin` (`id`, `date`, `startHH`, `startMM`, `endHH`, `endMM`, `intervall`, `pizzas`) VALUES ('1', '" . $d . "', '" . $sh . "', '0', '" . $eh . "', '0', '" . $i . "', '" . $p . "');";
                break;
        }
        break;
    case "pizza":
        switch ($method) {
            case "get":
                $pid = $_GET["pid"];
                $sql = "SELECT * FROM `pizza` WHERE `pizza`.`date` = '" . $pid . "';";
                break;
            case "set":
                $i = $_GET["i"];
                $d = $_GET["d"];
                $h = $_GET["h"];
                $m = $_GET["m"];
                $p = $_GET["p"];
                $sql = "INSERT INTO `pizza` (`id`, `date`, `timeHH`, `timeMM`, `pizza`) VALUES('" . $i . "', '" . $d . "', '" . $h . "', '" . $m . "', '" . $p . "')";
                break;
        }
        break;
    case "bestellung":
        switch ($method) {
            case "get":
                $sql = "SELECT `bestellung`.`vorn`, `bestellung`.`nachn`, `bestellung`.`pizza`, `bestellung`.`variante` FROM `bestellung`;";
                break;
            case "set":
                $vn = $_GET["vn"];
                $nn = $_GET["nn"];
                $pi = $_GET["pi"];
                $v = $_GET["v"];
                $sql = "INSERT INTO `bestellung` (`vorn`, `nachn`, `pizza`, `variante`) VALUES ('" . $vn . "', '" . $nn . "', '" . $pi . "', '" . $v . "');";
                break;
            case "drop":
                $p = $_GET["p"];
                $sql = "DELETE FROM `bestellung` WHERE `bestellung`.`pizza` = '" . $p . "';";
                break;
        }
        break;
    case "variante":
        switch ($method) {
            case "get":
                $sql = "SELECT * FROM `variante`;";
                break;
            case "set":
                $n = $_GET["n"];
                $b = $_GET["b"];
                $sql = "INSERT INTO `variante` (`id`, `name`, `beschreibung`) VALUES ('', '". $n ."', '" . $b . "');";
                break;
            case "drop":
                $p = $_GET["p"];
                $sql = "DELETE FROM `bestellung` WHERE `bestellung`.`variante` = '" . $p . "';
                        DELETE FROM `variante` WHERE `variante`.`id` = " . $p . ";";
                break;
        }
        break;
    case "key":
        $sql = "SELECT * FROM bestellung WHERE bestellung.id < 1;";
        $result = tryToPass($method);
        break;
    default:
        $sql = "SELECT * FROM termin WHERE termin.id < 1;";
}


$kommando = $asyncQuery->prepare($sql);
$kommando->execute();
$data = $kommando->fetchAll(PDO::FETCH_OBJ);


switch ($target) {
    case "head":
        switch ($method) {
            case "get":
                if (count($data) > 0) {
                    foreach ($data as $heading) {
                        echo ',' .$heading->id.',' . $heading->head;
                    }
                } else {
                    echo '!Keine Datensätze gefunden!';
                }
                break;
            case "set":
                echo "done";
                break;
        }
        break;
    case "termin":
        switch ($method) {
            case "get":
                if (count($data) > 0) {
                    foreach ($data as $day) {
                        echo ',' . $day->id . ',' . $day->date . ',' . $day->startHH . ',' . $day->startMM . ',' . $day->endHH . ',' . $day->endMM . ',' . $day->intervall . ',' . $day->pizzas;
                    }
                } else {
                    echo '!Keine Datensätze gefunden!';
                }
                break;
            case "set":
                echo "done";
                break;
        }
        break;
    case "pizza":
        switch ($method) {
            case "get":
                if (count($data) > 0) {
                    foreach ($data as $pizza) {
                        echo ',' . $pizza->id . ',' . $pizza->date . ',' . $pizza->timeHH . ',' . $pizza->timeMM . ',' . $pizza->pizza;
                    }
                } else {
                    echo '!Keine Datensätze gefunden!';
                }
                break;
            case "set":
                echo "done";
                break;
        }
        break;
    case "bestellung":
        switch ($method) {
            case "get":
                if (count($data) > 0) {
                    foreach ($data as $bestellung) {
                        echo ',' . $bestellung->vorn . ',' . $bestellung->nachn . ',' . $bestellung->pizza . ',' . $bestellung->variante;
                    }
                } else {
                    echo '!Keine Datensätze gefunden!';
                }
                break;
            case "set":
            case "drop":
                echo "done";
                break;
        }
        break;
    case "variante":
        switch ($method) {
            case "get":
                if (count($data) > 0) {
                    foreach ($data as $variante) {
                        echo ',' . $variante->id . ',' . $variante->name . ',' . $variante->beschreibung;
                    }
                } else {
                    echo '!Keine Datensätze gefunden!';
                }
                break;
            case "set":
            case "drop":
                echo "done";
                break;
        }
        break;
    case "key":
        echo $result;
}