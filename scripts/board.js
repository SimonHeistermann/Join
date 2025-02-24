let savedTask = [];
let baseUrl = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/";
let toDoTasks = [];
let inProgressTasks = [];
let awaitFeedbackTasks = [];
let doneTasks = [];
let currendeDraggedElement;

async function fetchTheTasks(){
    let response = await fetch(`${baseUrl}/tasks.json`);
    let existingTasks = await response.json();
    existingTasks.forEach(task => savedTask.push(task));
    makeTheBoardGreatAgain();
}

function makeTheBoardGreatAgain(){
    sortTheTasks();
    renderToDoColumn();
    renderInProgress();
    renderAwaitFeedback();
    renderDone();
}

function sortTheTasks(){
    sortTheTasksToDO();
    sortTheTasksInProgress();
    sortTheTasksAwaitFeedback();
    sortTheTasksDone();
}

function sortTheTasksToDO(){
    savedTask.forEach(task => 
        {if(task.status === "to-do")
         toDoTasks.push(task);

        }
        )
}

function sortTheTasksInProgress(){
    savedTask.forEach(task => 
        {if(task.status === "in-progress")
            inProgressTasks.push(task);
        }
        )
}

function sortTheTasksAwaitFeedback(){
    savedTask.forEach(task => 
        {if(task.status === "await-feedback")
         awaitFeedbackTasks.push(task);
        }
        )
}

function sortTheTasksDone(){
    savedTask.forEach(task => 
        {if(task.status === "done")
         doneTasks.push(task);
        }
        )
}

function renderToDoColumn(){
    let column = document.getElementById('column-todo');
    column.innerHTML = '';
    gatherAllInformations(toDoTasks, column);
}

function renderInProgress(){
    let column = document.getElementById('column_progress');
    column.innerHTML = '';
    gatherAllInformations(inProgressTasks, column);
}

function renderAwaitFeedback(){
    let column = document.getElementById('column_await');
    column.innerHTML = '';
    gatherAllInformations(awaitFeedbackTasks, column);
}

function renderDone(){
    let column = document.getElementById('column_done');
    column.innerHTML = '';
    gatherAllInformations(doneTasks, column);
}

function gatherAllInformations(array, column){  
    array.forEach(task=> {
        let name = task.name;
        let description = task.description;
        let prioImgURL = prioImgUrl(task);
        let completedSubtasks =  0;
        let allSubTasks = 0;
        if (task.subtasks.length > 0){
            completedSubtasks = gatherCompletedSubtasks(task.subtasks); 
            allSubTasks = task.subtasks.length;
        }
        let width = fillUpTheBar(completedSubtasks, allSubTasks);        
        renderTaskCard(name, description, prioImgURL, completedSubtasks, allSubTasks, column, width);
        whichCategory(task.category, task.name);
    })  
}

function fillUpTheBar(completedSubtasks, allSubTasks){
    let w 
    if(allSubTasks === 0){
        w = 0;
    }
    else{
     w = (100/allSubTasks)*completedSubtasks;
    }    
    return w;
}


function gatherCompletedSubtasks(subtasks){
    let i = 0;
    subtasks.forEach(subtask => { 
        if(subtask.status === 1) i++; 
    });
    return i;
}

function prioImgUrl(task){
    let url;
    if(task.prio === 1){
        url = 'assets/icons/Property 1=Low.png';
    }
    else if(task.prio === 3){
        url = 'assets/icons/Property 1=Urgent.png';
    }
    else{
        url ='assets/icons/Property 1=Medium.png'
    }
    return url;
}

function renderTaskCard(title, description, prioImgURL, completedSubtasks, allSubTasks, column, width){
    column.innerHTML += generateBoardTemplate(title, description, prioImgURL, completedSubtasks, allSubTasks, width);
        //setCategoryColor(category);
        //fillupassigned();
}

function whichCategory(category, name){
    let safename = name.replace(/\s+/g, "_");    
    let taskCategory;
    let colorSetting = document.getElementById('category_'+safename);  
    if(category === 'us'){
        taskCategory = 'UserStory';
        colorSetting.classList.add('userStory__task');
        colorSetting.innerHTML = taskCategory;
    }
    else{
        taskCategory = 'Technical Task';
        colorSetting.classList.add('technical__task');
        colorSetting.innerHTML = taskCategory;
    }
}

function startDragging(draggedName){    
 currendeDraggedElement = draggedName;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(column){
    draggQueenOperation(column);
    emptyAll();
   makeTheBoardGreatAgain();
   updateTasksInFirebase();
}

function draggQueenOperation(column){
    let draggedTask = savedTask.find(task => task.name === currendeDraggedElement);
    draggedTask.status = column;
    console.log(draggedTask.status);
    savedTask = savedTask.map(task => {
     if (task.name === draggedTask.name) {
         return draggedTask;
     }
     return task;
     });
}

function emptyAll(){
    toDoTasks =[];
    inProgressTasks=[];
    awaitFeedbackTasks=[];
    doneTasks=[];
}

async function updateTasksInFirebase() {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(savedTask), // Array in JSON umwandeln
    };
    try {
        const response = await fetch(`${baseUrl}/tasks.json`, options);
    } catch (error) {
        console.error("Fehler beim Update:", error);
    }
}
 //ondragleave="removeHighlight('open')"
function startSingleCard(title){
    document.getElementById('overlay_overall').classList.remove('d__none')
    generateSingleTaksCard(title);
}

function generateSingleTaksCard(title){
    let safename = title.replace(/\s+/g, "_");
    let singleCardData = savedTask.find(task => task.name === title);
    let singleCardCategory = document.getElementById('single_card_' + safename);
     if (singleCardData.category === 'us'){      
        document.getElementById('single_card_category').classList.add('userStory__task');
        document.getElementById('single_card_category').innerHTML = 'User Story';
    }else{
        document.getElementById('single_card_category').classList.add('technical__task');
        document.getElementById('single_card_category').innerHTML = 'Technical Task';
    }
    document.getElementById('single_card_title').innerHTML = title;
    document.getElementById('single_card_description').innerHTML = singleCardData.description;
    setTheDateRight(singleCardData);
    setSingleCardPrio(singleCardData);  
}

function setSingleCardPrio(singleCardData){
    if(singleCardData.prio === 3){
        document.getElementById('single_card_prio').innerHTML = 'Urgend';
        document.getElementById('single_card_prio_img_url').src = './assets/icons/Property 1=Urgent.png';
    }else if(singleCardData.prio === 2){
        document.getElementById('single_card_prio').innerHTML = 'Medium';
        document.getElementById('single_card_prio_img_url').src = './assets/icons/Property 1=Medium.png';
    }
    else{
        document.getElementById('single_card_prio').innerHTML = 'Low';
        document.getElementById('single_card_prio_img_url').src = './assets/icons/Property 1=Low.png';
    }
}

function setTheDateRight(data){
    let date = data.due_date;
    let formattedDate = new Date(date).toLocaleDateString("de-DE");
    document.getElementById('singel_card_date').innerHTML =  formattedDate;
}