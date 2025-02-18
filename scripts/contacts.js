/**
 * Stores the ID of the currently selected contact.
 */
let currentContactID;

/**
 * Initializes the contact list by fetching and rendering contacts.
 */
async function initContacts() {
    try {
        await fetchContacts();
        renderContacts();
    } catch (error) {
        console.error("Error initializing app:", error);
    }
    fillTheTag();
}

/**
 * Renders the contact list in the UI.
 */
function renderContacts() {
    const contactTable = document.getElementById("contacts_table");
    const validContacts = contacts.filter(contact => contact !== null);
    contactTable.innerHTML = "";
    contactTable.innerHTML += renderHTMLAddContactButton();
    contactTable.innerHTML += generateContactSections(validContacts);
}

/**
 * Generates the HTML for grouped contact sections.
 * @param {Array} validContacts - The list of valid contacts.
 * @returns {string} - The generated HTML.
 */
function generateContactSections(validContacts) {
    const groupedContacts = groupContactsByLetter(validContacts);
    return Object.keys(groupedContacts)
        .sort()
        .map(letter => generateHTMLContactSection(letter, groupedContacts[letter]))
        .join("");
}

/**
 * Groups contacts by their first letter and sorts them by last name.
 * @param {Array} contacts - The list of contacts.
 * @returns {Object} - An object where keys are letters and values are sorted arrays of contacts.
 */
function groupContactsByLetter(contacts) {
    return contacts.reduce((acc, contact) => {
        const firstLetter = contact.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(contact);
        acc[firstLetter].sort((a, b) => {
            const lastNameA = getLastName(a.name);
            const lastNameB = getLastName(b.name);
            return lastNameA.localeCompare(lastNameB);
        });
        return acc;
    }, {});
}

/**
 * Extracts the last name from a full name.
 * @param {string} name - The full name.
 * @returns {string} - The extracted last name.
 */
function getLastName(name) {
    const nameParts = name.split(" ");
    return nameParts.length > 1 ? nameParts[nameParts.length - 1] : name;
}

/**
 * Formats the contact name for display.
 * @param {string} name - The contact's full name.
 * @returns {string} - The formatted name.
 */
function formatContactName(name) {
    if (name.length > 14) {
        const nameParts = name.split(" ");
        return nameParts.length > 1 ? nameParts.slice(-1).join(" ") : name;
    }
    return name;
}

/**
 * Opens the contact details view.
 * @param {HTMLElement} contactElement - The contact element clicked.
 */
function openContactDetails(contactElement) {
    removeAllContactBoxActiveStyling();
    if(isMobile()) addActiveOverviewStylingMobile();
    contactElement.classList.add('contacts__active');
    const contactData = JSON.parse(contactElement.getAttribute('data-contact'));
    const contactDetailsRef = document.getElementById('contact_overview');
    renderContactDetails(contactData, contactDetailsRef);
    addActiveOverviewStyling(contactDetailsRef);
}

/**
 * Removes active styling from all contact elements.
 */
function removeAllContactBoxActiveStyling() {
    const contactRefs = document.querySelectorAll('.contact');
    contactRefs.forEach(contact => {
        contact.classList.remove('contacts__active');
    });
}

/**
 * Renders the contact details in the contact overview section.
 * @param {Object} contactData - The contact data object.
 * @param {HTMLElement} contactDetailsRef - The container for contact details.
 */
function renderContactDetails(contactData, contactDetailsRef) {
    contactDetailsRef.innerHTML = "";
    contactDetailsRef.innerHTML += renderHTMLContactDetails(contactData);
    if(isMobile()) {
        const bodyRef = document.getElementById('body');
        bodyRef.innerHTML += renderHTMLContactDetailsMobileMenu(contactData);
    }
}

/**
 * Adds active styling to a given content container.
 * @param {HTMLElement} contentRef - The container element.
 */
function addActiveOverviewStyling(contentRef) {
    contentRef.classList.add('contact__overview__content__active');
}

