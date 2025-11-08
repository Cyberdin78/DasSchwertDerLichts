// ================================================================================
// Das Schwert des Lichts - Logik (Version 0.0.2 - Finale Tutorial-Texte & Technik)
// Der Fokus liegt auf dem Wiederaufbau des Dorfes.
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
    // Schritt 0: Begrüßung (FINAL)
    {
        message: "Willkommen, Fremder! Grausame **Kreaturen** haben unser Dorf überfallen und alles zerstört. Bitte, helft uns beim Wiederaufbau! Wir beginnen mit dem **Gasthaus**. **Klickt** auf diese Nachricht, um fortzufahren.",
        action: null
    },
    // Schritt 1: Gasthaus errichten (FINAL)
    {
        message: "Das **Gasthaus** ist der erste Schritt zum Überleben! Es ist unser Hauptgebäude. Hier könnt Ihr Euch **heilen**, **Gegenstände lagern** und **Informationen** von Reisenden erhalten. Es ist fertiggestellt!",
        action: () => {
            // Gasthaus auf Level 1 setzen und Text anpassen (ohne Level-Info im Text)
            document.getElementById('inn').innerHTML = '<h3>Gasthaus</h3><p>Heilung, Lager, Quests.</p>';
            gameData.innLevel = 1;
        }
    },
    // Schritt 2: Holzfällerhütte/Sägewerk errichten
    {
        message: "Wir brauchen Holz für den Wiederaufbau! Bitte errichtet die **Holzfällerhütte/Sägewerk**, damit wir **Holzstämme und Bretter** für die Gebäudefertigung erhalten.",
        action: () => {
            const lumberjackButton = document.getElementById('lumberjack');
            lumberjackButton.classList.remove('hidden');
            lumberjackButton.onclick = () => {
                lumberjackButton.textContent = 'Holzfällerhütte (Gebaut, Lvl 1)';
                lumberjackButton.disabled = true;
                nextTutorialStep();
            };
        }
    },
    // Schritt 3: Steinbruch errichten
    {
        message: "Neben dem Holz brauchen wir Steine. Errichtet den **Steinbruch**, um unsere Vorräte an **Lehm und robusten Steinen** aufzufüllen.",
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
    // Schritt 4: Bauernhof errichten
    {
        message: "Die Menschen brauchen Nahrung! Errichtet den **Bauernhof**. Er wird uns mit **Weizen, Kartoffeln, Fleisch und Eiern** versorgen.",
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
    // Schritt 5: Wohnhaus errichten
    {
        message: "Um mehr Menschen dauerhaft im Dorf zu halten, brauchen sie ein Zuhause. Bitte errichtet ein **Wohngebäude** für die Dorfgemeinschaft.",
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
    // Schritt 6: Produktions-Aktivierung (NEU)
    {
        message: "Die Dorfgemeinschaft ist da und beginnt mit der Arbeit! **Die Geschwindigkeit und der Umfang der Produktion** hängen nun von den Levels des **Bauernhofs** und des **Wohngebäudes** ab.",
        action: null
    },
    // Schritt 7: Produktions-Lagerregel
    {
        message: "Die Warenproduktion läuft! Denkt daran: **Alle hergestellten Waren verbleiben direkt im Produktionsgebäude gelagert** (begrenzt auf 100 pro Level des Gebäudes).",
        action: null
    },
    // Schritt 8: Markt errichten (NEU)
    {
        message: "Errichtet den **Markt/Händler**, um Waren zu verkaufen. Der Verkaufserlös bringt Gold und wird zur Entlohnung verwendet, sobald ihr Waren aus den Produktionsgebäuden entnehmt.",
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
    // Schritt 9: Der Ruf des Abenteuers (Dungeon)
    {
        message: "Uns fehlt noch ein wichtiges Material: **Eisennägel**. Der Schmied braucht dafür **alte Eisenteile**, die nur in den Ruinen außerhalb des Dorfes zu finden sind. Ein **Dungeon** ist freigeschaltet!",
        action: () => {
            const towerButton = document.getElementById('first-tower');
            towerButton.classList.remove('hidden');
            towerButton.disabled = false;
            towerButton.textContent = 'Dungeon: Alter Ort (Abenteuer!)'; 
            towerButton.onclick = () => {
                document.getElementById('tutorial-message').textContent = 'Hervorragend! Ihr habt den Dungeon erkundet und **alte Eisenteile** für unseren Schmied gefunden!';
                currentTutorialStep++; 
                nextTutorialStep(true); 
            };
        }
    },
    // Schritt 10: Schmied errichten
    {
        message: "Ihr habt die Eisenteile! Jetzt können wir den **Schmied** errichten. Er wird die Teile in die dringend benötigten **Eisennägel** umwandeln, die wir für alle weiteren Bauprojekte brauchen.",
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
        message: "Die Grundlagen sind geschaffen! Wir haben jetzt alle notwendigen Materialien. Der nächste Schritt ist der Ausbau unseres **Gasthauses**, um unser Dorf weiter zu stärken.",
        action: () => {
             document.getElementById('tutorial-box').style.cursor = 'default';
             document.getElementById('tutorial-box').onclick = null;
        }
    }
];

// Funktion zur Steuerung der Tutorial-Schritte
function nextTutorialStep(skipStepCheck = false) {
    if (skipStepCheck || currentTutorialStep < tutorialSteps.length) {
        const step = tutorialSteps[currentTutorialStep];
        const tutorialMessage = document.getElementById('tutorial-message');

        tutorialMessage.textContent = step.message;

        if (step.action) {
            step.action();
        }

        if (!step.action || step.action.toString().indexOf('nextTutorialStep();') === -1) {
            currentTutorialStep++;
        }
    } else {
        document.getElementById('tutorial-message').textContent = "Das Tutorial ist abgeschlossen!";
    }
}

// Event-Listener zum Starten des Tutorials
document.addEventListener('DOMContentLoaded', () => {
    const tutorialBox = document.getElementById('tutorial-box');
    
    document.getElementById('tutorial-message').textContent = tutorialSteps[0].message;

    tutorialBox.onclick = () => {
        if (currentTutorialStep === 0) {
            currentTutorialStep = 1;
        }
        nextTutorialStep();
    };
});
        
