/**
 * Reloads the current website by reassigning the location.
 */
function reloadWebsite() {
    location.href = location.href;
}

/**
 * Redirects the user to the login page with an animation.
 */
function openLoginWithAnimation() {
    window.location.href = 'login.html';
}

/**
 * Redirects the user to the registration page.
 */
function openSignUpWebsite() {
    window.location.href = 'register.html';
}

/**
 * Redirects the user to the summary page.
 */
function openSummaryWebsite() {
    window.location.href = 'summary.html';
}

/**
 * Redirects the user to the add task page.
 */
function openAddTaskWebsite() {
    window.location.href = 'add_task.html';
}

/**
 * Redirects the user to the board page.
 */
function openBoardWebsite() {
    window.location.href = 'board.html';
}

/**
 * Redirects the user to the contacts page.
 */
function openContactsWebsite() {
    window.location.href = 'contacts.html';
}

/**
 * Redirects the user to the privacy policy page.
 */
function openPrivacyPolicyWebsite() {
    window.location.href = 'privacy_policy.html';
}

/**
 * Redirects the user to the legal notice page.
 */
function openLegalNoticeWebsite() {
    window.location.href = 'legal_notice.html';
}

/**
 * Redirects the user to the privacy policy page without login requirements.
 */
function openPrivacyPolicyWebsiteNoLogin() {
    window.location.href = 'privacy_policy_nologin.html';
}

/**
 * Redirects the user to the legal notice page without login requirements.
 */
function openLegalNoticeWebsiteNoLogin() {
    window.location.href = 'legal_notice_nologin.html';
}

/**
 * Redirects the user to the help page.
 */
function openHelpWebsite() {
    window.location.href = 'help.html';
}

/**
 * Toggles the visibility of the submenu by adding or removing the 'd__none' class.
 */
function toggleSubMenu() {
    const subMenuRef = document.getElementById('submenu');
    subMenuRef.classList.toggle('d__none');
}

/**
 * Prevents scrolling on the body by fixing its position and storing the scroll position.
 */
function fixateScrollingOnBody() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    let scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    if (scrollY > 0) {
        document.documentElement.style.scrollBehavior = 'unset';
        document.body.style.top = `-${scrollY}px`;
    }
    document.body.style.width = '100%';
}

/**
 * Restores scrolling on the body and resets the stored scroll position.
 */
function releaseScrollOnBody() {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

/**
 * Toggles the "d__none" class on the contact overlay element to show or hide it.
 */
function toggleDnoneFromOverlay() {
    const overlayRef = document.getElementById('contact_overlay');
    if (overlayRef) overlayRef.classList.toggle('d__none');
}

/**
 * Generates the initials of a given name.
 * @param {string} name - The full name of the contact.
 * @returns {string} The initials of the name (e.g., "John Doe" -> "JD").
 */
function getInitials(name) {
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
    const lastNameInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return firstNameInitial + lastNameInitial;
}

/**
 * Masks the password input by hiding the original input field and displaying masked asterisks.
 *
 * @param {string} id1 - The ID of the input element containing the password to be hidden.
 * @param {string} id2 - The ID of the element where the masked password (asterisks) will be displayed.
 */
function maskPassword(id1, id2){
    let hidePasswordInput = document.getElementById(id1);
    let maskPassword = document.getElementById(id2);

    hidePasswordInput.classList.add('zero__opacity');
    maskPassword.classList.remove('zero__opacity');

    maskPassword.innerHTML = '';

    for(let i = 0; i < hidePasswordInput.value.length; i++){
        maskPassword.innerHTML += '*';
    }
}

/**
 * Determines the badge color based on the contact name.
 * @param {string} name - The contact's name.
 * @returns {string} - The badge color class.
 */
function getBadgeColor(name) {
    const totalColors = 15;
    const index = (name.charCodeAt(0) + name.charCodeAt(name.length - 1)) % totalColors;
    return `bgcolor__${index + 1}`;
}