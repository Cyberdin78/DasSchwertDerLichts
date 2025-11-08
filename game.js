// --- Spiel-Status und Konstanten (Bleiben unverändert) ---
let currentTutorialStep = 0;
const gameData = {
    // ...
};

// Die Sequenz der Tutorial-Schritte und Aktionen
const tutorialSteps = [
    // Schritt 0: Begrüßung (Flehender Dorfbewohner)
    {
        message: "Oh, edler Fremder! Seid Ihr die erhoffte Rettung? Das Böse nagt an unserer Welt. Doch bevor Ihr das Schwert des Lichts suchen könnt, müssen wir unser Dorf wieder aufbauen. Bitte, helft uns!",
        action: null
    },
    // Schritt 1: Gasthaus errichten (Das Zentrum der Macht)
    {
        message: "Die erste und wichtigste Stätte ist unser **Gasthaus**. Es ist das Herz des Dorfes und bestimmt, wie stark wir alle werden können. Bitte, **errichtet es jetzt**!",
        action: () => {
            const inn = document.getElementById('inn');
            inn.innerHTML = '<h3>Gasthaus (Lvl 1)</h3><p>Hier könnt Ihr Euch heilen, Gegenstände lagern und Aufträge finden.</p>';
            gameData.innLevel = 1;
        }
    },
    // Schritt 2: Holzfällerhütte errichten (Bretter für Upgrades)
    {
        message: "Edler Herr, für jedes Upgrade unserer Gebäude brauchen wir Holz. Errichtet die **Holzfällerhütte**. Sie ist gleichzeitig ein Sägewerk und produziert **Holzstämme und wertvolle Bretter**.",
        action: () => {
            const lumberjack = document.getElementById('lumberjack');
            lumberjack.classList.remove('hidden');
        }
    },
    // Schritt 3: Steinbruch errichten (Steine für Fundamente)
    {
        message: "Neben Holz benötigen wir robuste Steine und Lehm für die Fundamente. Errichtet einen **Steinbruch**, der uns mit **Lehm und Steinen** versorgt.",
        action: () => {
            const quarry = document.getElementById('quarry');
            quarry.classList.remove('hidden');
        }
    },
    // Schritt 4: Erklärung zu Arbeitern (Produktionsgrundlage)
    {
        message: "Ihr fragt nach Produktion? Sie hängt von unseren fleißigen **Arbeitern** ab! Wir brauchen ihnen nur eine Stätte zu geben, und sie beginnen automatisch zu arbeiten.",
        action: null
    },
    // Schritt 5: Bauernhof errichten (Warenproduktion)
    {
        message: "Essen ist Leben! Wir müssen Waren für den Handel haben. Errichtet den **Bauernhof**. Er liefert uns alles: **Weizen, Kartoffeln, Fleisch und Eier**.",
        action: () => {
            const farm = document.getElementById('farm');
            farm.classList.remove('hidden');
        }
    },
    // Schritt 6: Wohnhaus errichten (Arbeitskraft-Limit)
    {
        message: "Die Produktionsgeschwindigkeit wird von der Anzahl der Arbeiter bestimmt, die wir aufnehmen können. Das **Wohnhaus** legt unsere **maximale Arbeitskraftkapazität** fest. Es muss errichtet werden!",
        action: () => {
            const residential = document.getElementById('residential');
            residential.classList.remove('hidden');
        }
    },
    // Schritt 7: Produktionsbeginn und Lagerung (Die Regel)
    {
        message: "Die Produktion hat begonnen! Denkt daran: Die Waren verbleiben **direkt im Produktionsgebäude** (begrenzt auf 100 pro Level). Dort liegen sie sicher.",
        action: null
    },
    // Schritt 8: Händler errichten (Der Goldkreislauf)
    {
        message: "Hört genau zu: Die **Entnahme von Waren** aus den Produktionslagern **kostet Euch Gold**! Um Gold zu verdienen, **errichtet den Händler**. Nur dort könnt Ihr Eure Güter verkaufen und Eure Geldsorgen lindern.",
        action: () => {
            const market = document.getElementById('market');
            market.classList.remove('hidden');
        }
    },
    // Schritt 9: Der Ruf des Abenteuers (Erster Turm)
    {
        message: "Ihr seid bereit für die Quest! Der erste Turm ruft. Dafür braucht Ihr Ausrüstung und natürlich Eisen. Das Eisen wird ein tapferer Lieferant bringen, aber Ihr müsst es verarbeiten!",
        action: () => {
            const firstTower = document.getElementById('first-tower');
            firstTower.classList.remove('hidden');
        }
    },
    // Schritt 10: Schmied errichten (Veredelung und Nägel)
    {
        message: "Errichtet nun den **Schmied**. Er ist der einzige, der das rohe Eisen in wichtige **Eisennägel** für Upgrades und in Eure Ausrüstung verwandeln kann! Mögen die Götter Euch beistehen.",
        action: () => {
            const blacksmith = document.getElementById('blacksmith');
            blacksmith.classList.remove('hidden');
        }
    },
    // Schritt 11: Abschluss
    {
        message: "Das Tutorial ist abgeschlossen, edler Fremder! Die Hoffnung des Dorfes ruht nun in Euren Händen. Klickt, um Eure Reise zu beginnen.",
        action: null
    }
];

// ... (Rest der Funktionen nextTutorialStep und DOMContentLoaded bleibt unverändert) ...
