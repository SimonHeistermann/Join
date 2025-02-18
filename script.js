let users = [];
let tasks = [];
let contacts = [];
let user =[];
let currentUser = {};
let contactUrl = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/contacts.json"
let tasksUrl = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
let usersUrl = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/users.json"
const BASE_URL = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/";


/**
 * Lädt Daten von einer bestimmten API-Route per HTTP GET und gibt die Server-Antwort zurück.
 * 
 * @async
 * @param {string} [path=""] - Der API-Pfad, von dem die Daten abgerufen werden.
 * @returns {Promise<Object|undefined>} Die Server-Antwort als JSON oder `undefined`, falls ein Fehler auftritt.
 */
async function loadData(path = "") {
    try {
        let response = await fetch(BASE_URL + path + ".json");
        let responseToJson = await response.json();
        return responseToJson;
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

/**
 * Sendet Daten per HTTP POST an eine bestimmte API-Route und gibt die Server-Antwort zurück.
 * 
 * @async
 * @param {string} [path=""] - Der API-Pfad, an den die Daten gesendet werden.
 * @param {Object} [data={}] - Die Daten, die als JSON an den Server gesendet werden.
 * @returns {Promise<Object|undefined>} Die Server-Antwort als JSON oder `undefined`, falls ein Fehler auftritt.
 */

async function postData(path = "", data = {}) {
    try {
        let response = await fetch(BASE_URL + path + ".json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error posting data:", error);
    }
}

/**
 * Löscht Daten von einer bestimmten API-Route per HTTP DELETE und gibt die Server-Antwort zurück.
 * 
 * @async
 * @param {string} [path=""] - Der API-Pfad, von dem die Daten gelöscht werden.
 * @returns {Promise<Object|undefined>} Die Server-Antwort als JSON oder `undefined`, falls ein Fehler auftritt.
 */

async function deleteData(path = "") {
    try {
        let response = await fetch(BASE_URL + path + ".json", {
            method: "DELETE"
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}

/**
 * Sendet Daten per HTTP PUT an eine bestimmte API-Route und gibt die Server-Antwort zurück.
 * 
 * @async
 * @param {string} [path=""] - Der API-Pfad, an den die Daten gesendet werden.
 * @param {Object} [data={}] - Die Daten, die als JSON an den Server gesendet werden.
 * @returns {Promise<Object|undefined>} Die Server-Antwort als JSON oder `undefined`, falls ein Fehler auftritt.
 */
async function putData(path = "", data = {}) {
    try {
        let response = await fetch(BASE_URL + path + ".json", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error putting data:", error);
    }
}

/**
 * Ruft die Benutzerdaten von einer externen URL ab und speichert sie im localStorage.
 * 
 * @async
 * @param {string} usersUrl - Die URL, von der die Benutzerdaten abgerufen werden.
 */
async function fetchUsers(){
    try {
        let response = await fetch(usersUrl);
        let allUser = await response.json();        
        users = allUser;        
        toLocalStorage();
    } catch (error) {
        console.error("Error getting users:", error);
    }
}

/**
 * Ruft Aufgaben (Tasks) von einer externen URL ab und speichert sie im localStorage.
 * 
 * @async
 * @param {string} tasksUrl - Die URL, von der die Aufgaben abgerufen werden.
 */
async function fetchTasks() {
    try {
        let response = await fetch(tasksUrl);
        let fetchedTasks = await response.json();
        tasks = fetchedTasks
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
        console.error("Error getting tasks:", error);
    }
}

/**
 * Speichert das globale `users`-Array im localStorage.
 * Die Daten werden als JSON-String gespeichert.
 */
function toLocalStorage(){
    localStorage.setItem("users", JSON.stringify(users));
}

/**
 * Zeigt eine Fehlermeldung an, wenn das Laden der Daten schiefgegangen ist.
 * 
 * Diese Funktion zeigt eine `alert`-Nachricht an, die den Benutzer darauf hinweist,
 * dass das Laden der Daten fehlgeschlagen ist, und bittet ihn, es später erneut zu versuchen.
 * Der Benutzer wird auch um Entschuldigung für die Unannehmlichkeiten gebeten.
 * 
 * @param {string} message - Die Nachricht, die dem Benutzer im Fehlerfall angezeigt wird. In diesem Fall eine standardisierte Fehlermeldung.
 */
function showErrorAlert() {
    alert("Das Laden der Daten ist schiefgegangen. Bitte versuchen Sie es zu einem späteren Zeitpunkt noch einmal. Danke. Entschuldigen Sie die Unannehmlichkeiten.");
}

/**
 * Füllt das HTML-Element mit der ID 'header_tag' mit den Initialen des aktuell angemeldeten Benutzers.
 *
 * @param {Object} currentUser - Das aktuell angemeldete Benutzerobjekt, das Benutzerdaten enthält.
 * @param {string} currentUser.initials - Die Initialen des aktuellen Benutzers, die im Header angezeigt werden sollen.
 *
 */
function fillTheTag(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(currentUser === null){
        window.location.href="./login.html"
    }
    let tagLetters = currentUser.initials;
    document.getElementById('currentuser_initials_ref').innerHTML = tagLetters;
}

/**
 * Fetches contacts from storage and filters out invalid entries.
 */
async function fetchContacts() {
    try {
        let fetchedContacts = await loadData("contacts");
        if (!fetchedContacts) fetchedContacts = [];
        contacts = Object.values(fetchedContacts).filter(contact => contact !== null && contact !== undefined);
    } catch (error) {
        console.error("Error getting contacts:", error);
    }
}

/**
 * Loggt den Benutzer aus, indem der "currentUser" aus dem localStorage entfernt wird.
 * Anschließend wird der Benutzer zur Login-Seite weitergeleitet.
 */
function logOut(){
    localStorage.removeItem("currentUser"); 
    window.location.href = "./login.html";
}

function handleEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();  
      addNewSubtask();         
    }
}

function handleEnterEdit(event, name){
    if (event.key === "Enter") {
        event.preventDefault();  
        turnIntoLi(name)        
      }
}