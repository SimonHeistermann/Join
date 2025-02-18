function searchTasks() {
  let searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  if (!searchQuery) {
    loadTasks(); // Falls das Suchfeld leer ist, lade alle Aufgaben neu
    return;
  }

  let taskContainer = document.getElementById("content");
  taskContainer.innerHTML = "";

  fetch(`${baseUrl}/tasks.json`)
    .then((response) => response.json())
    .then((tasks) => {
      if (!tasks) {
        tasks = [];
      }

      let taskIds = Object.keys(tasks);
      let filteredTasks = taskIds
        .map((id) => tasks[id])
        .filter(
          (task) =>
            task.name.toLowerCase().includes(searchQuery) ||
            (task.description &&
              task.description.toLowerCase().includes(searchQuery))
        );

      if (filteredTasks.length > 0) {
        filteredTasks.forEach((task) => {
          taskContainer.innerHTML += generatBoardTemplate(task); // Verwende dein `generatBoardTemplate()` für das Rendering
        });
      } else {
        taskContainer.innerHTML = "<p>Keine Aufgaben gefunden</p>";
      }
    })
    .catch((error) => console.error("Fehler beim Laden der Aufgaben:", error));
}
