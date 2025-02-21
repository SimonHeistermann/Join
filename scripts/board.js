
let baseUrl =
  "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Initialisiert die Anwendung, lädt die Aufgaben und aktualisiert die Task-Anzahl-Anzeige.
 */
async function init() {
  console.log("Test Initializations");
  await loadTasks();
  fillTheTag();
  quantityUpdate();

}

/**
 * Fügt neue Aufgaben zur bestehenden Aufgabenliste hinzu und speichert die aktualisierte Liste in der API.
 *
 * @param {Array} newTasks - Die neuen Aufgaben, die hinzugefügt werden sollen.
 */
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
}

/**
 * Lädt die Aufgaben von der API, wandelt die Antwort in JSON um
 * und übergibt die Daten an `renderTasks()`. Falls keine Aufgaben vorhanden sind,
 * wird ein leeres Array verwendet.
 */
async function loadTasks() {
  let response = await fetch(`${baseUrl}/tasks.json`);
  let tasks = await response.json();
  console.log(tasks);
  if (!tasks) {
    tasks = [];
  }
  renderTasks(tasks);
}


  function renderTasks(tasks) {
  let taskContainer = document.getElementById("content");
  taskContainer.innerHTML = "";
  let taskIds = Object.keys(tasks);

  for (let i = 0; i < taskIds.length; i++) {
    let taskId = taskIds[i];
    let task = tasks[taskId];

    if (!task) {
      continue;
    }
let subTasks = task.subTasks || [];
    let completedSubtasks = subTasks.filter((st) => st.completed).length;
    let totalSubtasks = subTasks.length;
    let subTaskList = subTasks.map((st) => `<li>${st.name}</li>`).join("");

  
  taskContainer.innerHTML += generateBoardTemplate(taskId, task, completedSubtasks, totalSubtasks);
    ;

  }
}   


/**
 * Verarbeitet das Ablegen eines Drag & Drop-Elements, verschiebt die Task in das neue Ziel
 * und aktualisiert die Task-Anzahl-Anzeige.
 *
 * /* @param {DragEvent} ev - Das Drop-Event.
 */
  function drop(ev) {
  ev.preventDefault();
  let taskId = ev.dataTransfer.getData("text");
  let taskElement = document.getElementById(taskId);
  let dropTarget = ev.target.closest(".tasks");
  if (taskElement && dropTarget) {
    dropTarget.appendChild(taskElement);
  }
  quantityUpdate();
}  

/**
 * Ermöglicht das Ablegen eines Elements, indem das Standardverhalten des Browsers verhindert wird.
 *
 * @param {DragEvent} ev - Das Drag-Event.
 */
 function allowDrop(ev) {
  ev.preventDefault();
  quantityUpdate()
}
 
/**
 * Speichert die ID des gezogenen Elements in den `dataTransfer`-Daten,
 * um es für das Drag & Drop-Event verfügbar zu machen.
 *
 * @param {DragEvent} ev - Das Drag-Event.
 */
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);

}  

/**
 * Aktualisiert die Task-Anzahl-Anzeige in den verschiedenen Spalten
 * und blendet einen Hinweis ein, wenn keine Tasks mehr vorhanden sind.
 */

  function quantityUpdate() {
    const columns = [
        { columnId: 'content', headerId: 'task_counter' },
        { columnId: 'column_progress', headerId: 'no_tasks_inpro' },
        { columnId: 'column_await', headerId: 'no_task_await' },
        { columnId: 'column_done', headerId: 'no_task_done' }
    ];

    columns.forEach(({ columnId, headerId }) => {
        const column = document.getElementById(columnId);
        const header = document.getElementById(headerId);
    const taskCount = [...column.children].filter(child => !child.classList.contains('no__tasks')).length;
      updatedTodoColumns(header, taskCount);
         if (taskCount === 0) {
            header.style.display = "block";
            header.innerHTML = "Keine Task Mehr";
        } else {
            header.style.display = "none"; 
        }
    });
}

function updatedTodoColumns(header, count) {
      header.innerHTML = `${header.innerHTML.split('')[0]}(${count})`;
  }
   
  
/**
 * Hebt ein Element durch das Hinzufügen der Klasse `column__hightlight` hervor.
 *
 * @param {string} id - Die ID des Elements, das hervorgehoben werden soll.
 */
  function hightlight(id) {
  document.getElementById(id).classList.add("column__hightlight");
 }
 
/**
 * Entfernt die Hervorhebung eines Elements, indem die Klasse `column__hightlight` entfernt wird.
 *
 * @param {string} id - Die ID des Elements, dessen Hervorhebung entfernt werden soll.
 */
  function removeHighlight(id) {
  document.getElementById(id).classList.remove("column__hightlight");
}  

/**
 * Zeigt ein Popup mit den Details einer Aufgabe an.
 *
 * @param {Object} task - Das Task-Objekt, das im Popup angezeigt werden soll.
 */
function showPopup(task) {
  let popupContainer = document.getElementById("popup-container");
  popupContainer.innerHTML = createPopup(task);
  popupContainer.style.display = "block";
}

function createPopup(task) {
  let assignedTo = task.assigned_to ? task.assigned_to.join(", ") : "Niemand";
  let priority = task.prio ? String(task.prio).toLowerCase() : "unknown";
  return generateOverlayTemplate(task);
}


  async function saveTask() {
    const title = document.getElementById("text__input").value;
    const description = document.getElementById("description").value;
    const assignedToElement = document.getElementById("dropdown_toggle");
    const assignedTo = assignedToElement ? [assignedToElement.innerText] : [];
    const dueDate = document.getElementById("date__input").value;
    const categoryElement = document.querySelector(".category");
    const category = categoryElement ? categoryElement.value : "";
    const subtask = document.getElementById("subtask").value;
    if (categoryElement) {
      categoryElement.classList.remove("task-type__overlay", "task__technical"); 
      if (category.value === "User Story") {
        category.classList.add("task-type__overlay");
      } else {
        categoryElement.classList.add("task__technical");
      }

    }
    

  
    let prio = `Medium <img id="medium_img_add" src="assets/icons/Prio media.png" alt="="/>` // Standard: Medium
    if (document.getElementById("prio_urgent").checked) {
      prio = `Urgent <img id="urgend_img" src="assets/icons/Property 1=Urgent.png" alt="↑">`;
    } else if (document.getElementById("prio_low").checked) {
      prio = `Low <img id="low_img" src="assets/icons/Property 1=Low.png" alt="↓">  `;
    }
   if (!title || !dueDate || !category) {
      alert("Bitte fülle alle Pflichtfelder aus!");
      return;
    }
  
    const newTask = {
      name: title,
      description: description || "",
      assigned_to: assignedTo,
      due_date: dueDate,
      prio: prio,
      category: category,
      subtask: subtask ? [subtask] : [],
      status: "to-do",
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

function saveTaskToLocalStorage(task) {
  let localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  localTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(localTasks));
}
function loadLocalTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log("Geladene lokale Aufgaben:", tasks);
  renderTasks(tasks);
}

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
}

/**
 * Schließt das Popup-Fenster, indem es ausgeblendet wird.
 */
function closepopup() {
  document.getElementById("popup_card").style.display = "none";
}




