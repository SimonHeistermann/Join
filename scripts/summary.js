let to_do;
let done;
let in_progress;
let feedback;
let allTasks
let urgend_amount;
let next_urgend ;
let allDueDates =[]; 
 
 async function initSummary() {
     currentUser = JSON.parse(localStorage.getItem('currentUser'));
     users = JSON.parse(localStorage.getItem('users'));
     fillTheTag();
     await fetchTasks();
     getFutureTasks();   
     renderSummary();       
 }


async function getTheTasks() {
    let storedTaskArray = localStorage.getItem("tasks");
    tasks = JSON.parse(storedTaskArray)
    }

function renderSummary(to_do, done, in_progress, feedback, allTasks, next_urgend, urgend_amount) {
    const summaryContentref = document.getElementById("summary_content");
    summaryContentref.innerHTML = "";
    summaryContentref.innerHTML += renderHTMLSummary(to_do, done, in_progress, feedback, allTasks, next_urgend, urgend_amount);
}

function howManyToDo(){
    let amount = 0;
    tasks.forEach(task => {
        if(task.position === 1){
            amount++;
        }
    });
    to_do = amount;
}

function howManyDone(){
    let amount = 0;
    tasks.forEach(task => {
        if (task.position === 4) {
            amount++;
        }
    });
    done = amount;
}

function howManyInProgress(){
    let amount = 0;
    tasks.forEach(task => {
        if(task.position === 2) {
            amount ++;
        }
    });
    in_progress = amount;
}

function howManyFeedback(){
    let amount = 0;
    tasks.forEach(task => {
        if(task.position === 3){
            amount ++;
        }
    });
    feedback = amount;
}

function howManyTasks(){
    allTasks =  tasks.length;
}

function howManyUrgend(){
    let amount = 0;
    tasks.forEach(task => {
        if(task.prio === 1){
            amount++;
        }
    });
    urgend_amount = amount;
}

function getCurrentDate(){
    return new Date().toISOString().slice(0,10);
    
}

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

function sortDueDates(){
    allDueDates.sort((a, b) => {
        return new Date(a) - new Date(b);
    });
    next_urgend = allDueDates[0];
    compareDate();
}

function compareDate() {
    let today = new Date().toISOString().slice(0, 10);

    if (allDueDates.length > 0 && today <= allDueDates[0]) {
        let element = document.querySelector('.urgent__date');
        if (element) {
            element.style.color = '#fb3c53'; 
        }
    }
}