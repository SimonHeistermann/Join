function generateBoardTemplate(title, description, prioImgURL, completedSubtasks, allSubTasks) {
    let safename = title.replace(/\s+/g, "_");
    return `
                  <div class="taskcard" draggable="true" ondragstart="startDragging('${title}')" id='taskcard_${safename}'>
            <div class="category__task technical__task" id='category_${safename}'></div>
            <div class="headline__Task" id='headline_Task_${safename}'>${title}</div>
            <div class="description__Task" id='description_Task_${safename}'>${description}</div>
            <div class="bar__quantity_Subtasks">  
              <div class="progress">
                <div class="outer__bar">
                  <div class="progress-bar" role="progressbar" style="width:25%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id='progress_bar_${safename}'></div>
                </div>
              </div>
              <div class="how__many_subtasks" id='subtask_quantity_${safename}'><p class="completed__Subtasks" id='completed_Subtasks_${safename}'>${completedSubtasks}</p>/ <p class="allTasks">${allSubTasks}</p> Subtasks</div>
            </div>
            <div class="assigned__prio">
                <div class="assigned" id='assigned_${safename}'>people</div>
                <div class="prio" id='img_prio_${safename}'><img src="${prioImgURL}" alt=""></div>
            </div>
          </div>`
}