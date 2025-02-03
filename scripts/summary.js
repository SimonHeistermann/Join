
 function initSummary() {
     currentUser = JSON.parse(localStorage.getItem('currentUser'));
     users = JSON.parse(localStorage.getItem('users'));
     fillTheTag();
     
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

