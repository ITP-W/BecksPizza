<?php

class CarouselService
{
    public function getCarouselData(): array
    {
        require_once('deployment.php');
        $ordnerpfad = getPictureDir();
        $anzahlBilder = self::getNumberOfImagesInFolder($ordnerpfad);
        $bildNamen = self::getImageNamesInFolder($ordnerpfad);

        return array(
            'anzahlBilder' => $anzahlBilder,
            'bildNamen' => $bildNamen
        );
    }

    private function getNumberOfImagesInFolder($ordnerpfad): int
    {
        $anzahlBilder = 0;

        if (is_dir($ordnerpfad)) {
            if ($handle = opendir($ordnerpfad)) {
                while (false !== ($datei = readdir($handle))) {
                    if ($datei != "." && $datei != ".." && is_file($ordnerpfad . '/' . $datei) && self::isImageFile($datei)) {
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

    private function getImageNamesInFolder($ordnerpfad): array
    {
        $bildNamen = [];

        if (is_dir($ordnerpfad)) {
            if ($handle = opendir($ordnerpfad)) {
                while (false !== ($datei = readdir($handle))) {
                    if ($datei != "." && $datei != ".." && is_file($ordnerpfad . '/' . $datei) && self::isImageFile($datei)) {
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

    private function isImageFile($datei): bool
    {
        $erlaubteErweiterungen = ['jpg', 'jpeg', 'png', 'gif'];
        $dateiErweiterung = pathinfo($datei, PATHINFO_EXTENSION);
        return in_array(strtolower($dateiErweiterung), $erlaubteErweiterungen);
    }
}