function addActiveOverviewStylingMobile() {
    const contactTableRef = document.getElementById('contacts_table');
    contactTableRef.classList.add('d__none');
    const contactOverviewHeaderRef = document.getElementById('contact_overview_header');
    contactOverviewHeaderRef.classList.add('d__flex');
    const backToContactsTableButtonRef = document.getElementById('back_to_contacts_table_button');
    backToContactsTableButtonRef.classList.add('d__flex');
    const addNewContactButtonMobileRef = document.getElementById('add_new_contact_button_mobile');
    addNewContactButtonMobileRef.classList.add('d__none');
    const openMenuContactOptionsButtonRef = document.getElementById('open_menu_contact_options_button');
    openMenuContactOptionsButtonRef.classList.remove('d__none');
    const contactDetailsRef = document.getElementById('contact_overview');
    contactDetailsRef.classList.add('contact__overview__content__active');
}

/**
 * Removes active styling from a given content container.
 * @param {HTMLElement} contentRef - The container element.
 */
function removeActiveOverviewStyling(contentRef) {
    contentRef.classList.remove('contact__overview__content__active');
}

function removeActiveOverviewStylingMobile() {
    const contactTableRef = document.getElementById('contacts_table');
    contactTableRef.classList.remove('d__none');
    const contactOverviewHeaderRef = document.getElementById('contact_overview_header');
    contactOverviewHeaderRef.classList.remove('d__flex');
    const backToContactsTableButtonRef = document.getElementById('back_to_contacts_table_button');
    backToContactsTableButtonRef.classList.remove('d__flex');
    const addNewContactButtonMobileRef = document.getElementById('add_new_contact_button_mobile');
    addNewContactButtonMobileRef.classList.remove('d__none');
    const openMenuContactOptionsButtonRef = document.getElementById('open_menu_contact_options_button');
    openMenuContactOptionsButtonRef.classList.add('d__none');
    const contactDetailsRef = document.getElementById('contact_overview');
    contactDetailsRef.classList.remove('contact__overview__content__active');
}

/**
 * Opens the edit contact form with the selected contact's data.
 * @param {HTMLElement} contactElement - The contact element clicked.
 */
function openEditContact(contactElement) {
    const contactData = JSON.parse(contactElement.getAttribute('data-contact'));
    const contentRef = document.getElementById('contact_overlay_content');
    toggleDnoneFromOverlay();
    renderContactOverlayContent("edit", contentRef, contactData);
    const containerRef = document.getElementById('add_contact_container');
    addActiveOverviewStyling(containerRef);
    fixateScrollingOnBody();
    currentContactID = contactData.id;
}

/**
 * Renders the contact overlay content based on the given type.
 * @param {string} type - The type of overlay ("edit" or "add").
 * @param {HTMLElement} contentRef - The reference to the overlay content container.
 * @param {Object} [contactData] - The contact data (only required for editing).
 */
function renderContactOverlayContent(type, contentRef, contactData) {
    contentRef.innerHTML = "";
    if (type === "edit") contentRef.innerHTML += renderHTMLEditContactOverlay(contactData);
    else if (type === "add") contentRef.innerHTML += renderHTMLAddContactOverlay();
}

/**
 * Closes the contact overlay and resets styles.
 */
function closeContactOverlay() {
    toggleDnoneFromOverlay();
    const containerRef = document.getElementById('add_contact_container');
    removeActiveOverviewStyling(containerRef);
    releaseScrollOnBody();
}

/**
 * Opens the "Add New Contact" overlay.
 */
function openAddNewContact() {
    const contentRef = document.getElementById('contact_overlay_content');
    toggleDnoneFromOverlay();
    const buttonRef = document.getElementById('add_contact_button');
    buttonRef.classList.add('add__contact__button__active');
    renderContactOverlayContent("add", contentRef);
    const containerRef = document.getElementById('add_contact_container');
    addActiveOverviewStyling(containerRef);
}

/**
 * Handles form submission for adding or editing a contact.
 * @param {Event} event - The form submission event.
 * @param {string} type - The type of form ("add" or "edit").
 */
async function handleFormSubmit(event, type) {
    event.preventDefault();
    const error = validateInputs();
    updateErrorBox(error);
    if (!error) await processForm(type);
}

/**
 * Cancels the form and closes the contact overlay.
 * @param {Event} event - The event object.
 */
function cancelForm(event) {
    event.preventDefault();
    closeContactOverlay();
}

/**
 * Validates all input fields and returns the first encountered error.
 * @returns {string|null} Error message if validation fails, otherwise null.
 */
