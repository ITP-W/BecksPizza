<?php

function getDatabase(): PDO
{
    return new PDO("mysql:host=localhost;dbname=example", "example_manage", "Example_0815");
}


//todo: GoogleDrive mit Ordner für Bilder einrichten. Ordner freigeben und Freigabelink als Pfad eingeben.
function getPictureDir(): string
{
    return "";
}