let to_do;
let done;
let in_progress;
let feedback;
let allTasks
let urgend_amount;
let next_urgend ;
let allDueDates =[]; 
let theName
 
/**
 * Initialisiert die Zusammenfassung der Aufgaben und Benutzerinformationen.
 * 
 * Diese Funktion lädt den aktuellen Benutzer und die Benutzerliste aus dem `localStorage`, 
 * ruft die erforderlichen Daten ab und aktualisiert die Oberfläche mit den neuesten Aufgabeninformationen.
 * 
 * @async
 * @global
 */
 async function initSummary() {
     currentUser = JSON.parse(localStorage.getItem('currentUser'));
     users = JSON.parse(localStorage.getItem('users'));
     fillTheTag();
     await fetchTasks();
     getFutureTasks();  
     getTheSummary(); 
     renderSummary(to_do, done, in_progress, feedback, allTasks, next_urgend, urgend_amount, theName);       
 }

/**
 * Lädt die gespeicherten Aufgaben aus dem `localStorage` und speichert sie in der `tasks`-Variable.
 * 
 * Diese Funktion ruft das `tasks`-Array aus dem `localStorage` ab und konvertiert es von JSON in ein JavaScript-Objekt.
 * Falls keine Daten vorhanden sind, bleibt `tasks` undefined oder null.
 * 
 * @async
 */
async function getTheTasks() {
    let storedTaskArray = localStorage.getItem("tasks");
    tasks = JSON.parse(storedTaskArray)
    }

   /**
 * Rendert die Zusammenfassung der Aufgaben und aktualisiert den HTML-Inhalt des Summary-Bereichs.
 * 
 * Die Funktion generiert das HTML für die Zusammenfassung basierend auf den übergebenen Aufgabenparametern 
 * und setzt den Inhalt des Elements mit der ID `summary_content`.
 * 
 * @param {number} to_do - Anzahl der ausstehenden Aufgaben.
 * @param {number} done - Anzahl der abgeschlossenen Aufgaben.
 * @param {number} in_progress - Anzahl der Aufgaben in Bearbeitung.
 * @param {number} feedback - Anzahl der Aufgaben im Feedback-Prozess.
 * @param {number} allTasks - Gesamtanzahl der Aufgaben.
 * @param {string} next_urgend - Beschreibung oder Name der dringendsten nächsten Aufgabe.
 * @param {number} urgend_amount - Anzahl der dringenden Aufgaben.
 */ 
function renderSummary(to_do, done, in_progress, feedback, allTasks, next_urgend, urgend_amount, theName) {
    const summaryContentref = document.getElementById("summary_content");
    summaryContentref.innerHTML = "";
    summaryContentref.innerHTML += renderHTMLSummary(to_do, done, in_progress, feedback, allTasks, next_urgend, urgend_amount, theName);
}

/**
 * Ermittelt verschiedene Aufgabenstatistiken und aktualisiert die entsprechenden Werte.
 * 
 * Diese Funktion ruft mehrere Hilfsfunktionen auf, um die Anzahl der abgeschlossenen, 
 * in Bearbeitung befindlichen, im Feedback-Prozess befindlichen, 
 * ausstehenden und dringenden Aufgaben zu berechnen.
 */
function getTheSummary(){
    howManyDone();
    howManyFeedback();
    howManyInProgress();
    howManyTasks();
    howManyToDo();
    howManyUrgend();
    whatsTheName();
}

/**
 * Berechnet die Anzahl der Aufgaben, die noch erledigt werden müssen, und speichert sie in `to_do`.
 * 
 * Die Funktion durchläuft das `tasks`-Array und zählt alle Aufgaben, 
 * deren `position` den Wert `1` hat, da diese als "To-Do" betrachtet werden.
 */
function howManyToDo(){
    let amount = 0;
    tasks.forEach(task => {
        if(task.position === 1){
            amount++;
        }
    });
    to_do = amount;
}

/**
 * Berechnet die Anzahl der abgeschlossenen Aufgaben und speichert sie in `done`.
 * 
 * Die Funktion durchläuft das `tasks`-Array und zählt alle Aufgaben, 
 * deren `position` den Wert `4` hat, da diese als "done" (erledigt) betrachtet werden.
 */
function howManyDone(){
    let amount = 0;
    tasks.forEach(task => {
        if (task.position === 4) {
            amount++;
        }
    });
    done = amount;
}

/**
 * Berechnet die Anzahl der Aufgaben, die sich in Bearbeitung befinden, und speichert sie in `in_progress`.
 * 
 * Die Funktion durchläuft das `tasks`-Array und zählt alle Aufgaben, 
 * deren `position` den Wert `2` hat, da diese als "in progress" betrachtet werden.
 * Zusätzlich wird die aktuelle Anzahl während der Iteration in der Konsole ausgegeben.
 */
function howManyInProgress(){
    let amount = 0;
    tasks.forEach(task => {
        if(task.position === 2) {
            amount ++;
            console.log(amount);
        }
    });
    in_progress = amount;
}

