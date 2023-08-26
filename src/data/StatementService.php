<?php

class StatementService {

    function getHeadSql ($request): string
    {
        $case= $request['method'];

        switch ($case) {
            case "get":
                $sql = "SELECT * FROM `ueberschrift` WHERE `ìd` = 1;";
                break;
            case "set":
                $h = $request["h"];
                $sql = "TRUNCATE `ueberschrift`; INSERT INTO `ueberschrift` (`id`, `head`) VALUES (1, '" . $h . "');";
                break;
            default:
                $sql = "Fehler HeadSQL";
        }

        return $sql;
    }

    function getCarouselSql ($request): string
    {
        $case= $request['method'];

        switch ($case) {
            case "count":
                $sql = "SELECT COUNT('id') AS 'count' FROM `carousel`;";
                break;
            case "get":
                $sql = "SELECT 'link' FROM `carousel`;";
                break;
            case "set":
                $name = $request["name"];
                $link = $request["link"];
                $sql = "INSERT INTO `carousel` (`name`, `link`) VALUES ('" . $name . "', '" . $link . "');";
                break;
            case "drop":
                $name = $request["name"];
                $sql = "DELETE FROM `carousel` WHERE `carousel`.`name` = '" . $name . "';";
                break;
            default:
                $sql = "Fehler CarouselSQL";
        }

        return $sql;
    }

    function getTerminSql ($request): string
    {
        $case= $request['method'];

        switch ($case) {
            case "get":
                $sql = "SELECT * FROM `termin` WHERE `id` = 1;";
                break;
            case "set":
                $date = $request["date"];
                $startHour = $request["startHour"];
                $endHour = $request["endHour"];
                $intervall = $request["intervall"];
                $pizzas = $request["pizzas"];
                $sql = "SET FOREIGN_KEY_CHECKS = 0; TRUNCATE `bestellung`; TRUNCATE `pizza`; TRUNCATE `termin`; SET FOREIGN_KEY_CHECKS = 1; INSERT INTO `termin` (`id`, `date`, `startHH`, `startMM`, `endHH`, `endMM`, `intervall`, `pizzas`) VALUES ('1', '" . $date . "', '" . $startHour . "', '0', '" . $endHour . "', '0', '" . $intervall . "', '" . $pizzas . "');";
                break;
            default:
                $sql = "Fehler TerminSQL";
        }

        return $sql;
    }

    function getPizzaSql ($request): string
    {
        $case= $request['method'];

        switch ($case) {
            case "get":
                $date = $request["date"];
                $sql = "SELECT * FROM `pizza` WHERE `pizza`.`date` = '" . $date . "';";
                break;
            case "set":
                $id = $request["id"];
                $date = $request["date"];
                $hour = $request["hour"];
                $minutes = $request["minutes"];
                $pizza = $request["pizza"];
                $sql = "INSERT INTO `pizza` (`id`, `date`, `timeHH`, `timeMM`, `pizza`) VALUES('" . $id . "', '" . $date . "', '" . $hour . "', '" . $minutes . "', '" . $pizza . "')";
                break;
            default:
                $sql = "Fehler PizzaSQL";
        }

        return $sql;
    }

    function getBestellungSql ($request): string
    {
        $case= $request['method'];

        switch ($case) {
            case "get":
                $sql = "SELECT `bestellung`.`vorn`, `bestellung`.`nachn`, `bestellung`.`pizza`, `bestellung`.`variante` FROM `bestellung`;";
                break;
            case "set":
                $vorn = $request["vorn"];
                $nachn = $request["nachn"];
                $pizza = $request["pizza"];
                $variante = $request["variante"];
                $sql = "INSERT INTO `bestellung` (`vorn`, `nachn`, `pizza`, `variante`) VALUES ('" . $vorn . "', '" . $nachn . "', '" . $pizza . "', '" . $variante . "');";
                break;
            case "drop":
                $pizza = $request["pizza"];
                $sql = "DELETE FROM `bestellung` WHERE `bestellung`.`pizza` = '" . $pizza . "';";
                break;
            default:
                $sql = "Fehler BestellungSQL";
        }

        return $sql;
    }

    function getVarianteSql ($request): string
    {
        $case= $request['method'];

        switch ($case) {
            case "get":
                $sql = "SELECT * FROM `variante`;";
                break;
            case "set":
                $name = $request["name"];
                $beschreibung = $request["beschreibung"];
                $sql = "INSERT INTO `variante` (`id`, `name`, `beschreibung`) VALUES ('', '". $name ."', '" . $beschreibung . "');";
                break;
            case "drop":
                $id = $request["id"];
                $sql = "DELETE FROM `variante` WHERE `variante`.`id` = " . $id . ";";
                break;
            default:
                $sql = "Fehler VariantenSQL";
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