// Add Task: 

/**
 * Generates the HTML template for displaying a contact in the dropdown.
 * The contact's styling (e.g., selected state) is dynamically applied based on whether it is chosen.
 * @param {Object} contact - The contact to render.
 * @returns {string} The HTML string for the contact item.
 */
function generateContactTemplate(contact) {
    const isSelected = choosenContacts.some(c => c.id === contact.id);
    return `
        <li onclick="contactChoosen(${contact.id})" class="dropdown__item ${isSelected ? 'dropdown__item__checked' : ''}" id="contact_${contact.id}">
            <div class="dropdown__item__left">
                <div class="dropdown__avatar ${getBadgeColor(contact.name)}">${contact.initials}</div>
                <h3>${contact.name}</h3>
            </div>
            <label class="contact__checkbox__container">
                <input onclick="contactChoosen(${contact.id})" class="contact__checkbox" type="checkbox" id="contact_checkbox_${contact.id}" ${isSelected ? 'checked' : ''}>
                <span class="custom__checkbox ${isSelected ? 'd__none' : ''}" id="checkbox_blue_${contact.id}"></span>
                <span class="custom__checkbox__white ${isSelected ? '' : 'd__none'}" id="checkbox_white_${contact.id}"></span>
            </label>
        </li>
    `;
}

/**
 * Generates the HTML markup for displaying the current user in the contact list.
 * The current user has a unique label "(You)" and can be selected via a checkbox.
 * 
 * @returns {string} The generated HTML string for the current user in the contact list.
 */
function renderHTMLYouInContactList() {
    return `
        <li onclick="updateCurrentUserChoosen(event)" class="dropdown__item ${currentUserChoosen ? 'dropdown__item__checked' : ''}" id="contact_${currentUser.name}">
            <div class="dropdown__item__left">
                <div class="dropdown__avatar ${getBadgeColor(currentUser.name)}">${currentUser.initials}</div>
                <h3>${currentUser.name} (You)</h3>
            </div>
            <label class="contact__checkbox__container">
                <input onclick="updateCurrentUserChoosen(event)" class="contact__checkbox" type="checkbox" id="contact_checkbox_${currentUser.name}" ${currentUserChoosen ? 'checked' : ''}>
                <span class="custom__checkbox ${currentUserChoosen ? 'd__none' : ''}" id="checkbox_blue_${currentUser.name}"></span>
                <span class="custom__checkbox__white ${currentUserChoosen ? '' : 'd__none'}" id="checkbox_white_${currentUser.name}"></span>
            </label>
        </li>
    `;
}

/**
 * Generates the HTML markup for a task category in the dropdown menu.
 * When clicked, the selected category is set.
 * 
 * @param {string} category - The name of the task category.
 * @returns {string} The generated HTML string for a task category item.
 */
function generateTaskCategoryTemplate(category) {
    return `
        <li onclick="taskCategorySelected('${category}', event)" class="dropdown__item__category">
            <h3>${category}</h3>
        </li>
    `;
}

/**
 * Generates the HTML for a chosen contact to be displayed in the chosen contacts container.
 * The contact's avatar (including the badge color) and initials are rendered.
 * 
 * @param {Object} contact - The chosen contact to render.
 * @param {string} contact.name - The name of the contact (used to determine the badge color).
 * @param {string} contact.initials - The initials of the contact (displayed in the avatar).
 * 
 * @returns {string} The HTML string for displaying the chosen contact's avatar.
 */
function renderHTMLChoosenContact(contact) {
    return  `
            <div class="dropdown__avatar ${getBadgeColor(contact.name)}">${contact.initials}</div>
            `;
}

/**
 * Generates the HTML markup for displaying the currently chosen user.
 * This includes the user's avatar with the assigned badge color.
 * 
 * @returns {string} The generated HTML string for the chosen user avatar.
 */
function renderHTMLChoosenUser() {
    return  `
            <div class="dropdown__avatar ${getBadgeColor(currentUser.name)}">${currentUser.initials}</div>
            `;
}