/**
 * Berechnet die Anzahl der Aufgaben, die sich im Feedback-Prozess befinden, und speichert sie in `feedback`.
 * 
 * Die Funktion durchläuft das `tasks`-Array und zählt alle Aufgaben, 
 * deren `position` den Wert `3` hat, da diese als "Feedback" betrachtet werden.
 */
function howManyFeedback(){
    let amount = 0;
    tasks.forEach(task => {
        if(task.position === 3){
            amount ++;
        }
    });
    feedback = amount;
}

/**
 * Berechnet die Gesamtanzahl der Aufgaben und speichert sie in `allTasks`.
 * 
 * Die Funktion ermittelt die Länge des `tasks`-Arrays und speichert den Wert in `allTasks`.
 */
function howManyTasks(){
    allTasks =  tasks.length;
}

/**
 * Berechnet die Anzahl der dringenden Aufgaben und speichert sie in `urgend_amount`.
 * 
 * Die Funktion durchläuft das `tasks`-Array und zählt alle Aufgaben, 
 * deren `prio` den Wert `3` hat, da diese als "dringend" betrachtet werden.
 */
function howManyUrgend(){
    let amount = 0;
    tasks.forEach(task => {
        if(task.prio === 3){
            amount++;
        }
    });
    urgend_amount = amount;
}

/**
 * Setzt den Wert von `theName` basierend auf dem Namen des aktuellen Benutzers.
 * 
 * Falls der Benutzer "Guest" ist, wird `theName` auf einen leeren String gesetzt.  
 * Andernfalls wird `theName` mit dem Namen des aktuellen Benutzers belegt.
 */
function whatsTheName(){
    if(currentUser.name === 'Guest'){
        theName = '';
    }
    else{
    theName = currentUser.name;
    }
}

/**
 * Gibt das aktuelle Datum im Format `YYYY-MM-DD` zurück.
 * 
 * Die Funktion erstellt ein neues `Date`-Objekt, konvertiert es in einen ISO-String 
 * und extrahiert die ersten 10 Zeichen, um das Datum ohne Uhrzeit zu erhalten.
 * 
 * @returns {string} Das aktuelle Datum im Format `YYYY-MM-DD`.
 */
function getCurrentDate(){
    return new Date().toISOString().slice(0,10);
}

/**
 * Sammelt alle Fälligkeitsdaten (`due_date`) aus den vorhandenen Aufgaben und speichert sie in `allDueDates`.
 * 
 * Die Funktion durchläuft das `tasks`-Array und fügt jedes gültige `due_date` zur `allDueDates`-Liste hinzu.
 * Falls eine Aufgabe kein gültiges `due_date`-Feld besitzt, wird eine Warnung in der Konsole ausgegeben.
 * Anschließend werden die gesammelten Fälligkeitsdaten sortiert.
 */
function getFutureTasks() {
        for (let i = 0; i < tasks.length; i++) {           
        const task = tasks[i];
        if (task && task.due_date) {        
            allDueDates.push(task.due_date);
        } 
        else {
            console.warn(`Ungültiger Task bei Index ${i}:`, task);
        }
    }
    sortDueDates();
}

/**
 * Sortiert die gesammelten Fälligkeitsdaten in `allDueDates` aufsteigend nach Datum.
 * 
 * Die Funktion konvertiert die Datumswerte in `Date`-Objekte, um eine korrekte Sortierung zu gewährleisten.  
 * Anschließend wird das früheste Datum in `searchedDate` gespeichert, mit `compareDate` verglichen  
 * und durch `transFormDate` weiterverarbeitet.
 */
function sortDueDates(){
    allDueDates.sort((a, b) => {
        return new Date(a) - new Date(b);
    });
    searchedDate= allDueDates[0];
    compareDate();
    transFormDate(searchedDate);
}

/**
 * Vergleicht das aktuelle Datum mit dem frühesten Fälligkeitsdatum in `allDueDates` 
 * und passt die Farbe des Elements mit der Klasse `.urgent__date` an, falls erforderlich.
 * 
 * Falls es zukünftige oder heutige Fälligkeitsdaten gibt (`today <= allDueDates[0]`),
 * wird die Schriftfarbe des Elements `.urgent__date` auf Rot (`#fb3c53`) gesetzt.
 */
function compareDate() {
    let today = new Date().toISOString().slice(0, 10);

    if (allDueDates.length > 0 && today <= allDueDates[0]) {
        let element = document.querySelector('.urgent__date');
        if (element) {
            element.style.color = '#fb3c53'; 
        }
    }
}

/**
 * Formatiert das übergebene Datum in das deutsche Datumsformat (`DD.MM.YYYY`) und speichert es in `next_urgend`.
 * 
 * Die Funktion nimmt ein Datum im `YYYY-MM-DD`-Format, wandelt es in ein `Date`-Objekt um 
 * und formatiert es anschließend mit `toLocaleDateString("de-DE")` für die deutsche Darstellung.
 * 
 * @param {string} searchedDate - Das zu formatierende Datum im `YYYY-MM-DD`-Format.
 */
function transFormDate(searchedDate){
    let formatedDate = new Date(searchedDate).toLocaleDateString("de-DE");
    next_urgend = formatedDate;
}