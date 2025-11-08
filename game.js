// ================================================================================
// Das Schwert des Lichts - Logik (Version 0.0.1)
// Das Skript steuert den Einführungs-Ablauf und initialisiert den Spiel-Status.
// ================================================================================

// --- Spiel-Status und Konstanten ---
let currentTutorialStep = 0;
const gameData = {
    // Initialer Status für das Spiel
    gold: 0,
    boards: 0,
    stones: 0,
    workers: 0,
    innLevel: 0,
    // Bauen in Level 1 ist kostenlos
    costLvl1: { boards: 0, stones: 0, nails: 0 }
};

// Die Sequenz der Tutorial-Schritte
const tutorialSteps = [
    // Schritt 0: Begrüßung (Flehender Dorfbewohner)
    {
        message: "Willkommen, mutiger Abenteurer! Das Dorf braucht Deine Führung. Unsere erste Aufgabe: Das Hauptgebäude, das Gasthaus, ausbauen. Klicke, um fortzufahren.",
        action: null
    },
    // Schritt 1: Gasthaus errichten (Das Zentrum der Macht) - Gasthaus ist bereits Lvl 1 (free build)
    {
        message: "Das wichtigste Gebäude ist unser **Gasthaus**! Es bestimmt die maximale Stufe aller anderen Gebäude. Level 1 ist errichtet. Für Upgrades brauchen wir jetzt **Materialien** (Bretter, Steine, Nägel).",
        action: () => {
            // Gasthaus auf Level 1 setzen und Text anpassen
            document.getElementById('inn').innerHTML = '<h3>Gasthaus (Lvl 1)</h3><p>Herz des Dorfes. Max. Gebäudelvl: 1. Kapazität: 100.</p>';
            gameData.innLevel = 1;
        }
    },
    // Schritt 2: Holzfällerhütte/Sägewerk errichten (Bretter & Stämme)
    {
        message: "Wir brauchen Holz! Baue die **Holzfällerhütte/Sägewerk** (Level 1, kostenlos), um **Holzstämme und Bretter** zu produzieren. Klicke auf den Button, um zu bauen.",
        action: () => {
            const lumberjackButton = document.getElementById('lumberjack');
            lumberjackButton.classList.remove('hidden');
            lumberjackButton.onclick = () => {
                // Gebäude bauen und zum nächsten Schritt gehen
                lumberjackButton.textContent = 'Holzfällerhütte (Gebaut, Lvl 1)';
                lumberjackButton.disabled = true;
                nextTutorialStep();
            };
        }
    },
    // Schritt 3: Steinbruch errichten (Steine & Lehm)
    {
        message: "Jetzt brauchen wir Steine und Lehm. Errichte den **Steinbruch** (Level 1, kostenlos), der uns mit **Lehm und Steinen** versorgt.",
        action: () => {
            const quarryButton = document.getElementById('quarry');
            quarryButton.classList.remove('hidden');
            quarryButton.onclick = () => {
                quarryButton.textContent = 'Steinbruch (Gebaut, Lvl 1)';
                quarryButton.disabled = true;
                nextTutorialStep();
            };
        }
    },
    // Schritt 4: Erklärung Arbeiter (Produktionsgrundlage)
    {
        message: "Die Produktion in Holzfäller und Steinbruch ist gestartet, aber sehr langsam. Wir brauchen **Arbeiter**! Arbeiter kosten Gold und brauchen Nahrung und Wohnraum.",
        action: null
    },
    // Schritt 5: Bauernhof errichten (Nahrungsproduktion & Tatsächliche Arbeiteranzahl)
    {
        message: "Errichte den **Bauernhof** (Level 1, kostenlos). Er liefert uns **Nahrung (Weizen, Kartoffeln, Fleisch, Eier)**. Sein Level bestimmt die **tatsächliche Anzahl der Arbeiter**.",
        action: () => {
            const farmButton = document.getElementById('farm');
            farmButton.classList.remove('hidden');
            farmButton.onclick = () => {
                farmButton.textContent = 'Bauernhof (Gebaut, Lvl 1)';
                farmButton.disabled = true;
                nextTutorialStep();
            };
        }
    },
    // Schritt 6: Wohnhaus errichten (Maximale Arbeitskraft-Limit)
    {
        message: "Die Arbeiter benötigen auch Wohnraum. Das **Wohnhaus** (Level 1, kostenlos) legt unsere **maximale Arbeitskraftkapazität** fest.",
        action: () => {
            const residentialButton = document.getElementById('residential');
            residentialButton.classList.remove('hidden');
            residentialButton.onclick = () => {
                residentialButton.textContent = 'Wohnhaus (Gebaut, Lvl 1)';
                residentialButton.disabled = true;
                nextTutorialStep();
            };
        }
    },
    // Schritt 7: Produktionsbeginn und Lagerung (Die Regel)
    {
        message: "Die Produktion hat begonnen! Die Geschwindigkeit hängt von den Gebäudelvl und der Arbeiteranzahl ab. Wichtig: Waren verbleiben **direkt im Produktionsgebäude** (begrenzt auf 100 pro Level).",
        action: null
    },
    // Schritt 8: Markt errichten (Der Goldkreislauf: Verkauf zur Bezahlung der Arbeiter)
    {
        message: "**Achtung! Arbeiter kosten Gold!** Um sie zu bezahlen und ihre Motivation aufrechtzuerhalten, musst du Waren verkaufen. Errichte den **Markt/Händler** (Level 1, kostenlos), Deine Haupteinnahmequelle.",
        action: () => {
            const marketButton = document.getElementById('market');
            marketButton.classList.remove('hidden');
            marketButton.onclick = () => {
                marketButton.textContent = 'Markt/Händler (Gebaut, Lvl 1)';
                marketButton.disabled = true;
                nextTutorialStep();
            };
        }
    },
    // Schritt 9: Der Ruf des Abenteuers (Erster Turm & Eisen-Lieferant)
    {
        message: "Der Goldkreislauf steht. Nun fehlt das letzte Baumaterial: **Eisennägel**. Diese benötigen **alte Eisenteile**, die in den Dungeons zu finden sind. Der **Erste Turm** (Dungeon) ist freigeschaltet!",
        action: () => {
            const towerButton = document.getElementById('first-tower');
            towerButton.classList.remove('hidden');
            towerButton.disabled = false; // Turm freischalten
            towerButton.onclick = () => {
                // Simulierter Besuch des Turms
                document.getElementById('tutorial-message').textContent = 'Du hast den ersten Turm besucht und **alte Eisenteile** für den Schmied gefunden!';
                // Wenn der Spieler den Turm betritt, geht das Tutorial zum nächsten Schritt über.
                currentTutorialStep++; // Wichtig: Wir müssen den Schritt manuell erhöhen, da der Klick-Handler überschrieben wird
                nextTutorialStep(true); // Rufe den nächsten Schritt (Schmied) ohne erneuten Klick auf die Box auf
            };
        }
    },
    // Schritt 10: Schmied errichten (Veredelung und Nägel)
    {
        message: "Du hast alte Eisenteile! Baue den **Schmied** (Level 1, kostenlos), um diese in **Eisennägel** umzuwandeln. Jetzt ist der Materialkreislauf geschlossen!",
        action: () => {
            const blacksmithButton = document.getElementById('blacksmith');
            blacksmithButton.classList.remove('hidden');
            blacksmithButton.onclick = () => {
                blacksmithButton.textContent = 'Schmied (Gebaut, Lvl 1)';
                blacksmithButton.disabled = true;
                nextTutorialStep();
            };
        }
    },
    // Schritt 11: Abschluss
    {
        message: "Herzlichen Glückwunsch! Das Dorf steht (v0.0.1). Du hast nun Zugang zu allen grundlegenden Materialien: **Holzbretter, Steine, Eisennägel**. Das eigentliche Spiel beginnt jetzt mit dem **Ausbau des Gasthauses**!",
        action: () => {
             // Deaktiviere den Klick auf die Tutorial-Box
             document.getElementById('tutorial-box').style.cursor = 'default';
             document.getElementById('tutorial-box').onclick = null;
        }
    }
];