/**
 * Generates the HTML markup for a subtask item.
 * Each subtask includes a name, an edit button, and a delete button.
 * 
 * @param {Object} subTask - The subtask object containing its ID and name.
 * @returns {string} The generated HTML string for the subtask.
 */
function renderHTMLSubtask(subTask) {
    return `
        <div ondblclick="openEditSubTask(${subTask.id}, event)" class="subtask__item" id="subtask_${subTask.id}">
            <div class="subtask__item__left">
                <span>•</span>
                ${subTask.name}
            </div>
            <div class="edit__and__delete__subtask__box">
                <button onclick="openEditSubTask(${subTask.id}, event)" class="edit__subtask__box__hover">
                    <img class="edit__subtask__icon" src="./assets/icons/edit_icon_subtask_blue.png" alt="Edit">
                    <img class="edit__subtask__icon__hover" src="./assets/icons/edit_icon_subtask_blue_hover.png" alt="Edit">
                </button>
                <div class="add__subtask__seperator"></div>
                <button onclick="deleteSubTask(${subTask.id}, event)" class="delete__subtask__box__hover">
                    <img class="delete__subtask__icon" src="./assets/icons/delete_icon_subtask_blue.png" alt="Delete">
                    <img class="delete__subtask__icon__hover" src="./assets/icons/delete_icon_subtask_blue_hover.png" alt="Delete">
                </button>
            </div>
        </div>
    `;
}

/**
 * Generates the HTML markup for editing a subtask.
 * Allows the user to modify the subtask name and provides buttons for saving or deleting.
 * 
 * @param {Object} subTask - The subtask object containing its ID and name.
 * @returns {string} The generated HTML string for editing a subtask.
 */
function renderHTMLEditSubTask(subTask) {
    return  `   
            <div class="subtask__item__edited" id="subtask_${subTask.id}">
                <input onkeydown="handleKeyDownEditedSubTask(${subTask.id}, event)" class="subtask__edit__input" type="text" id="subtask_edit_input" value="${subTask.name}">
              <label for="subtask_edit_input">
                <button onclick="deleteSubTask(${subTask.id}, event)" class="delete__subtask__box__hover">
                    <img class="delete__subtask__icon" src="./assets/icons/delete_icon_subtask_blue.png" alt="Delete">
                    <img class="delete__subtask__icon__hover" src="./assets/icons/delete_icon_subtask_blue_hover.png" alt="Delete">
                </button>
                <div class="add__subtask__seperator"></div>
                <button onclick="saveEditedSubTask(${subTask.id}, event)" class="check__subtask__box__hover">
                  <img class="check__subtask__icon" src="./assets/icons/hook_icon_subtask_blue.png" alt="Hook">
                  <img class="check__subtask__icon__hover" src="./assets/icons/hook_icon_subtask_blue_hover.png" alt="Hook">
                </button>
              </label>
            </div>
            `;
}


// Board:

function renderHTMLBoardCard(task, i) {
    return  `
            <div draggable="true" ondragstart="startDragging(this)" ondragend="stopDragging(this)" onclick="openTaskDetails(this)" class="board__card" id="card_${task.name}_${i}_${task.description}_${task.due_date}" data-task='${JSON.stringify(task)}'>
                <div class="card__category ${getTaskCategoryCSSClass(task.category)}">${getTaskCategory(task.category)}</div>
                <div class="card__center__container">
                    <span class="card__title">
                        ${task.name}
                    </span>
                    <span class="card__description">
                        ${truncateText(task.description)}
                    </span>
                </div>
                <div class="progress__container ${task.subtasks.length > 0 ? "" : "d__none"}">
                    <div class="progress__bar">
                        <div class="progress__fill" style="width: ${calculateCompletionPercentage(task.subtasks)}%;"></div>
                    </div>
                    <span class="progress__bar__text">${countCompletedSubtasks(task.subtasks)}/${task.subtasks.length} Subtasks</span>
                </div>
                <div class="card__bottom__container">
                    <div class="badges__container" id="badges_container_${task.name}_${i}_${task.description}_${task.due_date}"></div>
                    <div class="priority__symbols">
                        <img src="./assets/icons/${getPrioIcon(task.prio)}.png" alt="=">
                    </div>
                </div>
            </div>
            `;
}

