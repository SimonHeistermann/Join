// Contacts:

/**
 * Renders the "Add Contact" button HTML.
 * @returns {string} HTML string for the "Add Contact" button.
 */
function renderHTMLAddContactButton() {
    return `
        <div class="add__contact__button__container">
            <button onclick="openAddNewContact()" class="add__contact__button" id="add_contact_button">
                Add new contact
                <img src="./assets/icons/person_add_icon_white.png" alt="Add Contact Icon">
            </button>
        </div>
    `;
}

/**
 * Generates a contact section grouped by the first letter of the contacts' names.
 * @param {string} letter - The first letter of the contact group.
 * @param {Object[]} contacts - Array of contact objects belonging to the group.
 * @returns {string} HTML string for the contact section.
 */
function generateHTMLContactSection(letter, contacts) {
    return `
        <div class="contacts__sections">
            <h3 class="contacts__lettertext">${letter}</h3>
            <div class="contacts__seperator"></div>
            <div class="contact__boxes">
                ${contacts.map(generateHTMLContactBox).join("")}
            </div>
        </div>
    `;
}

/**
 * Generates an individual contact box.
 * @param {Object} contact - Contact object containing details like name, email, and initials.
 * @returns {string} HTML string for the contact box.
 */
function generateHTMLContactBox(contact) {
    return `
        <div onclick="openContactDetails(this)" class="contact" data-contact='${JSON.stringify(contact)}'>
            <div class="contacts__profilebadge ${getBadgeColor(contact.name)}">${contact.initials}</div>
            <div class="contact__informationbox">
                <h3>${formatContactName(contact.name)}</h3>
                <span class="contact__mailtext">${contact.email}</span>
            </div>
        </div>
    `;
}

/**
 * Renders the contact details section.
 * @param {Object} contact - Contact object containing name, email, phone, and initials.
 * @returns {string} HTML string for the contact details.
 */
function renderHTMLContactDetails(contact) {
    return  `
            <div class="contact__name__box">
                <div class="contacts__profilebadge__big ${getBadgeColor(contact.name)}">${contact.initials}</div>
                <div class="contacts__name__box__right">
                    <span class="contact__name__bigtext">${contact.name}</span>
                    <div class="contact__buttons__container">
                        <button onclick="openEditContact(this)" class="edit__contact__button" data-contact='${JSON.stringify(contact)}'>
                            <img class="edit__icon__default" src="./assets/icons/edit_icon_blue.png" alt="Edit Icon">
                            <img class="edit__icon__hover" src="./assets/icons/edit_icon_lightblue.png" alt="Edit Icon">
                            Edit
                        </button>
                        <button onclick="deleteContact(this)" class="delete__contact__button" data-contact='${JSON.stringify(contact)}'>
                            <img class="delete__icon__default" src="./assets/icons/delete_icon_blue.png" alt="Delete Icon">
                            <img class="delete__icon__hover" src="./assets/icons/delete_icon_lightblue.png" alt="Delete Icon">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <h3>Contact Information</h3>
            <div class="contact__information__boxes">
                <div class="contact__information__containers">
                <span class="contact__information__headlines">Email</span>
                    <a class="contact__mailtext" href="mailto:${contact.email}" title="Send an email to ${contact.email}" aria-label="Email ${contact.email}">${contact.email}</a>
                </div>
                <div class="contact__information__containers">
                    <span class="contact__information__headlines">Phone</span>
                    <a class="contact__phonenumber" href="tel:${contact.tel}" title="Call ${contact.tel}1" aria-label="Phone number ${contact.tel}">${contact.tel}</a>
                </div>
            </div>
            `
}

/**
 * Renders the edit contact overlay with pre-filled data.
 * @param {Object} contact - Contact object containing name, email, phone, and initials.
 * @returns {string} HTML string for the edit contact overlay.
 */
