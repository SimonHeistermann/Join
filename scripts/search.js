function searchTasks() {
  let searchInput = document.getElementById("searchInput").value.toLowerCase();
  let tasks = document.querySelectorAll(".task");

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let title = task.querySelector(".task-title").innerText.toLowerCase();
    let description = task
      .querySelector(".task-description")
      .innerText.toLowerCase();

    if (title.includes(searchInput) || description.includes(searchInput)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
      task.innerHTML = "Keine Task";
    }
  }
}

function renderTasks(tasks) {
  let taskContainer = document.getElementById("content");

  taskContainer.innerHTML = "";
  let taskIds = Object.keys(tasks);

  for (let i = 0; i < taskIds.length; i++) {
    let taskId = taskIds[i];
    let task = tasks[taskId];

    if (!task) continue;

    let taskHTML = callbackCode(taskId, task);
    taskContainer.innerHTML += taskHTML;
  }
}

function callbackCode(taskId, task) {
  return `
    <div id="task${taskId}" class="task" draggable="true" ondragstart="drag(event)">
      <div class="Overlay" onclick='showPopup(${JSON.stringify(task)})'>
        <div class="task-type">Category</div>
        <h3 class="task-title">${task.name}</h3>
        <p class="task-description">${task.description}</p>
        <div class="progress">
          <div class="progress-bar" style="width: ${task.progress ?? 2}%"></div>
        </div>
        <div class="subtasks">1/2 
          <p>${task.subtasks ? task.subtasks.join(", ") : ""}</p> Subtasks
        </div>
      </div>
    </div>
  `;
}
