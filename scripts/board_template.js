

function generateBoardTemplate(
  taskId,
  task,
  completedSubtasks,
  totalSubtasks,
  subTaskList
) {
  return `
                <div id="task${taskId}" class="task" draggable="true" ondragstart="drag(event)">
                    <div class="Overlay" onclick='showPopup(${JSON.stringify(
                      task
                    )})'>
                        <div class="task__technical">${task.category}</div>
                        <h3>${task.name}</h3>
                        <p>${task.description}</p>
                        <div class="progress">
                            <div class="progress-bar" style="width: ${
                              task.progress || 2
                            }%"></div>
                        </div>
                        <div class="subtasks">${completedSubtasks}/${totalSubtasks} erledigt
                            <ul>${subTaskList}</ul>
                        </div>
                    </div>
                </div>
            `;
}

function generateOverlayTemplate(task, priority, assignedTo) {
  return `
 <div class="overlayPopup">
   <div class="popup">
      <div class="popup__card-header">
        <div class="close__btn__popup">
          <span class="task-type__overlay">${task.category}</span>
          <button onclick="closePopup()">&times;</button>
        </div>
      </div>
      <div class="all__content">
        <div class="title_header">${task.name}</div>
        <div class="popup__card-section">
          <p>${task.description}</p>
        </div>
        <div class="popup__card-section">
          <p><strong>Due date:</strong> ${
            task.due_date || "Kein Datum angegeben"
          }</p>
        </div>
        <p><strong>Priority:</strong>
         <span class="popup__card-priority">${task.prio}</span></p>
      </div>
      <div class="popup__card-section">
        <p><strong>Assigned To:</strong> ${task.assigned_to}</p>
        <div class="popup__card-section">
          <p><strong>Subtasks:</strong> ${
            task.subtasks ? task.subtasks.join(", ") : "Keine Subtasks"
          }</p>
        </div>
      </div>
      <div class="conten__delete__editiBTN">
        <div class="popup__card-actions">
         <button class="delete-btn" onclick="deleteTask('${
           task.id ? task.id : ""
         }')">

            <img src="assets/icons/delete_icon_blue.png" alt=""> Delete
          </button>
          <button id="popup_edit_button" class="edit_button">
            <img src="assets/icons/edit_icon_blue.png" alt="">Edit
          </button>
        </div>
      </div>
  
   </div>
    
 <div class="popupMobile">
    <div class="popup__card-header">
        <div class="close__btn__popup">
          <span class="">${task.category}</span>
          <button onclick="closePopup()">&times;</button>
        </div>
      </div>
      <div class="all__content">
        <div class="title_header__mobile">${task.name}</div>
        <div class="popup__card-section">
          <p>${task.description}</p>
        </div>
        <div class="popup__card-section">
          <p><strong>Due date:</strong> ${
            task.due_date || "Kein Datum angegeben"
          }</p>
        </div>
        <p><strong>Priority:</strong>
         <span class="popup__card-priority">${priority}</span></p>
      </div>
      <div class="popup__card-section">
        <p><strong>Assigned To:</strong> ${assignedTo}</p>
        <div class="popup__card-section">
          <p><strong>Subtasks:</strong> ${
            task.subtasks ? task.subtasks.join(", ") : "Keine Subtasks"
          }</p>
        </div>
      </div>
      <div class="conten__delete__editiBTN">
        <div class="popup__card-actions">
         <button class="delete-btn" onclick="deleteTask('${
           task.id ? task.id : ""
         }')">

            <img src="assets/icons/delete_icon_blue.png" alt=""> Delete
          </button>
          <button id="popup_edit_button" class="edit_button">
            <img src="assets/icons/edit_icon_blue.png" alt="">Edit
          </button>
        </div>
      </div>
  </div>
</div>

  `;
}
