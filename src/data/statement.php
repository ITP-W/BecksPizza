<?php

class StatementService {

    function getHeadSql ($request): string
    {
        $case= $request['method'];
        $sql = "Fehler HeadSQL";

        switch ($case) {
            case "get":
                $sql = "SELECT * FROM `ueberschrift`;";
                break;
            case "set":
                $h = $request["h"];
                $sql = "TRUNCATE `ueberschrift`; INSERT INTO `ueberschrift` (`id`, `head`) VALUES (1, '" . $h . "');";
                break;
        }

        return $sql;
    }

    function getTerminSql ($request): string
    {

        $case= $request['method'];
        $sql = "Fehler TerminSQL";

        switch ($case) {
            case "get":
                $sql = "SELECT * FROM `termin` WHERE id = (SELECT MAX(id) FROM `termin`);";
                break;
            case "set":
                $d = $request
                ["d"];
                $sh = $request
                ["sh"];
                $eh = $request
                ["eh"];
                $i = $request
                ["i"];
                $p = $request
                ["p"];
                $sql = "SET FOREIGN_KEY_CHECKS = 0; TRUNCATE `bestellung`; TRUNCATE `pizza`; TRUNCATE `termin`; SET FOREIGN_KEY_CHECKS = 1; INSERT INTO `termin` (`id`, `date`, `startHH`, `startMM`, `endHH`, `endMM`, `intervall`, `pizzas`) VALUES ('1', '" . $d . "', '" . $sh . "', '0', '" . $eh . "', '0', '" . $i . "', '" . $p . "');";
                break;
        }

        return $sql;
    }

    function getPizzaSql ($request): string
    {

        $case= $request['method'];
        $sql = "Fehler TerminSQL";

        switch ($case) {
            case "get":
                $pid = $request
                ["pid"];
                $sql = "SELECT * FROM `pizza` WHERE `pizza`.`date` = '" . $pid . "';";
                break;
            case "set":
                $i = $request
                ["i"];
                $d = $request
                ["d"];
                $h = $request
                ["h"];
                $m = $request
                ["m"];
                $p = $request
                ["p"];
                $sql = "INSERT INTO `pizza` (`id`, `date`, `timeHH`, `timeMM`, `pizza`) VALUES('" . $i . "', '" . $d . "', '" . $h . "', '" . $m . "', '" . $p . "')";
                break;
        }

        return $sql;
    }

    function getBestellungSql ($request): string
    {

        $case= $request['method'];
        $sql = "Fehler BestellungSQL";

        switch ($case) {
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

        return $sql;
    }

    function getVarianteSql ($request): string
    {

        $case= $request['method'];
        $sql = "Fehler VariantenSQL";

        switch ($case) {
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

        return $sql;
    }

    function getKeySqlStatement ($request): string
    {
        self::logIpAddress($request);
        return "SELECT * FROM `geheimkey`;";
    }

    private function logIpAddress($request){

    }

}