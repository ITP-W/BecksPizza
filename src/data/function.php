<?php
require ('carousel.php');
require ('statement.php');
require ('passage.php');

$method = $_GET["method"];
$target = $_GET["target"];
$db = false;

switch ($target) {
    case "carousel":
        $carousel_data = (new CarouselService)->getCarouselData();
        $anzahlBilder = $carousel_data['anzahlBilder'];
        $bildNamen = $carousel_data['bildNamen'];
        break;
    case "head":
        $db = true;
        $sql = (new StatementService)->getHeadSql($_GET);
        break;
    case "termin":
        $db = true;
        $sql = (new StatementService)->getTerminSql($_GET);
        break;
    case "pizza":
        $db = true;
        $sql = (new StatementService)->getPizzaSql($_GET);
        break;
    case "bestellung":
        $db = true;
        $sql = (new StatementService)->getBestellungSql($_GET);
        break;
    case "variante":
        $db = true;
        $sql = (new StatementService)->getVarianteSql($_GET);
        break;
    case "key":
        $db = true;
        $sql = (new StatementService)->getKeySqlStatement($_GET);
        $result = tryToPass($method);
        break;
}

if ($db) {
    require_once ('query.php');
    $data = query($sql);
}


switch ($target) {
    case "carousel":
        switch ($method) {
            case "get":
                if ($anzahlBilder > 0 && $anzahlBilder != null) {
                    echo "," . $anzahlBilder . "," . implode(',', $bildNamen);
                } else {
                    echo '!Keine Datensätze gefunden!';
                }
                break;
            case "set":
                echo "done";
                break;
        }
        break;
    case "head":
        switch ($method) {
            case "get":
                if (count($data) > 0) {
                    foreach ($data as $heading) {
                        echo ',' .$heading->id. ',' . $heading->head;
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