function renderHTMLEditContactOverlay(contact) {
    return  `
            <div class="add__contact__overlay" id="add_contact_container">
                <div class="add__contact__overlay__left">
                    <div class="add__contact__overlay__left__content">
                        <img src="./assets/icons/logo_add_contact_overlay.png" alt="Join Logo">
                        <h1>Edit contact</h1>
                        <div class="add__contact__overlay__seperator"></div>
                    </div>
                </div>
                <div class="add__contact__overlay__right">
                    <div class="close__button__box">  
                        <button onclick="closeContactOverlay()" class="close__button">
                            <img class="close__button__img" src="./assets/icons/close_icon_blue.png" alt="Close Icon">
                            <img class="close__button__hover__img" src="./assets/icons/close_icon_blue_hover.png" alt="Close Icon Hover">
                        </button>
                    </div>
                    <form onsubmit="handleFormSubmit(event, 'edit')" class="add__contact__form">
                        <div class="add__contact__container">
                            <div class="contacts__profilebadge__big ${getBadgeColor(contact.name)}">
                            ${contact.initials}
                            </div>
                            <div class="add__contact__inputbox">
                                <div class="person__container">
                                    <input class="person__input" id="person_input_add_contact" type="text" name="name" placeholder="Name" value="${contact.name}">
                                    <label for="person_input_add_contact">
                                        <img class="person__logo" src="./assets/icons/person_icon_gray.png" alt="Person Icon">
                                    </label>
                                </div>
                                <div class="email__container">
                                    <input class="email__input" id="email_input_add_contact" type="text" name ="email" placeholder="Email" autocomplete="email" value="${contact.email}"> 
                                    <label for="email_input_add_contact">
                                        <img class="email__logo" src="./assets/icons/mail_icon_gray.png" alt="Email Icon">
                                    </label>
                                </div>
                                <div class="phone__box">
                                    <div class="phone__container">
                                        <input class="phone__input" id="phone_input_add_contact" type="text" name ="phone" placeholder="Phone" autocomplete="tel" value="${contact.tel}">
                                        <label for="phone_input_add_contact">
                                            <img class="phone__logo" src="./assets/icons/phone_icon_gray.png" alt="Phone Icon">
                                        </label>
                                    </div>
                                    <div class="errormessage__box" id="errormessage_box">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="edit__contact__buttonbox">
                            <button type="button" onclick="deleteContact(this, event, 'edit_contact')" class="delete__button" data-contact='${JSON.stringify(contact)}'>Delete</button>
                            <button type="submit" class="save__button">
                                Save
                                <img src="./assets/icons/hook_icon_white.png" alt="Hook Icon">
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            `
}

/**
 * Renders the add contact overlay.
 * @returns {string} HTML string for the add contact overlay.
 */
