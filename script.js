let users = [];
let tasks = [];
let contacts = [];
let user =[];
let currentUser = {};
let contactUrl = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/contacts.json"
let tasksUrl = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
let usersUrl = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/users.json"
const BASE_URL = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/";


// --> Nur falls du damit arbeiten möchtest, hier einmal das aus dem Chat :)

async function loadData(path = "") {
    try {
        let response = await fetch(BASE_URL + path + ".json");
        let responseToJson = await response.json();
        return responseToJson;
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

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

//fetch der Daten on onload

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