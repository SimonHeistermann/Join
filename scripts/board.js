let savedTask = [];
let baseUrl =
  "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/";
let toDoTasks = [];
let inProgressTasks = [];
let awaitFeedbackTasks = [];
let doneTasks = [];
let currendeDraggedElement;

/**
 * Initialisiert die Anwendung, lädt die Aufgaben und aktualisiert die Task-Anzahl-Anzeige.
 */
async function init() {
  loadTasks();
  fillTheTag();
  quantityUpdate();
  fetchContacts(contacts);
}

function makeTheBoardGreatAgain() {
  sortTheTasks();
  renderToDoColumn();
  renderInProgress();
  renderAwaitFeedback();
  renderDone();
}

function sortTheTasks() {
  sortTheTasksToDO();
  sortTheTasksInProgress();
  sortTheTasksAwaitFeedback();
  sortTheTasksDone();
}

function sortTheTasksToDO() {
  savedTask.forEach((task) => {
    if (task.status === "to-do") toDoTasks.push(task);
  });
}

function sortTheTasksInProgress() {
  savedTask.forEach((task) => {
    if (task.status === "in-progress") inProgressTasks.push(task);
  });
}

function sortTheTasksAwaitFeedback() {
  savedTask.forEach((task) => {
    if (task.status === "await-feedback") awaitFeedbackTasks.push(task);
  });
}

function sortTheTasksDone() {
  savedTask.forEach((task) => {
    if (task.status === "done") doneTasks.push(task);
  });
}

function renderToDoColumn() {
  let column = document.getElementById("column-todo");
  column.innerHTML = "";
  gatherAllInformations(toDoTasks, column);
}

function renderInProgress() {
  let column = document.getElementById("column_progress");
  column.innerHTML = "";
  gatherAllInformations(inProgressTasks, column);
}

function renderAwaitFeedback() {
  let column = document.getElementById("column_await");
  column.innerHTML = "";
  gatherAllInformations(awaitFeedbackTasks, column);
}

function renderDone() {
  let column = document.getElementById("column_done");
  column.innerHTML = "";
  gatherAllInformations(doneTasks, column);
}

function gatherAllInformations(array, column) {
  array.forEach((task) => {
    let name = task.name;
    let description = task.description;
    let prioImgURL = prioImgUrl(task);
    let completedSubtasks = 0;
    let allSubTasks = 0;
    if (task.subtasks.length > 0) {
      completedSubtasks = gatherCompletedSubtasks(task.subtasks);
      allSubTasks = task.subtasks.length;
    }
    let width = fillUpTheBar(completedSubtasks, allSubTasks);
    renderTaskCard(
      name,
      description,
      prioImgURL,
      completedSubtasks,
      allSubTasks,
      column,
      width
    );
    whichCategory(task.category, task.name);
  });
}

function fillUpTheBar(completedSubtasks, allSubTasks) {
  let w;
  if (allSubTasks === 0) {
    w = 0;
  } else {
    w = (100 / allSubTasks) * completedSubtasks;
  }
  return w;
}

function gatherCompletedSubtasks(subtasks) {
  let i = 0;
  subtasks.forEach((subtask) => {
    if (subtask.status === 1) i++;
  });
  return i;
}

function prioImgUrl(task) {
  let url;
  if (task.prio === 1) {
    url = "assets/icons/Property 1=Low.png";
  } else if (task.prio === 3) {
    url = "assets/icons/Property 1=Urgent.png";
  } else {
    url = "assets/icons/Property 1=Medium.png";
  }
  return url;
}

function renderTaskCard(
  title,
  description,
  prioImgURL,
  completedSubtasks,
  allSubTasks,
  column,
  width
) {
  column.innerHTML += generateBoardTemplate(
    title,
    description,
    prioImgURL,
    completedSubtasks,
    allSubTasks,
    width
  );
  //setCategoryColor(category);
  //fillupassigned();
}

function whichCategory(category, name) {
  let safename = name.replace(/\s+/g, "_");
  let taskCategory;
  let colorSetting = document.getElementById("category_" + safename);
  if (category === "us") {
    taskCategory = "UserStory";
    colorSetting.classList.add("userStory__task");
    colorSetting.innerHTML = taskCategory;
  } else {
    taskCategory = "Technical Task";
    colorSetting.classList.add("technical__task");
    colorSetting.innerHTML = taskCategory;
  }
}

function startDragging(draggedName) {
  currendeDraggedElement = draggedName;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(column) {
  draggQueenOperation(column);
  emptyAll();
  makeTheBoardGreatAgain();
  updateTasksInFirebase();
}

function draggQueenOperation(column) {
  let draggedTask = savedTask.find(
    (task) => task.name === currendeDraggedElement
  );
  draggedTask.status = column;
  console.log(draggedTask.status);
  savedTask = savedTask.map((task) => {
    if (task.name === draggedTask.name) {
      return draggedTask;
    }
    return task;
  });
}

function emptyAll() {
  toDoTasks = [];
  inProgressTasks = [];
  awaitFeedbackTasks = [];
  doneTasks = [];
}

async function updateTasksInFirebase() {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(savedTask), // Array in JSON umwandeln
  };

  await addNewTasks([newTask]);
  clearForm();
  await loadTasks();
  closeAddtask();
}

/**
 * Setzt alle Formularfelder zurück, indem die Werte von Texteingaben,
 * der Kategorieauswahl und des Subtask-Feldes geleert werden.
 * Die Priorität wird auf "Medium" zurückgesetzt.
 */
function clearForm() {
  document.getElementById("text__input").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dropdown_toggle").value = "";
  document.getElementById("date__input").value = "";
  document.getElementById("prio_medium").checked = true;
  document.querySelector(".category").value = "";
  document.getElementById("subtask").value = "";
}

/*
 * Blendet die leeren Statusmeldungen für die verschiedenen Task-Kategorien ein.
 */

/**
 * Schließt das Popup, indem es ausgeblendet wird.
 */
function closePopup() {
  document.getElementById("popup-container").style.display = "none";
}

/**
 * Schließt das "Add Task"-Fenster, indem es ausgeblendet wird.
 */
function closeAddtask() {
  document.getElementById("cover__all_addTask").style.display = "none";
}

/**
 * Öffnet das "Add Task"-Fenster, indem es angezeigt wird.
 */
function openAddtask() {
  document.getElementById("cover__all_addTask").style.display = "block";
  renderContactList(contacts);
}

/**
 * Schließt das Popup-Fenster, indem es ausgeblendet wird.
 */
function closepopup() {
  document.getElementById("popup_card").style.display = "none";
}
//ondragleave="removeHighlight('open')"

function openTaskDetails() {}
