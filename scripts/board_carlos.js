let savedTask = [];
let baseUrl = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/";
let toDoTasks = [];
let inProgressTasks = [];
let awaitfeedbackTasks = [];
let doneTasks = [];

async function fetchTheTasks(){
    let response = await fetch(`${baseUrl}/tasks.json`);
    let existingTasks = await response.json();
    existingTasks.forEach(task => savedTask.push(task));
    sortTheTasks()
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
         awaitfeedbackTasks.push(task);
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
    toDoTasks.forEach(task => {
        taskId = task
    })
}

function gatherAllInformations(){
    toDoTasks.forEach(task=> {
        let name = task.name;
        let category = task.category;
        let description = task.description;
        let completedSubtasks = gatherCompletedSubtasks();
        let allSubTasks = task.subtasks.length;
        let prioImgURL = prioImgUrl();
    })
}

column.innerHTML += generateBoardTemplate(taskId, task, completedSubtasks, totalSubtasks, subTaskList)


function openTaskDetails(){

}

renderTaskCard();
        setCategoryColor();
        fillupassigned();