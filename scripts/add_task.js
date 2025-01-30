async function saveTask() {
  const taskId = document.getElementById("text__input").value;
  const title = document.getElementById("text__input").value;
  const description = document.getElementById("description").value;
  const assignedTo = document.getElementById("assigned__to").value;
  const dueDate = document.getElementById("date__input").value;
  const prio = document.querySelector('input[name="prio"]:checked').value;
  const category = document.querySelector('select[name="category"]').value;
  const subtask = document.getElementById("subtask").value;

  const taskData = {
    title: title,
    description: description,
    assignedTo: assignedTo,
    dueDate: dueDate,
    prio: prio,
    category: category,
    subtask: subtask,
  };

  try {
    // Verwende POST, um eine neue Aufgabe hinzuzufügen
    const response = await fetch(baseUrl + "tasks.json", {
      method: "PUT",
      body: JSON.stringify(taskData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Aufgabe wurde erfolgreich gespeichert");
      fetchData();
    } else {
      console.error("Fehler beim Speichern der Aufgabe:", response.status);
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
  }
}

const tasks = [
  {
    id: 1,
    name: {
      assigned_to: ["Sofia Müller", "Benedikt Ziegler"],
      description: "Kochwelt Page & Recipe Recommender",
      due_date: "2025-02-10T10:00:00+01:00",
      name: "Page & Recipe Recommender",
      prio: 2,
      subtasks: [
        { task: "Establish CSS Methodology", status: "In Progress" },
        { task: "Setup Base Styles", status: "Not Started" },
      ],
    },
  },
  {
    id: 3,
    name: {
      assigned_to: ["Sofia Müller", "Benedikt Ziegler"],
      description: "Contact Form & Imprint",
      due_date: "2025-02-01T10:00:00+01:00",
      name: "Contact Form & Imprint",
      prio: 1,
      subtasks: [
        { task: "Create form structure", status: "Completed" },
        { task: "Style form elements", status: "Not Started" },
      ],
    },
  },
  {
    id: 4,
    name: {
      assigned_to: ["Sofia Müller", "Benedikt Ziegler"],
      description: "Implement daily recipe and portion calculator",
      due_date: "2025-02-09T10:00:00+01:00",
      name: "Daily Kochwelt Recipe",
      prio: 2,
      subtasks: [
        { task: "Create recipe structure", status: "In Progress" },
        { task: "Define portion sizes", status: "Not Started" },
      ],
    },
  },
  {
    id: 5,
    name: {
      assigned_to: ["Sofia Müller", "Benedikt Ziegler"],
      description: "Define CSS naming conventions and structure",
      due_date: "2025-02-02T10:00:00+01:00",
      name: "CSS Architecture Planning",
      prio: 1,
      subtasks: [
        { task: "Research CSS methodologies", status: "Completed" },
        { task: "Create naming conventions", status: "In Progress" },
      ],
    },
  },
];

// Funktion zum Posten vieler Aufgaben mit Subtasks
async function postMultipleTasks() {
  const baseUrl =
    "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/tasks/";

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    try {
      const response = await fetch(baseUrl + task.id + ".json", {
        method: "PUT", // PUT wird verwendet, um die Aufgaben mit einer bestimmten ID zu speichern
        body: JSON.stringify(task.name),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`Aufgabe mit ID ${task.id} wurde erfolgreich hinzugefügt.`);
      } else {
        console.error(
          `Fehler beim Hinzufügen der Aufgabe mit ID ${task.id}:`,
          response.status
        );
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
  }
}
