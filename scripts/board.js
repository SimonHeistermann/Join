let baseUrl =
  "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/";

async function init() {
  console.log("Test Initializations");
  await loadTasks();
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
  let taskProgress = document.getElementById("content_inprogress");
  let taskAwaitFeedback = document.getElementById("content_await");
  taskContainer.innerHTML = ""; // Vorherige Inhalte löschen
  taskProgress.innerHTML = ""; // Vorherige Inhalte löschen

  let taskIds = Object.keys(tasks);
  for (let i = 0; i < taskIds.length; i++) {
    let taskId = taskIds[i];
    let task = tasks[taskId];
    if (!task) {
      continue;
    }
    taskContainer.innerHTML =
      `
      
 <div class="task">
 <div class="Overlay" onclick='showPopup(${JSON.stringify(task)})'>
<div class="task__type user__story">${task.category}</div>
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
            <img src="assets/icons/Priority symbols (1).png" alt="Priority Icon" width="32" />
        </div>
    </div>
</div>
</div>
</div>

  ` + taskContainer.innerHTML;
  }
}
function showPopup(task) {
  let popupContainer = document.getElementById("popup-container");
  popupContainer.innerHTML = createPopup(task);
  popupContainer.style.display = "block";
}

function closePopup() {
  document.getElementById("popup-container").style.display = "none";
}

function createPopup(task) {
  let assignedTo = task.assigned_to ? task.assigned_to.join(", ") : "Niemand";
  let priority = task.prio ? String(task.prio).toLowerCase() : "unknown";

  return `
  <div class="overlayPopup">
    <div class="popup">
      <div class="popup__card-header">
        <div class="close__btn__popup">
          <span class="task__type user__story">${task.category}</span>
          <button onclick="closePopup()">&times;</button>
        </div>
      </div>
      <div class="all__content">
        <div class="title_header">${task.name}</div>
        <div class="popup__card-section">
          <p>${task.description}</p>
        </div>
        <div class="popup__card-section">
          <p><strong>Due date:</strong> ${
            task.due_date || "Kein Datum angegeben"
          }</p>
        </div>
        <p><strong>Priority:</strong>
         <span class="popup__card-priority">${priority}</span></p>
      </div>
      <div class="popup__card-section">
        <p><strong>Assigned To:</strong> ${assignedTo}</p>
        <div class="popup__card-section">
          <p><strong>Subtasks:</strong> ${
            task.subtasks ? task.subtasks.join(", ") : "Keine Subtasks"
          }</p>
        </div>
      </div>
      <div class="conten__delete__editiBTN">
        <div class="popup__card-actions">
         <button class="delete-btn" onclick="deleteTask('${
           task.id ? task.id : ""
         }')">

            <img src="assets/icons/delete_icon_blue.png" alt=""> Delete
          </button>
          <button id="popup_edit_button" class="edit_button">
            <img src="assets/icons/edit_icon_blue.png" alt="">Edit
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
}

async function saveTask(status = "to-do") {
  const title = document.getElementById("text__title").value;
  const description = document.getElementById("description").value;
  const assignedTo = document.getElementById("assigned__to").value;
  const dueDate = document.getElementById("date__input").value;
  const category = document.getElementById("category").value;
  const subtask = document.getElementById("subtask").value;

  let prio = 2; // Standard Medium
  if (document.getElementById("prio_urgent").checked) {
    prio = 1;
  } else if (document.getElementById("prio_low").checked) {
    prio = 3;
  }

  if (!title || !dueDate || !category) {
    alert("Bitte fülle alle Pflichtfelder aus!");
    return;
  }

  const newTask = {
    name: title,
    description: description,
    assigned_to: assignedTo ? [assignedTo] : [],
    due_date: dueDate,
    prio: prio,
    category: category,
    subtask: subtask ? [subtask] : [],
    status: status, // Status setzen (default: "to-do")
  };

  await addNewTasks([newTask]);

  clearForm();
  await loadTasks();
}

// Formular leeren
function clearForm() {
  document.getElementById("text__title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("assigned__to").value = "";
  document.getElementById("date__input").value = "";
  document.getElementById("prio_medium").checked = true;
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

/* function openpopup() {
  document.getElementById("popup_card").style.display = "block";
  document.getElementById("cover_all").style.display = "block";
} */

function closepopup() {
  document.getElementById("popup_card").style.display = "none";
  document.getElementById("cover_all").style.display = "none";
}

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
