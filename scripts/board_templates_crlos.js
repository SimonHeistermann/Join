function generateBoardTemplate(taskId, task, completedSubtasks, totalSubtasks, subTaskList) {
    return `
                  <div class="taskcard" id='taskcard_${name}'>
            <div class="category__task technical__task" id='category_${name}'>UserStory</div>
            <div class="headline__Task" id='headline_Task_${name}'>Headline</div>
            <div class="description__Task" id='description_Task_${name}'>Description</div>
            <div class="bar__quantity_Subtasks">  
              <div class="progress">
                <div class="outer__bar">
                  <div class="progress-bar" role="progressbar" style="width:25%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div class="how__many_subtasks" id='subtask_quantity_${name}'><p class="completed__Subtasks" id='completed_Subtasks_${name}'></p>/ <p class="allTasks"></p> Subtasks</div>
            </div>
            <div class="assigned__prio">
                <div class="assigned" id='assigned_${name}'>people</div>
                <div class="prio" id='img_prio_${name}'></div>
            </div>
          </div>`
}