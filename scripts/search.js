 function searchTasks() {
      let searchInput = document.getElementById("searchInput").value.toLowerCase();
       fetch(`${baseUrl}/tasks.json`)
        .then((response) => response.json())
        .then((tasks) => {
          if (!tasks) {
            tasks = {};
          }
          emtyHTML()
       let taskIds = Object.keys(tasks);
          let foundTasks = false;
    
          taskIds.forEach((taskId) => {
            let task = tasks[taskId];
          if (
              task.name.toLowerCase().includes(searchInput) ||
              (task.description && task.description.toLowerCase().includes(searchInput))
            ) {
              foundTasks = true;
    
           
              let totalSubtasks = task.subtasks ? task.subtasks.length : 0;
              let completedSubtasks = task.subtasks
                ? task.subtasks.filter((sub) => sub.completed).length
                : 0;
              let subTaskList = task.subtasks
                ? task.subtasks.map((sub) => `<li>${sub.name}</li>`).join("")
                : "";
    
              let taskHTML = generateBoardTemplate(taskId, task, completedSubtasks, totalSubtasks, subTaskList);
              
              let columnMap = {
                "to-do": "column-todo",
                "in-progress": "column_progress",
                "await-feedback": "column_await",
                "done": "column_done"
              };
              
              let columnId = columnMap[task.status] || "column-todo";
              
              document.getElementById(columnId).innerHTML += taskHTML;
            }
          });
    
        if (!foundTasks) {
            htmlreturn()
          }
        })
       
    } 
    
        

     function standerTasks(){

    }


      function htmlreturn(){
        document.getElementById("column-todo").innerHTML = `<p class="no__tasks">No tasks</p>`;
        document.getElementById("column_progress").innerHTML =`<p class="no__tasks">No tasks</p>`;
        document.getElementById("column_await").innerHTML = `<p class="no__tasks">No tasks</p>`;
        document.getElementById("column_done").innerHTML = `<p class="no__tasks">No tasks</p>`;

      }

        function emtyHTML(){
          document.getElementById("column-todo").innerHTML = "";
          document.getElementById("column_progress").innerHTML = "";
          document.getElementById("column_await").innerHTML = "";
          document.getElementById("column_done").innerHTML = "";


        }

       

       