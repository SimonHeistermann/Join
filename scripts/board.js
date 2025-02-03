/**
 * Base URL for Firebase database.
 */
let baseUrl =
  "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/";
/**
 

async function init() {
  console.log("Test Initializations");
  await loadTasks();
}

/**
 * Fetches all tasks from Firebase and displays them on the webpage.
 * If no tasks exist, an empty object is assigned to prevent errors.
 */
async function init() {
  console.log("Test Initializations");
  await loadTasks(); // Lädt bestehende Tasks
}

// Task in Firebase speichern
async function addNewTasks(newTasks) {
  let response = await fetch(`${baseUrl}/tasks.json`);
  let existingTasks = await response.json();

  if (!existingTasks) {
    existingTasks = [];
  }

  let updatedTasks = [...existingTasks, ...newTasks];

  await fetch(`${baseUrl}/tasks.json`, {
    method: "PUT", // `PUT` speichert die komplette Liste
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTasks),
  });

  console.log("Neue Tasks hinzugefügt!");
}

// Tasks aus Firebase laden
async function loadTasks() {
  let response = await fetch(`${baseUrl}/tasks.json`);
  let tasks = await response.json();
  console.log(tasks);

  if (!tasks) {
    tasks = [];
  }

  renderTasks(tasks);
}

// 🔥 Tasks in HTML anzeigen (mit `for`-Schleife)
function renderTasks(tasks) {
  let taskContainer = document.getElementById("content");
  taskContainer.innerHTML = ""; // Vorherige Inhalte löschen

  let taskIds = Object.keys(tasks);
  for (let i = 0; i < taskIds.length; i++) {
    let taskId = taskIds[i];
    let task = tasks[taskId];
    if (!task) {
      continue;
    }

    taskContainer.innerHTML =
      `
      
 <div class="task" onclick="openpopup()" >
<div class="task__type user__story">User Story</div>
<h3>${task.name}</h3> 
<p>${task.description}</p>
<div class="progress">
 <div class="progress__bar" style="width: ${task.progress || 2}%">
 </div>
</div>
<div class="subtasks">1/2 
<p>
${task.ubtasks ? task.ubtasks.join(", ") : ""}</p> Subtasks</div>

<div class="avatars">
    <div class="avatars__menuIcon">
        <div class="avatars__group">
            <div class="avatar" style="background-color: #b2a745">AM</div>
            <div class="avatar" style="background-color: #ff7a00">EM</div>
            <div class="avatar" style="background-color: #ff4646">MB</div>
        </div>
        <div>
            <img src="assets/icons/Priority symbols (1).png" alt="Priority Icon" width="32" onclick="openpopup()" />
        </div>
    </div>
</div>
</div>

  ` + taskContainer.innerHTML;
  }
}
/* // 🔥 Task aus Firebase löschen
async function deleteTask(taskId) {
  await fetch(`${dataUrl}/tasks/${taskId}.json`, {
    method: "DELETE",
  });

  console.log(`Task ${taskId} gelöscht`);

  // Nach dem Löschen die Liste aktualisieren
  await loadTasks();
} 
   <button onclick="deleteTask('${taskId}')">❌ Löschen</button>
*/

// Task speichern, wenn der "Create Task"-Button geklickt wird
async function saveTask() {
  const title = document.getElementById("text__title").value;
  const description = document.getElementById("description").value;
  const assignedTo = document.getElementById("assigned__to").value;
  const dueDate = document.getElementById("date__input").value;
  const category = document.getElementById("category").value;
  const subtask = document.getElementById("subtask").value;

  // Priorität aus Radio-Buttons ermitteln
  let prio = 2; // Standard Medium
  if (document.getElementById("prio_urgent").checked) {
    prio = 1;
  } else if (document.getElementById("prio_low").checked) {
    prio = 3;
  }

  // Sicherstellen, dass die Pflichtfelder ausgefüllt sind
  if (!title || !dueDate || !category) {
    alert("Bitte fülle alle Pflichtfelder aus!");
    return;
  }

  // Neues Task-Objekt erstellen
  const newTask = {
    name: title,
    description: description,
    assigned_to: assignedTo ? [assignedTo] : [],
    due_date: dueDate,
    prio: prio,
    category: category,
    subtask: subtask ? [subtask] : [],
  };

  // 🔥 FEHLER GEFIXT: Task in Firebase speichern
  await addNewTasks([newTask]); // `newTask` wird als Array übergeben

  // Nach dem Speichern das Formular leeren
  clearForm();

  // Neu laden, um die Task-Liste zu aktualisieren
  await loadTasks();
}