function validateInputs() {
    return (
        validateField("person_input_add_contact", "Name is required.", "person__container") ||
        validateEmail("email_input_add_contact", "email__container") ||
        validatePhone("phone_input_add_contact", "phone__container")
    );
}

/**
 * Validates a text field and applies error styling if necessary.
 * @param {string} id - The ID of the input field.
 * @param {string} message - The error message to display.
 * @param {string} containerClass - The CSS class of the input container.
 * @returns {string|null} Error message if validation fails, otherwise null.
 */
function validateField(id, message, containerClass) {
    const field = document.getElementById(id);
    const container = document.querySelector(`.${containerClass}`);
    if (field.value.trim() === "") {
        removeAllErorrInputStyling();
        container.classList.add('error__inputs');
        return message;
    } else {
        removeAllErorrInputStyling();
        return null;
    }
}

/**
 * Validates an email input field.
 * @param {string} id - The ID of the email input field.
 * @param {string} containerClass - The CSS class of the input container.
 * @returns {string|null} Error message if validation fails, otherwise null.
 */
function validateEmail(id, containerClass) {
    const email = document.getElementById(id).value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const container = document.querySelector(`.${containerClass}`);
    if (!emailRegex.test(email)) {
        removeAllErorrInputStyling();
        container.classList.add('error__inputs');
        return "Check your email. Please try again.";
    } else {
        removeAllErorrInputStyling();
        return null;
    }
}

/**
 * Validates a phone number input field.
 * @param {string} id - The ID of the phone input field.
 * @param {string} containerClass - The CSS class of the input container.
 * @returns {string|null} Error message if validation fails, otherwise null.
 */
function validatePhone(id, containerClass) {
    const phone = document.getElementById(id).value.trim().replace(/\s+/g, '');
    const phoneRegex = /^(?:\+?[0-9]{1,3})?[1-9][0-9]{4,14}$/;
    const container = document.querySelector(`.${containerClass}`);
    if (!phoneRegex.test(phone)) {
        removeAllErorrInputStyling();
        container.classList.add('error__inputs');
        return "Check your Phonenumber. Please try again.";
    } else {
        removeAllErorrInputStyling();
        return null;
    }
}

/**
 * Removes error styling from all input containers.
 */
function removeAllErorrInputStyling() {
    const inputContainers = ["person__container", "email__container", "phone__container"];
    for (let i = 0; i < inputContainers.length; i++) {
        if (inputContainers[i]) {
            const inputContainerRef = document.querySelector(`.${inputContainers[i]}`);
            inputContainerRef.classList.remove('error__inputs');
        }
    }
}

/**
 * Updates the error message box with the given error message.
 * @param {string|null} error - The error message to display, or null to hide the box.
 */
function updateErrorBox(error) {
    const box = document.getElementById("errormessage_box");
    box.innerText = error || "";
    box.style.display = error ? "block" : "none";
}

/**
 * Processes the form submission for adding or editing a contact.
 * @param {string} type - The type of form action ("add" or "edit").
 */
async function processForm(type) {
    let newContact = null;
    let updatedContact = null;
    if(type === 'add') newContact = await addNewContact();
    else if(type === 'edit') updatedContact = await editContact();
    document.querySelector(".add__contact__form").reset();
    closeContactOverlay();
    await initContacts();
    if (newContact) {
        openNewlyAddedContact(newContact);
        displayContactSuccNotification("created");
    }
    if(updatedContact) {
        openUpdatedContact(updatedContact);
        displayContactSuccNotification("edited");
    } 
}

/**
 * Creates and adds a new contact to the contacts list.
 * @returns {Promise<Object>} The newly created contact object.
 */
async function addNewContact() {
    const newContact = {
        name: document.getElementById("person_input_add_contact").value,
        email: document.getElementById("email_input_add_contact").value,
        tel: document.getElementById("phone_input_add_contact").value,
        initials: getInitials(document.getElementById("person_input_add_contact").value),
        id: getNextAvailableId()
    };
    contacts.push(newContact);
    await putData("contacts", contacts);
    return newContact;
}
/**
 * Edits an existing contact in the contacts list.
 * @returns {Promise<Object>} The updated contact object.
 */
