function init() {
  console.log("Initialization successful.");
  addTaskIds();
  /*   openAddtask(); */
  fetchData();
}

let baseUrl =
  "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/";

function init() {
  fetchData();
}

async function fetchData() {
  let response = await fetch(baseUrl + ".json");

  let getTasks = await response.json();
  console.log("Daten von Firebase:", getTasks.tasks);
  if (getTasks && getTasks.tasks) {
    showTasks(getTasks.tasks);
  }
}

function showTasks(tasks) {
  let container = document.getElementById("taskContainer");
  container.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i];

    // Überprüfe, ob das Element nicht null ist, bevor du darauf zugreifst
    if (element !== null) {
      container.innerHTML += `<div class="content__Todo${i}">
      <div class="task" onclick="openpopup()" id="task-4" draggable="true" ondragstart="drag(event)">
        <div class="task__type user__story">User Story</div>
        <h3>Title: ${element.name}</h3> 
        <p>${element.description}</p>
        <div class="progress">
          <div class="progress__bar" style="width: ${
            element.progress ? element.progress : "Keine Fortschrittsangabe"
          }%"></div>
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
  }
}

// Popup-Funktionen
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

document.addEventListener("DOMContentLoaded", () => {
  addTaskIds();
  initSearch();
});
