let baseUrl =
  "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/";

function init() {
  console.log("Initialization successful.");
  addTaskIds();
  fetchData();
  loadBoardState();

  initSearch();
}

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
           <div class="progress">
            <div class="progress__bar" style="width: ${task.progress || 2}%">
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
              <img src="assets/icons/Priority symbols (1).png" alt="" width="32" onclick="openpopup()" />
            </div>
          </div>
        </div>
      </div>
    </div>`;
    }
  });
}

/* AddTask Functions */
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
      fetchData(); // Liste neu laden
    } else {
      console.error("Fehler beim Speichern!");
    }
  } catch (error) {
    console.error("Fehler:", error);
  }
}

function clearForm() {
  document.getElementById("text__input").value = "";
  document.getElementById("description").value = "";
  document.getElementById("assigned__to").value = "";
  document.getElementById("date__input").value = "";
  document.querySelector('input[name="prio"]:checked').checked = false;
  document.querySelector('select[name="category"]').value = "";
  document.getElementById("subtask").value = "";
}

// Popup-Funktionens
function openAddtask() {
  document.getElementById("popup_open").style.display = "block";
  document.getElementById("cover__all_addTask").style.display = "block";
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

// Funktion zum Speichern des Zustands der Spalten im localStorage???

// Den Zustand der Spalten speichern, wenn ein Drop-Ereignis auftritt
function drop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-over");
  const draggedElementId = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(draggedElementId);

  // Falls das Element existiert, füge es in die neue Spalte ein
  if (draggedElement) {
    event.target.appendChild(draggedElement);
  }

  // Nach jedem Drop den Zustand speichern
  saveBoardState();
}

// Funktion, um das Ziehen zu erlauben
function allowDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.add("drag-over");
}

// Funktion, um die ID des gezogenen Elements zu speichern
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

// Funktion, um das gezogene Element in die neue Spalte zu bewegen
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

// Suchfunktion initialisieren
function initSearch() {
  const searchInput = document.getElementById("find_task");

  // Event-Listener für das Eingabefeld hinzufügen
  searchInput.addEventListener("input", (event) => {
    const searchText = event.target.value.toLowerCase();
    const tasks = document.getElementsByClassName("task");
    let found = false;

    Array.from(tasks).forEach((task) => {
      const title = task.querySelector("h3").textContent.toLowerCase();
      const description = task.querySelector("p").textContent.toLowerCase();

      if (title.includes(searchText) || description.includes(searchText)) {
        task.style.display = "block";
        found = true;
      } else {
        task.style.display = "none";
      }
    });

    // Überprüfen, ob keine Aufgaben gefunden wurden
    const columns = document.getElementById("search_area");
    if (!found) {
      columns.innerHTML = `<p style="text-align: center; font-size: 18px; color: gray;">Sorry, nix ist gefunden</p>`;
    } else {
      addTaskIds();
    }
  });
}
