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