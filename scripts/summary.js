let users = [];
let tasks = [];


async function initSummary() {
    try {
        // await fetchUsers();
        // await fetchTasks();
        renderSummary();

        
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}

async function fetchUsers() {
    try {
        let fetchedUsers = await loadData("users");
        if (!fetchedUsers) fetchedUsers = [];
        users = Object.values(fetchedUsers).filter(user => user !== null && user !== undefined);
    } catch (error) {
        console.error("Error getting users:", error);
    }
}

async function fetchTasks() {
    try {
        let fetchedTasks = await loadData("tasks");
        if (!fetchedTasks) fetchedTasks = [];
        tasks = Object.values(fetchedTasks).filter(task => task !== null && task !== undefined);
    } catch (error) {
        console.error("Error getting tasks:", error);
    }
}

function renderSummary() {
    const summaryContentref = document.getElementById("summary_content");
    summaryContentref.innerHTML = "";
    summaryContentref.innerHTML += renderHTMLSummary();
}