function renderHTMLBoardAssingedToBadges(assignedTo) {
    return  `
            <div class="badge ${getBadgeColor(assignedTo)}">${getInitials(assignedTo)}</div>
            `;
}

function renderHTMLNoCardInBoard() {
    return  `
            <div class="no__task__container">
                 No tasks in To Do
            </div>
            `;
}

function renderHTMLTaskDetails(task) {
    return  `
    <div onclick="event.stopPropagation();" class="task__details__overlay" id="task_details_overlay">
        <div class="add__task__overlay__header">
          <div class="card__category__big ${getTaskCategoryCSSClass(task.category)}__big">${getTaskCategory(task.category)}</div>
          <div class="close__button__box">  
            <button onclick="closeTaskDetailsOverlay()" class="close__button">
                <img class="close__button__img" src="./assets/icons/close_icon_blue.png" alt="Close Icon">
                <img class="close__button__hover__img" src="./assets/icons/close_icon_blue_hover.png" alt="Close Icon Hover">
            </button>
          </div>
        </div>
        <h1 class="details__title">${task.name}</h1>
        <h3 class="details__description">${truncateText(task.description)}</h3>
        <div class="details__center__containers">
          <span class="details__text__center__left">Due date:</span>
          <span class="details__text__center__right">${formatTaskDueDateBoard(task.due_date)}</span>
        </div>
        <div class="details__center__containers">
          <span class="details__text__center__left">Priority:</span>
          <div class="details__priority">
            ${getPrioText(task.prio)}
            <img src="./assets/icons/${getPrioIcon(task.prio)}_small.png" alt="^">
          </div>
        </div>
        <div class="details__assigned__to__container">
          <span class="details__assigned__to__header">Assigned To:</span>
          <div class="details__assigned__to__box" id="details_assigned_to"></div>
        </div>
        <div class="details__assigned__to__container">
          <span class="details__assigned__to__header">Subtasks:</span>
          <div class="details__subtasks__box" id="details_subtasks"></div>
        </div>
        <div class="details__footer">
          <div class="details__footer__buttonbox">
            <button onclick="deleteTask(this)" class="delete__contact__button" data-task='${JSON.stringify(task)}'>
              <img class="delete__icon__default" src="./assets/icons/delete_icon_blue.png" alt="Delete Icon">
              <img class="delete__icon__hover" src="./assets/icons/delete_icon_lightblue.png" alt="Delete Icon">
              Delete
            </button>
            <div class="details__footer__buttonbox__seperator"></div>
            <button class="edit__contact__button" data-task='${JSON.stringify(task)}'>
              <img class="edit__icon__default" src="./assets/icons/edit_icon_blue.png" alt="Edit Icon">
              <img class="edit__icon__hover" src="./assets/icons/edit_icon_lightblue.png" alt="Edit Icon">
              Edit
            </button>
          </div>
        </div>
    </div>
            `;
}

function renderHTMLTaskDetailsAssignedTo(assignedTo) {
    return  `
            <div class="details__assigned__to__item">
              <div class="details__assigned__to__item__left">
                  <div class="details__assigned__to__avatar ${getBadgeColor(assignedTo)}">${getInitials(assignedTo)}</div>
                  <h3>${assignedTo}</h3>
              </div>
            </div>
            `;
}

function renderHTMLTaskDetailsSubTask(subTask, task) {
    return  `
            <div class="details__subtasks__item">
              <label for="subtask_${subTask.id}" class="details__subtasks__checkbox__container">
                <input onclick="updateSubTask(this, ${subTask.id})" class="details__subtasks" type="checkbox" id="subtask_${subTask.id}" name="subtask_${subTask.id}" data-task='${JSON.stringify(task)}' ${subTask.status === 1 ? 'checked' : ''}>
                <span class="custom__checkbox__subtasks"></span>
              </label>
              <span class="details__subtask__text">${subTask.name}</span>
            </div>
            `;
}
