<?php
require ('deployment.php');

$ordnerpfad = getPictureDir();
$anzahlBilder = getNumberOfImagesInFolder($ordnerpfad);
$bildNamen = getImageNamesInFolder($ordnerpfad);

function getNumberOfImagesInFolder($ordnerpfad) {
    $anzahlBilder = 0;

    if (is_dir($ordnerpfad)) {
        if ($handle = opendir($ordnerpfad)) {
            while (false !== ($datei = readdir($handle))) {
                if ($datei != "." && $datei != ".." && is_file($ordnerpfad . '/' . $datei) && isImageFile($datei)) {
                    $anzahlBilder++;
                }
            }
            closedir($handle);
        }
    } else {
        echo "Der angegebene Ordner existiert nicht.";
    }

    return $anzahlBilder;
}

function getImageNamesInFolder($ordnerpfad) {
    $bildNamen = [];

    if (is_dir($ordnerpfad)) {
        if ($handle = opendir($ordnerpfad)) {
            while (false !== ($datei = readdir($handle))) {
                if ($datei != "." && $datei != ".." && is_file($ordnerpfad . '/' . $datei) && isImageFile($datei)) {
                    $bildNamen[] = $datei;
                }
            }
            closedir($handle);
        }
    } else {
        echo "Der angegebene Ordner existiert nicht.";
    }

    return $bildNamen;
}

function isImageFile($datei) {
    $erlaubteErweiterungen = ['jpg', 'jpeg', 'png', 'gif'];
    $dateiErweiterung = pathinfo($datei, PATHINFO_EXTENSION);
    return in_array(strtolower($dateiErweiterung), $erlaubteErweiterungen);
}

return array(
    'anzahlBilder' => $anzahlBilder,
    'bildNamen' => $bildNamen
);

