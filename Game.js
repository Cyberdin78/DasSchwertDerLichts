// --- Spiel-Status und Konstanten ---
let currentTutorialStep = 0;
const gameData = {
    // Hier könnten später Spiel-Variablen wie Gold, Materialien, etc. gespeichert werden
    gold: 0,
    boards: 0,
    stones: 0,
    workers: 0,
    innLevel: 0
};

// Die Sequenz der Tutorial-Schritte und Aktionen
const tutorialSteps = [
    // Schritt 0: Begrüßung
    {
        message: "Sei gegrüßt, Abenteurer! Willkommen in deinem neuen Dorf. Lass uns mit dem Wiederaufbau beginnen.",
        action: null
    },
    // Schritt 1: Gasthaus bauen/upgraden (Hauptgebäude)
    {
        message: "Das wichtigste Gebäude ist das Gasthaus. Es bestimmt die maximale Stufe aller anderen Gebäude. Lass uns Level 1 bauen.",
        action: () => {
            // Hier könnte die Logik für Bau/Upgrade des Gasthauses starten
            // Aktuell nur eine visuelle Änderung und Nachricht
            const inn = document.getElementById('inn');
            inn.innerHTML = '<h3>Gasthaus (Lvl 1)</h3><p>Upgrade-Optionen: Heilung, Lager, Nebenquests</p>';
            gameData.innLevel = 1;
        }
    },
    // Schritt 2: Holzfällerhütte freischalten und erklären
    {
        message: "Wir brauchen Holz. Nun ist es Zeit für die Holzfällerhütte! Sie dient gleichzeitig als Sägewerk und produziert **Logs und Boards**.",
        action: () => {
            const lumberjack = document.getElementById('lumberjack');
            lumberjack.classList.remove('hidden');
        }
    },
    // Schritt 3: Steinbruch freischalten und erklären
    {
        message: "Für Upgrades benötigen wir auch Steine und Lehm. Baue einen Steinbruch. Er produziert **Clay und Stones**.",
        action: () => {
            const quarry = document.getElementById('quarry');
            quarry.classList.remove('hidden');
        }
    },
    // Schritt 4: Erklärung zu Arbeitern
    {
        message: "Achtung: Die Produktionsgeschwindigkeit deiner Gebäude hängt von der Anzahl der **Arbeiter** im Dorf ab. Es ist keine manuelle Zuweisung nötig, aber die maximale Arbeiteranzahl wird vom Wohnhaus bestimmt.",
        action: null
    },
    // Schritt 5: Bauernhof freischalten und erklären
    {
        message: "Um deine Arbeiter zu ernähren und weitere Waren zu bekommen, baue einen Bauernhof. Er produziert **Wheat, Potatoes, Meat und Eggs**.",
        action: () => {
            const farm = document.getElementById('farm');
            farm.classList.remove('hidden');
        }
    },
    // Schritt 6: Wohnhaus freischalten und erklären
    {
        message: "Um mehr Arbeiter aufzunehmen, benötigst du das Wohnhaus. Sein Level bestimmt die **maximale Kapazität** an Arbeitskräften.",
        action: () => {
            const residential = document.getElementById('residential');
            residential.classList.remove('hidden');
        }
    },
    // Schritt 7: Produktionsstart und Lager-Regel
    {
        message: "Die Produktion beginnt automatisch! Wichtig: Alle Produkte verbleiben im jeweiligen Produktionsgebäude (max. 100 pro Level), nicht im Dorflager.",
        action: null
    },
    // Schritt 8: Händler/Markt freischalten und erklären (Einnahmequelle)
    {
        message: "Arbeiter kosten Gold. Um Gold zu verdienen und deine Arbeiter zu bezahlen, besuche den Händler und verkaufe deine Waren. Das ist deine Haupteinnahmequelle.",
        action: () => {
            const market = document.getElementById('market');
            market.classList.remove('hidden');
        }
    },
    // Schritt 9: Erster Turm und Eisenbeschaffung
    {
        message: "Gut gemacht! Jetzt beginnt die Hauptquest: den ersten Turm erkunden. Hierfür brauchst du Gold, Ausrüstung und einen Eisenlieferanten. Die Zeit ist reif für den Schmied.",
        action: () => {
            const firstTower = document.getElementById('first-tower');
            firstTower.classList.remove('hidden');
            // Hinweis: Der Schmied wurde in Schritt 10 implementiert, da es der nächste logische Schritt ist
        }
    },
    // Schritt 10: Schmied freischalten (für Eisennägel/Ausrüstung)
    {
        message: "Der Schmied kann das Eisen deines Lieferanten zu nützlichen Eisennägeln und Ausrüstung verarbeiten. Damit ist das Tutorial abgeschlossen!",
        action: () => {
            const blacksmith = document.getElementById('blacksmith');
            blacksmith.classList.remove('hidden');
        }
    },
    // Schritt 11: Abschluss
    {
        message: "Tutorial abgeschlossen. Klicke, um mit dem Spiel zu beginnen.",
        action: null
    }
];

// Funktion zur Steuerung der Tutorial-Schritte
function nextTutorialStep() {
    // Prüfen, ob noch Schritte übrig sind
    if (currentTutorialStep < tutorialSteps.length) {
        const step = tutorialSteps[currentTutorialStep];
        const tutorialBox = document.getElementById('tutorial-box');
        const tutorialMessage = document.getElementById('tutorial-message');

        // 1. Die Nachricht anzeigen
        tutorialMessage.textContent = step.message;

        // 2. Die Aktion ausführen, falls vorhanden
        if (step.action) {
            step.action();
        }

        // 3. Zum nächsten Schritt übergehen
        currentTutorialStep++;
    } else {
        // Tutorial ist fertig, Container für den Spielfluss vorbereiten
        const tutorialBox = document.getElementById('tutorial-box');
        tutorialBox.style.cursor = 'default';
        tutorialBox.onclick = null;
        document.getElementById('tutorial-message').textContent = "Das Spiel kann nun beginnen!";
    }
}

// Event-Listener zum Starten des Tutorials
document.addEventListener('DOMContentLoaded', () => {
    const tutorialBox = document.getElementById('tutorial-box');
    
    // Den Text für den Start einstellen
    document.getElementById('tutorial-message').textContent = "Klicke hier, um das Tutorial zu starten.";

    // Beim Klick auf die Box zum nächsten Schritt springen
    tutorialBox.onclick = nextTutorialStep;
});
              
