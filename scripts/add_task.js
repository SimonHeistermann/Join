let choosenContacts = [];
let exsistingSubtasks = [];

/**
 * Initializes the task-related functionalities, including fetching contacts.
 */
async function initAddTasks() {
  try {
    await fetchContacts();
    renderContactList(contacts);
    gatherSubtasks();
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

/**
 * Renders the contact list in the dropdown.
 * @param {Array} currentContacts - The list of contacts to display.
 */
function renderContactList(currentContacts) {
  const sortedContacts = sortContactsByName(currentContacts);
  const contactHTML = generateContactHTML(sortedContacts);
  const dropDownRef = document.getElementById("dropdown_list");
  dropDownRef.innerHTML = "";
  dropDownRef.innerHTML = contactHTML;
}

/**
 * Sorts the contacts by their name alphabetically.
 * @param {Array} currentContacts - The list of contacts to sort.
 * @returns {Array} The sorted list of contacts.
 */
function sortContactsByName(currentContacts) {
  return currentContacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Generates the HTML structure for displaying the contacts.
 * @param {Array} currentContacts - The list of contacts to display.
 * @returns {string} The HTML string for the contact list.
 */
function generateContactHTML(currentContacts) {
  return currentContacts
    .map((contact) => generateContactTemplate(contact))
    .join("");
}

/**
 * Opens the dropdown list when the dropdown button is clicked.
 * @param {Event} event - The click event.
 */
function openDropdownList(event) {
  event.preventDefault();
  toggleDropdown("dropdown");
  toggleDNoneInputAndButtonDropDown("dropdown", "dropdown_search");
}

/**
 * Toggles the visibility of the dropdown list.
 */
function toggleDropdown(type) {
  const dropdownListWrapperRef = document.getElementById(
    type + "_list_wrapper"
  );
  dropdownListWrapperRef.classList.toggle("open");
}

/**
 * Toggles the visibility of the search input and the dropdown button.
 */
function toggleDNoneInputAndButtonDropDown(button, input) {
  const dropDownButtonRef = document.getElementById(button + "_toggle");
  const dropDownSearchRef = document.getElementById(input + "_container");
  dropDownButtonRef.classList.toggle("d__none");
  dropDownSearchRef.classList.toggle("d__none");
  dropDownSearchRef.classList.toggle("dropdown__blue__border");
}

/**
 * Closes the dropdown list and renders the selected contacts list.
 * @param {Event} event - The click event.
 */
function closeDropDownList(event) {
  event.preventDefault();
  toggleDropdown("dropdown");
  toggleDNoneInputAndButtonDropDown("dropdown", "dropdown_search");
  renderChoosenContactList();
}

/**
 * Handles the selection of a contact.
 * @param {string} contactID - The ID of the selected contact.
 */
function contactChoosen(contactID) {
  const contact = contacts.find((contact) => contact.id == contactID);
  toggleChoosenContactStyling(contactID);
  if (contact) toggleChoosenContactToArray(contact);
}

/**
 * Toggles the styling of the selected contact in the dropdown list.
 * @param {string} contactID - The ID of the selected contact.
 */
function toggleChoosenContactStyling(contactID) {
  const contactRef = document.getElementById("contact_" + contactID);
  contactRef.classList.toggle("dropdown__item__checked");
  const checkBoxBlueRef = document.getElementById("checkbox_blue_" + contactID);
  checkBoxBlueRef.classList.toggle("d__none");
  const checkBoxWhiteRef = document.getElementById(
    "checkbox_white_" + contactID
  );
  checkBoxWhiteRef.classList.toggle("d__none");
}

/**
 * Adds or removes a contact from the chosen contacts array.
 * @param {Object} contact - The contact to add or remove.
 */
function toggleChoosenContactToArray(contact) {
  const isContactAlreadySelected = choosenContacts.some(
    (c) => c.id === contact.id
  );
  if (isContactAlreadySelected) {
    removeContactFromArray(contact);
  } else {
    addContactToArray(contact);
  }
  updateCheckboxState(contact);
}

/**
 * Adds a contact to the chosen contacts array.
 * @param {Object} contact - The contact to add.
 */
function addContactToArray(contact) {
  choosenContacts.push(contact);
}

/**
 * Removes a contact from the chosen contacts array.
 * @param {Object} contact - The contact to remove.
 */
function removeContactFromArray(contact) {
  const index = choosenContacts.indexOf(contact);
  if (index > -1) {
    choosenContacts.splice(index, 1);
  }
}

/**
 * Updates the checkbox state to reflect the selection of a contact.
 * @param {Object} contact - The contact to update the checkbox state for.
 */
function updateCheckboxState(contact) {
  const contactCheckBoxRef = document.getElementById(
    "contact_checkbox_" + contact.id
  );
  if (choosenContacts.some((c) => c.id === contact.id)) {
    contactCheckBoxRef.checked = true;
  } else {
    contactCheckBoxRef.checked = false;
  }
}

/**
 * Renders the list of chosen contacts.
 */
function renderChoosenContactList() {
  const contentRef = document.getElementById("choosen_contacts_container");
  contentRef.innerHTML = "";
  for (let i = 0; i < choosenContacts.length; i++) {
    contentRef.innerHTML += renderHTMLChoosenContact(choosenContacts[i]);
  }
}

/**
 * Filters the contacts based on the search input and updates the contact list accordingly.
 */
function filterContacts() {
  const searchInput = document
    .getElementById("assignee_search_input")
    .value.toLowerCase();
  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(searchInput);
  });
  renderContactList(filteredContacts);
  if (searchInput === "") {
    renderContactList(contacts);
  }
}

async function saveTask() {
  const name = document.getElementById("text__title").value;
  const description = document.getElementById("description").value;
  const assignedTo = document.getElementById("assigned__to").value;
  const dueDate = document.getElementById("date__input").value;
  const prio = document.querySelector('input[name="prio"]:checked')?.value;
  const category = document.querySelector('select[name="category"]').value;
  const subtask = document.getElementById("subtask").value;

  if (!name || !description || !assignedTo || !dueDate || !prio || !category) {
    document.getElementById("date__input").innerHTML =
      "Bitte alle Felder ausfüllen!";
    document.getElementById("star_textArea").innerHTML =
      "Bitte alle Felder ausfüllen!";
    document.getElementById("star_title").innerHTML =
      "Bitte alle Felder ausfüllen!";
    return;
  }

  const taskData = {
    name: name,
    description: description,
    assignedTo: assignedTo,
    dueDate: dueDate,
    prio: prio,
    category: category,
    subtask: subtask,
    position: 1,
  };

  try {
    let response = await fetch(baseUrl + "tasks.json", {
      method: "POST", // Neues Task-Objekt in Firebase hinzufügen
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      console.log("Task gespeichert!");
      fetchData(); // Liste neu laden
      clearForm();
    } else {
      console.error("Fehler beim Speichern!");
    }
  } catch (error) {
    console.error("Fehler:", error);
  }
}

function clearForm() {
  document.getElementById("text__input").value = "";
  document.getElementById("description").value = "";
  document.getElementById("assigned__to").value = "";
  document.getElementById("date__input").value = "";
  document.querySelector('input[name="prio"]:checked').checked = false;
  document.querySelector('select[name="category"]').value = "";
  document.getElementById("subtask").value = "";
}

function gatherSubtasks() {
  let storedTaskArray = localStorage.getItem("tasks");
  tasks = JSON.parse(storedTaskArray);
  let filteredSubtasks = tasks.filter(
    (task) => task.subtasks && task.subtasks.length > 0
  );
  let allSubtasks = filteredSubtasks.map((task) => task.subtasks).flat();
  justSubtasksName(allSubtasks);
}

function justSubtasksName(allSubtasks) {
  let justTheNames = allSubtasks.map((task) => task.name);
  fillThelist(justTheNames);
}

function fillThelist(allSubtasks) {
  list = document.getElementById("exsisting_subtasks_list");
  allSubtasks.forEach((task) => {
    list.innerHTML += `<label for="subtask_${task}"></label>
                        <li ondblclick="turnIntoInput(${task}" id="${task}_id")">${task}</li>`;
  });
}

function changePngs() {
  document.getElementById("sub_btn1_img").src = "./assets/icons/close_sub.png";
  document.getElementById("sub_btn2").classList.remove("d__none");
}
