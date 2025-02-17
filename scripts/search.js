function searchTasks() {
  let searchInput = document.getElementById("searchInput").value.toLowerCase();
  let taskContainer = document.getElementById("content");

  taskContainer.innerHTML = "";

  fetch(`${baseUrl}/tasks.json`)
    .then((response) => response.json())
    .then((tasks) => {
      if (!tasks) {
        tasks = {};
      }

      let taskIds = Object.keys(tasks);
      let filteredTasks = taskIds.filter((taskId) => {
        let task = tasks[taskId];
        return (
          task.name.toLowerCase().includes(searchInput) ||
          (task.description &&
            task.description.toLowerCase().includes(searchInput))
        );
      });

      if (filteredTasks.length === 0) {
        taskContainer.innerHTML = "<p>No tasks</p>";
      } else {
        filteredTasks.forEach((taskId) => {
          let task = tasks[taskId];
          taskContainer.innerHTML += callbackCode(taskId, task);
        });
      }
    });
}

function callbackCode(taskId, task) {
  return `
    <div id="task${taskId}" class="task" draggable="true" ondragstart="drag(event)">
      <div class="Overlay" onclick='showPopup(${JSON.stringify(task)})'>
        <div class="task-type">Category</div>
        <h3>${task.name}</h3>
        <p>${task.description}</p>
        <div class="progress">
          <div class="progress-bar" style="width: ${task.progress || 2}%"></div>
        </div>
        <div class="subtasks">
          1/2 
          <p>${task.subtasks ? task.subtasks.join(", ") : ""}</p> Subtasks
        </div>
      </div>
    </div>
  `;
}
