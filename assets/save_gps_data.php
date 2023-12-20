<?php
// Stelle sicher, dass diese PHP-Datei sich im selben Verzeichnis wie deine HTML- und JavaScript-Dateien befindet
// oder konfiguriere den Pfad zur PHP-Datei entsprechend.

// Überprüfen, ob die Anfrage eine POST-Anfrage ist
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Empfange die JSON-Daten vom JavaScript
    $content = file_get_contents("php://input");
    $decoded = json_decode($content, true);

    if ($decoded !== null) {
        // GPS-Daten extrahieren
        $latitude = $decoded['latitude'];
        $longitude = $decoded['longitude'];
        
        // Erstelle die Log-Zeile
        $logEntry = "Breitengrad: " . $latitude . ", Längengrad: " . $longitude . "\n";
        
        // Schreibe die Daten in die 'Logs.txt' Datei
        file_put_contents('Logs.txt', $logEntry, FILE_APPEND);
        echo 'GPS-Daten erfolgreich gespeichert';
    } else {
        echo 'Fehler beim Empfangen der Daten';
    }
} else {
    echo 'Nur POST-Anfragen sind erlaubt';
}
?>
