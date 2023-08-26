<?php

$target = $_GET["target"];
$method = $_GET["method"];

switch ($target) {
    case "carousel":
        require_once ('StatementService.php');
        require_once ('QueryService.php');
        $sql = (new StatementService())->getCarouselSql($_GET);
        $data = (new QueryService())->query($sql);
        if ($method === "count"){
            $count = $data["count"];
            if (is_int($count) and !empty($count)){
                echo $count;
            } else {
                echo '!Keine Datensätze gefunden!';
            }
        }
        elseif ($method === "get") {
            if (is_array($data) and !empty($data)) {
                $pictureString = "";
                foreach ($data as $picture) {
                    $pictureString = $pictureString . ',' . $picture;
                }
                echo $pictureString;
            } else {
                echo '!Keine Datensätze gefunden!';
            }
        }
        elseif ($method === "set" or $method === "drop"){
            echo "done";
        }
        break;
    case "head":
        require_once ('StatementService.php');
        require_once ('QueryService.php');
        $sql = (new StatementService)->getHeadSql($_GET);
        $data = (new QueryService())->query($sql);
        switch ($method) {
            case "get":
                if (is_array($data) and !empty($data)) {
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
        require_once ('StatementService.php');
        require_once ('QueryService.php');
        $sql = (new StatementService)->getTerminSql($_GET);
        $data = (new QueryService())->query($sql);
        switch ($method) {
            case "get":
                if (is_array($data) and !empty($data)) {
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
        require_once ('StatementService.php');
        require_once ('QueryService.php');
        $sql = (new StatementService)->getPizzaSql($_GET);
        $data = (new QueryService())->query($sql);
        switch ($method) {
            case "get":
                if (is_array($data) and !empty($data)) {
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
        require_once ('StatementService.php');
        require_once ('QueryService.php');
        $sql = (new StatementService)->getBestellungSql($_GET);
        $data = (new QueryService())->query($sql);
        switch ($method) {
            case "get":
                if (is_array($data) and !empty($data)) {
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
        require_once ('StatementService.php');
        require_once ('QueryService.php');
        $sql = (new StatementService)->getVarianteSql($_GET);
        $data = (new QueryService())->query($sql);
        switch ($method) {
            case "get":
                if (is_array($data) and !empty($data)) {
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
        require_once ('StatementService.php');
        require_once ('QueryService.php');
        $sql = (new StatementService)->getKeySqlStatement($_GET);
        $data = (new QueryService())->tryToPass($method);
        echo $data;
        break;
}