// Funktion zur Steuerung der Tutorial-Schritte
// Der Parameter 'skipStepCheck' wird für Aktionen wie den Turmbesuch verwendet
function nextTutorialStep(skipStepCheck = false) {
    if (skipStepCheck || currentTutorialStep < tutorialSteps.length) {
        const step = tutorialSteps[currentTutorialStep];
        const tutorialMessage = document.getElementById('tutorial-message');

        // 1. Die Nachricht anzeigen
        tutorialMessage.textContent = step.message;

        // 2. Die Aktion ausführen, falls vorhanden
        if (step.action) {
            step.action();
        }

        // 3. Nur zum nächsten Schritt übergehen, wenn keine Aktion den Übergang steuert
        if (!step.action || step.action.toString().indexOf('nextTutorialStep();') === -1) {
            currentTutorialStep++;
        }
    } else {
        // Optional: Letzten Zustand fixieren, falls das Array unerwartet leer ist
        document.getElementById('tutorial-message').textContent = "Das Tutorial ist abgeschlossen!";
    }
}

// Event-Listener zum Starten des Tutorials
document.addEventListener('DOMContentLoaded', () => {
    const tutorialBox = document.getElementById('tutorial-box');
    
    // Den Start-Text einstellen
    document.getElementById('tutorial-message').textContent = tutorialSteps[0].message;

    // Beim Klick auf die Box zum nächsten Schritt springen
    // Wir starten bei Schritt 1, da Schritt 0 bereits angezeigt wird
    tutorialBox.onclick = () => {
        if (currentTutorialStep === 0) {
            currentTutorialStep = 1;
        }
        nextTutorialStep();
    };
});
                