// Formular leeren
function clearForm() {
  document.getElementById("text__title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("assigned__to").value = "";
  document.getElementById("date__input").value = "";
  document.getElementById("prio_medium").checked = true; // Standard auf Medium setzen
  document.getElementById("category").value = "";
  document.getElementById("subtask").value = "";
}

/** *
 * Opens the add task popup.
 */
function openAddtask() {
  document.getElementById("popup_open").style.display = "block";
  document.getElementById("cover__all_addTask").style.display = "block";
}

/**
 * Opens the add task popup.
 */
function showEmtyMassage() {
  document.getElementById("empty_done").style.display = "block";
  document.getElementById("empty_todo").style.display = "block";
  document.getElementById("empty_in_ progress").style.display = "block";
  document.getElementById("empty_feedback").style.display = "block";
}

function closeAddtask() {
  document.getElementById("popup_open").style.display = "none";
  document.getElementById("cover__all_addTask").style.display = "none";
}

function openpopup() {
  document.getElementById("popup_card").style.display = "block";
  document.getElementById("cover_all").style.display = "block";
}

function closepopup() {
  document.getElementById("popup_card").style.display = "none";
  document.getElementById("cover_all").style.display = "none";
}

/**
 * Adds IDs to all tasks and empty messages.
 */
function addTaskIds() {
  const tasksTask = document.getElementsByClassName("task");
  const tasksEmpty = document.getElementsByClassName("empty__message");

  const tasks = [...tasksTask, ...tasksEmpty];

  // IDs hinzufügen
  tasks.forEach((task, index) => {
    if (!task.id) {
      task.id = `task-${index + 1}`;
    }
  });
}
/**
 * Enables drag and drop functionality.
 * @param {DragEvent} event - The drag event.
 */
function drop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-over");
  const draggedElementId = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(draggedElementId);

  if (draggedElement) {
    event.target.appendChild(draggedElement);
  }
}

/**
 * Allows an element to be dropped.
 * @param {DragEvent} event - The drag event.
 */
function allowDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.add("drag-over");
}

// Funktion, um die ID des gezogenen Elements zu speichern
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

/**
 * Handles dropping of an element into a new container.
 * @param {DragEvent} event - The drag event.
 */
function drop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-over");
  const draggedElementId = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(draggedElementId);

  // Falls das Element existiert, füge es in die neue Spalte ein
  if (draggedElement) {
    event.target.appendChild(draggedElement);
  }
}

/**
 * Initializes search functionality.
 */

function initSearch() {
  const searchInput = document.getElementById("find_task");

  searchInput.oninput = function () {
    const searchText = searchInput.value.toLowerCase();
    const tasks = document.getElementsByClassName("task");
    let found = false;

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const title = task
        .getElementsByTagName("h3")[0]
        .textContent.toLowerCase();
      const description = task
        .getElementsByTagName("p")[0]
        .textContent.toLowerCase();

      if (title.includes(searchText) || description.includes(searchText)) {
        task.style.display = "block";
        found = true;
      } else {
        task.style.display = "none";
      }
    }

    const searchArea = document.getElementById("search_area");
    const searchMessage = document.getElementById("search_message");

    if (!found) {
      if (!searchMessage) {
        searchArea.innerHTML +=
          '<p id="search_message" style="text-align:center; font-size:12px; color:gray; ">No Task</p>';
        showEmtyMassage();
      }
    } else {
      if (searchMessage) searchMessage.remove();
    }
  };
}