function renderHTMLAddContactOverlay() {
    return  `
            <div class="add__contact__overlay" id="add_contact_container">
                <div class="add__contact__overlay__left">
                    <div class="add__contact__overlay__left__content">
                        <img src="./assets/icons/logo_add_contact_overlay.png" alt="Join Logo">
                        <h1>Add contact</h1>
                        <h2>Tasks are better with a team!</h2>
                        <div class="add__contact__overlay__seperator"></div>
                    </div>
                </div>
                <div class="add__contact__overlay__right">
                    <div class="close__button__box">  
                        <button onclick="closeContactOverlay()" class="close__button">
                            <img class="close__button__img" src="./assets/icons/close_icon_blue.png" alt="Close Icon">
                            <img class="close__button__hover__img" src="./assets/icons/close_icon_blue_hover.png" alt="Close Icon Hover">
                        </button>
                    </div>
                    <form onsubmit="handleFormSubmit(event, 'add')" class="add__contact__form">
                        <div class="add__contact__container">
                            <div class="default__profilebadge">
                                <img src="./assets/icons/person_icon_white.png" alt="Person">
                            </div>
                            <div class="add__contact__inputbox">
                                <div class="person__container">
                                    <input class="person__input" id="person_input_add_contact" type="text" name="name" placeholder="Name">
                                    <label for="person_input_add_contact">
                                        <img class="person__logo" src="./assets/icons/person_icon_gray.png" alt="Person Icon">
                                    </label>
                                </div>
                                <div class="email__container">
                                    <input class="email__input" id="email_input_add_contact" type="text" name ="email" placeholder="Email" autocomplete="email">
                                    <label for="email_input_add_contact">
                                        <img class="email__logo" src="./assets/icons/mail_icon_gray.png" alt="Email Icon">
                                    </label>
                                </div>
                                <div class="phone__box">
                                    <div class="phone__container">
                                        <input class="phone__input" id="phone_input_add_contact" type="text" name ="phone" placeholder="Phone" autocomplete="tel">
                                        <label for="phone_input_add_contact">
                                            <img class="phone__logo" src="./assets/icons/phone_icon_gray.png" alt="Phone Icon">
                                        </label>
                                    </div>
                                    <div class="errormessage__box" id="errormessage_box">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="add__contact__buttonbox">
                            <button onclick="cancelForm(event)" class="cancel__button">
                                Cancel
                                <img class="cancel__button__img" src="./assets/icons/cancel_icon_blue.png" alt="Cancel Icon">
                                <img class="cancel__button__img__hover" src="./assets/icons/cancel_icon_lightblue.png" alt="Cancel Icon">
                            </button>
                            <button type="submit" class="create__contact__button">
                                Create contact
                                <img src="./assets/icons/hook_icon_white.png" alt="Hook Icon">
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            `
}

function renderHTMLContactDetailsMobileMenu(contact) {
    return  `
            <div onclick="closeMenuContactOptions()" id="overlay_add_and_edit_fly_in" class="overlay__add__and__edit__fly__in d__none">
                <div id="add_and_edit_fly_in" class="add__and__edit__fly__in">
                    <button onclick="openEditContact(this)" class="edit__contact__button" data-contact='${JSON.stringify(contact)}'>
                        <img class="edit__icon__default" src="./assets/icons/edit_icon_blue.png" alt="Edit Icon">
                        <img class="edit__icon__hover" src="./assets/icons/edit_icon_lightblue.png" alt="Edit Icon">
                        Edit
                    </button>
                    <button onclick="deleteContact(this)" class="delete__contact__button" data-contact='${JSON.stringify(contact)}'>
                        <img class="delete__icon__default" src="./assets/icons/delete_icon_blue.png" alt="Delete Icon">
                        <img class="delete__icon__hover" src="./assets/icons/delete_icon_lightblue.png" alt="Delete Icon">
                        Delete
                    </button>
                </div>
            </div>
            `
}


// Summary:

