/**
 * Generates an HTML form for editing a task's details.
 * 
 * @param {Object} task - The task object containing details.
 * @param {string} task.name - The title of the task.
 * @param {string} task.description - The description of the task.
 * @param {string|Date} task.due_date - The due date of the task.
 * @param {number} task.prio - The priority level (1 = Low, 2 = Medium, 3 = Urgent).
 * @param {string} task.category - The category of the task.
 * @returns {string} The HTML string for rendering the task editing form.
 */
function renderHTMLEditTaskDetails(task) {
    return  `
    <form onclick="event.stopPropagation();" class="edit__task__form" id="add_task_form" onsubmit="handleFormSubmitEdit(event)">
            <div class="edit__task__overlay__header">
                <div class="close__button__box">  
                    <button onclick="closeTaskDetailsOverlay()" class="close__button">
                        <img class="close__button__img" src="./assets/icons/close_icon_blue.png" alt="Close Icon">
                        <img class="close__button__hover__img" src="./assets/icons/close_icon_blue_hover.png" alt="Close Icon Hover">
                    </button>
                </div>
            </div>
            <div class="input__boxes__edit">
              <div class="add__task__left">
                <div class="input__container" id="add_task_title_input_container">
                  <label for="add_task_title_input_edit"><h3>Title<span class="red__star">*</span></h3></label>
                  <div class="input__box">
                    <input onkeydown="handleKeyDown(event)" type="text" id="add_task_title_input_edit" placeholder="Enter a title" value="${task.name}">
                    <div class="errormessage__box" id="add_task_title_input_box_error_box_edit"></div>
                  </div>
                </div>
                <div class="input__container">
                  <label for="task_description"><h3>Description</h3></label>
                  <div class="input__box">
                    <textarea onkeydown="handleKeyDown(event)" rows="5" cols="30" type="text" id="task_description_edit" placeholder="Enter a Description">${task.description}</textarea>
                  </div>
                </div>
                <div class="dropdown__container">
                  <label for="assignee_search_input_edit"><h3>Assigned to</h3></label>
                  <div class="dropdown__content">
                    <button class="dropdown__toggle" id="dropdown_toggle_edit" onclick="openDropdownListEdit(event)">
                      <h3>Select contacts to assign</h3>
                      <span class="dropdown__arrow__icon__container">
                        <img id="dropdown_arrow_icon_edit" class="dropdown__arrow__icon__default" src="./assets/icons/arrow_drop_down_icon.png" alt="Drop Down Icon">
                        <img id="dropdown_arrow_icon_hover_edit" class="dropdown__arrow__icon__hover" src="./assets/icons/arrow_drop_down_icon_hover.png" alt="Drop Down Icon">
                      </span>
                    </button>
                    <div class="dropdown__search__container dropdown__search__container__edit d__none" id="dropdown_search_container_edit">
                      <input onkeydown="handleKeyDown(event)" type="text" class="dropdown__search__input" id="assignee_search_input_edit" placeholder="" oninput="filterContactsEdit()"/>
                      <button onclick="closeDropDownListEdit(event)" class="close__dropdown__button">
                        <img id="dropdown_arrow_up_icon_edit" class="dropdown__arrow__up__icon__default" src="./assets/icons/arrow_drop_down_up_icon.png" alt="Drop Down Up Icon">
                        <img id="dropdown_arrow_up_icon_hover_edit" class="dropdown__arrow__up__icon__hover" src="./assets/icons/arrow_drop_down_up_icon_hover.png" alt="Drop Down Up Icon">
                      </button>
                    </div>
                    <div class="dropdown__list__wrapper edit__dropdown__list__wrapper" id="dropdown_list_wrapper_edit">
                      <div onclick="closeDropDownListEdit(event)" class="overlay__dropdownlist__contacts__add__task overlay__dropdownlist__contacts__add__task__edit d__none" id="overlay_dropdown_list_add_task_contacts_edit"></div>
                      <ul class="dropdown__list dropdown__list__edit" id="dropdown_list_edit"></ul>
                    </div>
                  </div>
                  <div class="choosen__contacts__container choosen__contacts__container__edit" id="choosen_contacts_container_edit">
                  </div>
                </div>
              </div>
              <div class="add__task__right">
                <div class="date__box">
                  <h3 class="due__date__text" onclick="openCalendarEdit()">Due date<span class="red__star">*</span></h3>
                  <div class="date__container" id="date_container_input_edit">
                      <input class="date__input" id="task_due_date_edit" type="text" placeholder="dd/mm/yyyy" name="task_due_date_edit" autocomplete="off" value="${formatTaskDueDateBoard(task.due_date)}">
                      <label for="task_due_date_edit" onclick="openCalendar()">
                          <img class="calendar__icon" src="./assets/icons/date_icon_black.png" alt="Calendar Icon">
                      </label>
                  </div>
                  <div id="errormessage_box_date_edit" class="errormessage__box"></div>
                </div>
                <div class="input__container">
                  <h3>Prio</h3>
                  <div class="radio__container">
                    <label class="radio radio__urgent">
                      <input type="radio" name="prio" value="1" onclick="setTaskPrioEdit(1)" ${task.prio === 3 ? "checked" : ""}/>
                      <h3>Urgent</h3>
                      <img class="urgent__icon__red" src="assets/icons/urgent_icon_red.png" alt="↑"/>
                      <img class="urgent__icon__white" src="assets/icons/urgent_icon_white.png" alt="↑"/>
                    </label>
                    <label class="radio radio__medium">
                      <input type="radio" name="prio" value="2" onclick="setTaskPrioEdit(2)" ${task.prio === 2 ? "checked" : ""}/>
                      <h3>Medium</h3>
                      <img class="medium__icon__orange" src="assets/icons/medium_icon_orange.png" alt="="/>
                      <img class="medium__icon__white" src="assets/icons/medium_icon_white.png" alt="=" />
                    </label>
                    <label class="radio radio__low">
                      <input type="radio" name="prio" value="3" onclick="setTaskPrioEdit(3)" ${task.prio === 1 ? "checked" : ""}/>
                      <h3>Low</h3> 
                      <img class="low__icon__green" src="assets/icons/low_icon_green.png" alt="↓"/>
                      <img class="low__icon__white" src="assets/icons/low_icon_white.png" alt="↓"/>
                    </label>
                  </div>
                </div>
                <div class="subtasks__container">
                  <h3>Subtasks</h3>
                  <div class="date__container subtasks__mobile__container" id="subtask_input_container_edit">
                    <input onclick="displayAddSubtaskButtonsEdit(event)" onkeydown="handleKeyDownAddSubTaskEdit(event)" class="date__input" id="input_subtasks_edit" type="text" placeholder="Add new subtask" name="input_subtasks_edit" autocomplete="off">
                    <label class="add__subtask__label" for="input_subtasks_edit">
                        <button onclick="displayAddSubtaskButtonsEdit(event)"  id="add_subtask_box_edit" class="add__subtask__box">
                          <img class="add__subtask__icon" src="./assets/icons/add_icon_blue.png" alt="+">
                          <img class="add__subtask__icon__hover" src="./assets/icons/add_icon_blue_hover.png" alt="+">
                        </button>
                        <div id="active_add_subtask_box_edit" class="active__add__subtask__box d__none">
                          <button onclick="closeAddSubTaskEdit(event)" class="close__subtask__box">
                            <img class="close__subtask__icon" src="./assets/icons/close_icon_subtask_blue.png" alt="X">
                            <img class="close__subtask__icon__hover" src="./assets/icons/close_icon_subtask_blue_hover.png" alt="X">
                          </button>
                          <div class="add__subtask__seperator"></div>
                          <button onclick="addSubtaskEdit(event)" class="check__subtask__box">
                            <img class="check__subtask__icon" src="./assets/icons/hook_icon_subtask_blue.png" alt="Hook">
                            <img class="check__subtask__icon__hover" src="./assets/icons/hook_icon_subtask_blue_hover.png" alt="Hook">
                          </button>
                        </div>
                    </label>
                  </div>
                  <div class="added__subtasks__container added__subtasks__container__edit" id="added_subtasks_container_edit">
                  </div>
                </div>
                <div class="is__required__text__mobile is__required__text__mobile__edit">
                  <span class="red__star">*</span>
                  This field is required
                </div>
              </div>
            </div>
            <div class="text__and__buttons text__and__buttons__edit">
              <div class="is__required__text is__required__text__edit">
                <span class="red__star">*</span>
                This field is required
              </div>
              <div class="add__task__buttonbox">
                <button type="submit" class="create__contact__button ok__button" id="create_task_button_edit">
                    Ok
                    <img src="./assets/icons/hook_icon_white.png" alt="Hook Icon">
                </button>
              </div>
            </div>
          </form>
            `;
}

