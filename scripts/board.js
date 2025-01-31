/**
 * Base URL for Firebase database.
 */
let baseUrl =
  "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/";
/**
 * Initializes the application.
 */

function init() {
  console.log("Initialization successful.");
  addTaskIds();
  fetchData();
  initSearch();
}

/**
 * Fetches tasks from Firebase and displays them in the UI.
 */
async function fetchData() {
  let response = await fetch(baseUrl + ".json");
  let getTasks = await response.json();
  console.log("Daten von Firebase:", getTasks.tasks);
  if (getTasks && getTasks.tasks) {
    showTasks(getTasks.tasks);
  }

  // Dynamisches Befüllen des "Assigned to" Dropdowns
  const assignedToSelect = document.getElementById("assigned__to");
  const users = ["Sofia Müller", "Benedikt Ziegler"]; // Beispielbenutzer, hier ggf. Firebase-Daten verwenden
  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = user;
    assignedToSelect.appendChild(option);
  });
}
/**
 * Displays tasks in the UI.
 * @param {Object} tasks - The tasks to be displayed.
 */

function showTasks(tasks) {
  let container = document.getElementById("taskContainer");
  container.innerHTML = "";

  // Aufgaben aus einem Objekt in ein Array umwandeln
  const tasksArray = Object.values(tasks);

  tasksArray.forEach((task, i) => {
    if (task !== null) {
      container.innerHTML += `
      <div class="content__Todo${i}">

      <div class="task" onclick="openpopup()" id="task-4" draggable="true" ondragstart="drag(event)">
  <div class="task__type user__story">User Story</div>
  <h3>${task.name}</h3> 
  <p>${task.description}</p>

  <div class="progress">
      <div class="progress__bar" style="width: ${task.progress || 2}%"></div>
  </div>

  <div class="subtasks">1/2 Subtasks</div>

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

    
    </div>
    `;
    }
  });
}

/**
 * Saves a new task to Firebase.
 */
async function saveTask() {
  const name = document.getElementById("text__input").value;
  const description = document.getElementById("description").value;
  const assignedTo = document.getElementById("assigned__to").value;
  const dueDate = document.getElementById("date__input").value;
  const prio = document.querySelector('input[name="prio"]:checked')?.value;
  const category = document.querySelector('select[name="category"]').value;
  const subtask = document.getElementById("subtask").value;

  if (!name || !description || !assignedTo || !dueDate || !prio || !category) {
    alert("Bitte alle Felder ausfüllen!");
    return;
  }

  const taskData = {
    name: name,
    description: description,
    assignedTo: assignedTo,
    dueDate: dueDate,
    prio: prio,
    category: category,
    subtask: subtask,
  };

  try {
    let response = await fetch(baseUrl + "tasks.json", {
      method: "POST", // Neues Task-Objekt in Firebase hinzufügen
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      console.log("Task gespeichert!");
      fetchData();
    } else {
      console.error("Fehler beim Speichern!");
    }
  } catch (error) {
    console.error("Fehler:", error);
  }
}
/**
 * Clears the task input form.
 */

function clearForm() {
  document.getElementById("text__input").value = "";
  document.getElementById("description").value = "";
  document.getElementById("assigned__to").value = "";
  document.getElementById("date__input").value = "";
  document.querySelector('input[name="prio"]:checked').checked = false;
  document.querySelector('select[name="category"]').value = "";
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
