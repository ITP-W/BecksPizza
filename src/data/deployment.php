<?php

function getDatabase(): PDO
{
    return new PDO("mysql:host=localhost;dbname=example", "example_manage", "Example_0815");
}

function getPictureDir(): string
{
    return "https://drive.google.com/drive/folders/1Ci3J1stBBbv7d7mCKP_qEaLfw2g4j4tW?usp=sharing";
}