/**
 * Generates an HTML element for displaying an assigned user's avatar.
 * 
 * @param {Object} assignedTo - The assigned user's information.
 * @returns {string} The HTML string for displaying the user's avatar with initials.
 */
function renderHTMLEditTaskDetailsAssignedTo(assignedTo) {
    return  `
        <div class="dropdown__avatar ${getBadgeColor(assignedTo)}">${getInitials(assignedTo)}</div>
    `;
}

/**
 * Generates the HTML template for displaying a contact in the dropdown.
 * The contact's styling (e.g., selected state) is dynamically applied based on whether it is chosen.
 * @param {Object} contact - The contact to render.
 * @returns {string} The HTML string for the contact item.
 */
function generateContactTemplateEdit(contact) {
    const isSelected = assignedToContacts.some(c => c === contact.name);
    return `
        <li onclick="contactChoosenEdit(${contact.id})" class="dropdown__item ${isSelected ? 'dropdown__item__checked' : ''}" id="contact_${contact.id}_edit">
            <div class="dropdown__item__left">
                <div class="dropdown__avatar ${getBadgeColor(contact.name)}">${contact.initials}</div>
                <h3>${contact.name}</h3>
            </div>
            <label class="contact__checkbox__container">
                <input onclick="contactChoosenEdit(${contact.id})" class="contact__checkbox" type="checkbox" id="contact_checkbox_${contact.id}_edit" ${isSelected ? 'checked' : ''}>
                <span class="custom__checkbox ${isSelected ? 'd__none' : ''}" id="checkbox_blue_${contact.id}_edit"></span>
                <span class="custom__checkbox__white ${isSelected ? '' : 'd__none'}" id="checkbox_white_${contact.id}_edit"></span>
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
function renderHTMLYouInContactListEdit() {
    return `
        <li onclick="updateCurrentUserChoosenEdit(event)" class="dropdown__item ${currentUserChoosenEdit ? 'dropdown__item__checked' : ''}" id="contact_${currentUser.name}_edit">
            <div class="dropdown__item__left">
                <div class="dropdown__avatar ${getBadgeColor(currentUser.name)}">${currentUser.initials}</div>
                <h3>${currentUser.name} (You)</h3>
            </div>
            <label class="contact__checkbox__container">
                <input onclick="updateCurrentUserChoosenEdit(event)" class="contact__checkbox" type="checkbox" id="contact_checkbox_${currentUser.name}_edit" ${currentUserChoosenEdit ? 'checked' : ''}>
                <span class="custom__checkbox ${currentUserChoosenEdit ? 'd__none' : ''}" id="checkbox_blue_${currentUser.name}_edit"></span>
                <span class="custom__checkbox__white ${currentUserChoosenEdit ? '' : 'd__none'}" id="checkbox_white_${currentUser.name}_edit"></span>
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
function generateTaskCategoryTemplateEdit(category) {
    return `
        <li onclick="taskCategorySelectedEdit('${category}', event)" class="dropdown__item__category">
            <h3>${category}</h3>
        </li>
    `;
}

/**
 * Generates an HTML element for displaying a subtask in the task editing view.
 * 
 * @param {Object} subTask - The subtask object containing details.
 * @param {number} subTask.id - The unique identifier of the subtask.
 * @param {string} subTask.name - The name or title of the subtask.
 * @returns {string} The HTML string for rendering the subtask.
 */
function renderHTMLEditTaskDetailsSubTask(subTask) {
    return `
        <div ondblclick="openEditSubTaskEdit(${subTask.id}, event)" class="subtask__item" id="subtask_${subTask.id}_edit">
            <div class="subtask__item__left">
                <span>•</span>
                ${truncateTextShorter(subTask.name)}
            </div>
            <div class="edit__and__delete__subtask__box">
                <button onclick="openEditSubTaskEdit(${subTask.id}, event)" class="edit__subtask__box__hover">
                    <img class="edit__subtask__icon" src="./assets/icons/edit_icon_subtask_blue.png" alt="Edit">
                    <img class="edit__subtask__icon__hover" src="./assets/icons/edit_icon_subtask_blue_hover.png" alt="Edit">
                </button>
                <div class="add__subtask__seperator"></div>
                <button onclick="deleteSubTaskEdit(${subTask.id}, event)" class="delete__subtask__box__hover">
                    <img class="delete__subtask__icon" src="./assets/icons/delete_icon_subtask_blue.png" alt="Delete">
                    <img class="delete__subtask__icon__hover" src="./assets/icons/delete_icon_subtask_blue_hover.png" alt="Delete">
                </button>
            </div>
        </div>
    `;
}

/**
 * Generates an HTML element for editing a subtask within the task editing view.
 * 
 * @param {Object} subTask - The subtask object containing details.
 * @param {number} subTask.id - The unique identifier of the subtask.
 * @param {string} subTask.name - The name or title of the subtask.
 * @returns {string} The HTML string for rendering the editable subtask input.
 */
function renderHTMLEditSubTaskEdit(subTask) {
    return `   
        <div class="subtask__item__edited" id="subtask_${subTask.id}_edit">
            <input onkeydown="handleKeyDownEditedSubTaskEdit(${subTask.id}, event)" 
                   class="subtask__edit__input" type="text" 
                   id="subtask_edit_input_edit" value="${subTask.name}">
            <label for="subtask_edit_input_edit">
                <button onclick="deleteSubTaskEdit(${subTask.id}, event)" class="delete__subtask__box__hover">
                    <img class="delete__subtask__icon" src="./assets/icons/delete_icon_subtask_blue.png" alt="Delete">
                    <img class="delete__subtask__icon__hover" src="./assets/icons/delete_icon_subtask_blue_hover.png" alt="Delete">
                </button>
                <div class="add__subtask__seperator"></div>
                <button onclick="saveEditedSubTaskEdit(${subTask.id}, event)" class="check__subtask__box__hover">
                    <img class="check__subtask__icon" src="./assets/icons/hook_icon_subtask_blue.png" alt="Hook">
                    <img class="check__subtask__icon__hover" src="./assets/icons/hook_icon_subtask_blue_hover.png" alt="Hook">
                </button>
            </label>
        </div>
    `;
}
