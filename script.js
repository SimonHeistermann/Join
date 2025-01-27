let users = [];
let tasks = [];
let contacts = [];
const contactUrl = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/contacts.json"
const tasksUrl = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
const usersUrl = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/users.json"


// --> Nur falls du damit arbeiten möchtest, hier einmal das aus dem Chat :)

const BASE_URL = "";

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
        users.push(allUser);
        console.log(users);
        toLocalStorage();
    } catch (error) {
        console.error("Error getting users:", error);
    }
}

async function fetchTasks() {
    try {
        let response = await fetch(tasksUrl);
        let fetchedTasks = await response.json();
        tasks.push(fetchedTasks);
    } catch (error) {
        console.error("Error getting tasks:", error);
    }
}

function toLocalStorage(){
    localStorage.setItem("users", JSON.stringify(users));
}