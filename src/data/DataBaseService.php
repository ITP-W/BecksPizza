<?php

class DataBaseService
{
    public function getDatabase(): PDO {
        return new PDO("mysql:host=localhost;dbname=example", "example_manage", "Example_0815");
    }
}