async function editContact() {
    const contactId = currentContactID;
    const updatedContact = {
        name: document.getElementById("person_input_add_contact").value,
        email: document.getElementById("email_input_add_contact").value,
        tel: document.getElementById("phone_input_add_contact").value,
        initials: getInitials(document.getElementById("person_input_add_contact").value),
        id: contactId
    };
    contacts = contacts.map(contact => 
        contact.id === contactId ? updatedContact : contact
    );
    await putData(`contacts/${contactId}`, updatedContact);
    return updatedContact;
}

/**
 * Opens the details of a newly added contact.
 * @param {Object} newContact - The newly added contact object.
 */
function openNewlyAddedContact(newContact) {
    setTimeout(() => {
        const contactElements = document.querySelectorAll(".contact");
        contactElements.forEach(contactElement => {
            const contactData = JSON.parse(contactElement.getAttribute("data-contact"));
            if (contactData.email === newContact.email) {
                openContactDetails(contactElement);
            }
        });
    }, 300);
}

/**
 * Displays a success notification after creating or editing a contact.
 * @param {string} type - The action type ("created" or "edited").
 */
function displayContactSuccNotification(type) {
    const notificationRef = document.getElementById(`contact_notification`);
    notificationRef.innerHTML = `<h3>Contact successfully ${type}</h3>`;
    notificationRef.classList.remove('contact__created__notification__active');
    notificationRef.classList.remove('d__none');
    setTimeout(() => {
        notificationRef.classList.add('contact__created__notification__active');
    }, 400);
    setTimeout(() => {
        notificationRef.classList.add('d__none');
        notificationRef.classList.remove('contact__created__notification__active');
    }, 2400);
}

/**
 * Opens the details of an updated contact.
 * @param {Object} updatedContact - The updated contact object.
 */
function openUpdatedContact(updatedContact) {
    setTimeout(() => {
        const contactElements = document.querySelectorAll(".contact");
        contactElements.forEach(contactElement => {
            const contactData = JSON.parse(contactElement.getAttribute("data-contact"));
            if (contactData.id === updatedContact.id) {
                openContactDetails(contactElement);
            }
        });
    }, 300);
}

/**
 * Deletes a contact from the contacts list.
 * @param {HTMLElement} contactElement - The contact element in the UI.
 * @param {Event} event - The event object to prevent default behavior.
 * @param {string} from - The source of deletion ("edit_contact" or other).
 */
async function deleteContact(contactElement, event, from) {
    if (event) event.preventDefault();
    const contactData = JSON.parse(contactElement.getAttribute('data-contact'));
    const contactId = contactData.id;
    try {
        await deleteData(`contacts/${contactId}`);
        contacts = contacts.filter(contact => contact.id !== contactId);
        if(from === "edit_contact") closeContactOverlay();
        await initContacts();
        const contactDetailsRef = document.getElementById('contact_overview');
        contactDetailsRef.innerHTML = "";
    } catch (error) {
        console.error("Error while deleting contact:", error);
    }
}

/**
 * Kehrt zur Kontaktübersicht zurück, indem aktive Stile für Kontaktboxen 
 * und die mobile Ansicht entfernt werden.
 */
function backToContactTable() {
    removeAllContactBoxActiveStyling();
    removeActiveOverviewStylingMobile();
}

/**
 * Öffnet oder schließt das Menü für Kontaktoptionen, indem die entsprechenden 
 * Klassen für das Fly-in-Menü und das Overlay umgeschaltet werden.
 */
function openMenuContactOptions() {
    const addAndEditFlyInRef = document.getElementById('add_and_edit_fly_in');
    addAndEditFlyInRef.classList.toggle('add__and__edit__fly__in__active');
    const overlayAddAndEditFlyInRef = document.getElementById('overlay_add_and_edit_fly_in');
    overlayAddAndEditFlyInRef.classList.toggle('d__none');
}

/**
 * Schließt das Menü für Kontaktoptionen, indem die entsprechenden 
 * Klassen für das Fly-in-Menü und das Overlay umgeschaltet werden.
 */
function closeMenuContactOptions() {
    const addAndEditFlyInRef = document.getElementById('add_and_edit_fly_in');
    addAndEditFlyInRef.classList.toggle('add__and__edit__fly__in__active');
    const overlayAddAndEditFlyInRef = document.getElementById('overlay_add_and_edit_fly_in');
    overlayAddAndEditFlyInRef.classList.toggle('d__none');
}