function renderHTMLSummary(to_do, done, in_progress, feedback, allTasks, next_urgend, urgend_amount, theName) {
    return  `
            <div class="keymetrics__container">
                <div class="firstrow__keymetrics">
                    <div class="firstrow__behindbox">
                        <div class="keymetrics__box keymetrics__todo">
                            <div class="todo__icon">
                                <img class="white__todoicon" src="./assets/icons/edit_icon_todo_white.png" alt="Edit">
                                <img class="blue__todoicon" src="./assets/icons/edit_icon_todo_blue.png" alt="Edit">
                            </div>
                            <div class="todo__textbox">
                                <span class="keymetrics__number">${to_do}</span>
                                <h3 class="keymetrics__text">To-do</h3>
                            </div>
                        </div>
                    </div>
                    <div class="firstrow__behindbox">
                        <div class="keymetrics__box keymetrics__done">
                            <div class="done__icon">
                                <img class="white__doneicon" src="./assets/icons/hook_icon_done_white.png" alt="Hook">
                                <img class="blue__doneicon" src="./assets/icons/hook_icon_done_blue.png" alt="Hook">
                            </div>
                            <div class="done__textbox">
                                <span class="keymetrics__number">${done}</span>
                                <h3 class="keymetrics__text">Done</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="secondrow__keymetrics">
                    <div class="secondrow__behindbox">
                        <div class="keymetrics__box keymetrics__urgent">
                            <div class="urgent__leftbox">
                                <div class="urgent__icon">
                                    <img src="./assets/icons/arrows_up_urgent_icon_white.png" alt="Arrows Up">
                                </div>
                                <div class="urgent__textbox">
                                    <span class="keymetrics__number">${urgend_amount}</span>
                                    <h3 class="keymetrics__text">Urgent</h3>
                                </div>
                            </div>
                            <div class="urgent__seperator"></div>
                            <div class="urgent__textboxright">
                                <span class="urgent__date">${next_urgend}</span>
                                <span class="keymetrics__text">Upcoming Deadline</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="thirdrow__keymetrics">
                    <div class="thirdrow__behindbox">
                        <div class="keymetrics__box keymetrics__lastrow">
                            <span class="keymetrics__number">${allTasks}</span>
                            <h3 class="keymetrics__textthirdrow">Tasks in Board</h3>
                        </div>
                    </div>
                    <div class="thirdrow__behindbox">
                        <div class="keymetrics__box keymetrics__lastrow">
                            <span class="keymetrics__number">${in_progress}</span>
                            <h3 class="keymetrics__textthirdrow">Tasks in Progress</h3>
                        </div>
                    </div>
                    <div class="thirdrow__behindbox">
                        <div class="keymetrics__box keymetrics__lastrow">
                            <span class="keymetrics__number">${feedback}</span>
                            <h3 class="keymetrics__textthirdrow">Awaiting Feedback</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="greet__box">
                <span class="greeting">Good Morning,</span>
                <span class="greeting__name">${theName}</span>
            </div>
            `
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

function generateSubtaskListelement(task){
    return `<label for="subtask_${task}"></label>
                        <li class="subtask__li__element" onclick="addSubTaskToList(${task})" ondblclick="turnIntoInput(${task})" id="${task}_id">${task}
                        <div><button onclick="turnIntoInput(${task}; return false;"><img src="./assets/icons/edit_sub.png" alt="edit"></button><button onclick="deleteSubtaks(${task}); return false;">
                        <img src="./assets/icons/delete_sub.png" alt="delete"></button></div></li>`;
}

function generateNewSubtaskListElement(task) {
    let safeName = task.replace(/\s+/g, "_");
    return `
        <li class="subtask__li__element" id="new_${safeName}_id">
            <div class="subtask__content">
                <div class="subtask__text" id="subtask_${safeName}_text" ondblclick='turnIntoInput("${task}")'>${task}</div>
            </div>
        </li>
    `;
}

function generateInput(name) {
    let safeName = name.replace(/\s+/g, "_");
    return `
        <div class="subtask__content">
            <div class="subtask__input-container">
                <label class="subtask__label">
                    <input class="subtask__text" onblur="" id="subtask_${safeName}_input" value="${name}">
                    <div class="subtask__buttons">
                        <button type="button" class="subtask__edit__button" onclick='deleteSubtask("${name}"); return false;'>
                            <img src="./assets/icons/delete_sub.png" alt="delete">
                        </button>
                        <div class="subtask__divider"></div> 
                        <button type="button" class="subtask__edit__button" onclick='turnIntoLi("${name}"); return false;'>
                            <img src="./assets/icons/check_sub.png" alt="edit">
                        </button>
                    </div>
                </label>
            </div>
        </div>
    `;
}

function generateLiContent(task){
    let safeName = task.replace(/\s+/g, "_");
    return `<div class="subtask__content">
                <div class="subtask__text" id="subtask_${safeName}_text" ondblclick='turnIntoInput("${task}")'>${task}</div>
            </div>
            `
}
