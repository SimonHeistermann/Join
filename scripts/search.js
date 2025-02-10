function searchTasks() {
  let searchInput = document.getElementById("find_task");
  let searchText = searchInput.value.toLowerCase();
  let tasks = document.getElementsByClassName("task");

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let taskName = task.getElementsByTagName("h3")[0].innerText.toLowerCase();
    let taskDescription = task
      .getElementsByTagName("p")[0]
      .innerText.toLowerCase();

    if (taskName.includes(searchText) || taskDescription.includes(searchText)) {
      task.style.display = "block"; // Zeigt die passende Aufgabe an
    } else {
      task.style.display = "none"; // Versteckt die nicht passenden Aufgaben
    }
  }
}
