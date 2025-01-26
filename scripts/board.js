function init() {
  console.log("Initialization successful.");
  addTaskIds();
}

// Popup-Funktionen
function openNav() {
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay_popup").style.display = "block";
}

function closeNav() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay_popup").style.display = "none";
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

// IDs hinzufügen, sobald die Seite geladen ist
document.addEventListener("DOMContentLoaded", addTaskIds);

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
