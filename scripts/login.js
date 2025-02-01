let skipAnimation;

/**
 * Initializes the login animation and user fetching process.
 * Decides whether to skip the logo animation based on the `skipAnimation` variable.
 */
function initLogin() {
    logoAnimation(false); // Start the logo animation (set to false to show animation).
    fetchUsers(); // Fetch the user data (implementation not shown here).
}

/**
 * Controls the logo animation flow based on whether it should be skipped or not.
 * @param {boolean} skipAnimation - Indicates whether to skip the animation.
 */
function logoAnimation(skipAnimation) {
    const overlay = document.getElementById('overlay'); // Overlay element that covers the page during animation.
    const bigLogoDiv = document.getElementById('biglogo_div'); // Div containing the large logo.

    if (skipAnimation) {
        skipLogoAnimation(overlay, bigLogoDiv); // Skip the animation and immediately hide elements.
    } else {
        startLogoAnimation(overlay, bigLogoDiv); // Start the animation sequence.
    }
}

/**
 * Skips the logo animation by immediately hiding the overlay and the big logo.
 * @param {HTMLElement} overlay - The overlay element.
 * @param {HTMLElement} bigLogoDiv - The large logo container element.
 */
function skipLogoAnimation(overlay, bigLogoDiv) {
    overlay.classList.add("d__none"); // Hides the overlay immediately.
    bigLogoDiv.classList.add("d__none"); // Hides the big logo immediately.
}

/**
 * Starts the logo animation by transitioning the elements over time.
 * @param {HTMLElement} overlay - The overlay element.
 * @param {HTMLElement} bigLogoDiv - The large logo container element.
 */
function startLogoAnimation(overlay, bigLogoDiv) {
    setTimeout(() => {
        overlay.classList.add("hidden"); // Fades out the overlay after 500ms.
    }, 500); 

    setTimeout(() => {
        bigLogoDiv.classList.add("move__to__corner"); // Moves the big logo to the corner after 100ms.
    }, 100);

    endLogoAnimation(overlay, bigLogoDiv); // Completes the animation sequence.
}

/**
 * Completes the logo animation by hiding the overlay and big logo, and showing the small logo.
 * @param {HTMLElement} overlay - The overlay element.
 * @param {HTMLElement} bigLogoDiv - The large logo container element.
 */
function endLogoAnimation(overlay, bigLogoDiv) {
    const smallLogo = document.getElementById('small_logo'); // The small logo element that appears at the end.

    setTimeout(() => {
        overlay.classList.add("d__none"); // Hides the overlay completely after 1000ms.
        bigLogoDiv.classList.add("d__none"); // Hides the big logo completely after 1000ms.
        smallLogo.classList.add("visible"); // Makes the small logo visible after 1000ms.
    }, 1000);
}

/* --> noch ein Problem:
function maskPassword(input) {
    const actualValue = input.value;  
    input.dataset.actualValue = actualValue;  
    input.value = '*'.repeat(actualValue.length); 
}*/

/**
 * Handles the login process by preventing the default form submission,
 * retrieving the email and password from the input fields, and checking
 * if the provided credentials match any user in the `users` array.
 * 
 * If the email is found in the `users` array, the function checks the
 * password using the `testpPasswordLogin` function. If the email is not
 * found, an error message is displayed and error borders are applied to
 * the input fields.
 * 
 * @param {Event} event - The event object from the form submission.
 * @returns {void}
 */
function login(event){
    event.preventDefault();
    let email = document.getElementById('email_input_login').value;
    let inputPw = document.getElementById('password_input_login').value;
    let userIndex = users.findIndex(user => user.email == email);

    if(userIndex !==-1){
        testpPasswordLogin(inputPw, userIndex);        
    }else{
        document.getElementById('wrong_email_password').classList.remove('d__none');
        errorBorders();
    }
}

/**
 * Compares the provided password with the stored password for the user at the given index.
 * If the passwords match, the user is redirected to the summary page.
 * If the passwords do not match, an error message is displayed, error styling is applied,
 * and the password input field is cleared.
 * 
 * @param {string} inputPw - The password input provided by the user.
 * @param {number} userIndex - The index of the user in the `users` array.
 */
function testpPasswordLogin(inputPw, userIndex){
    let storedPW = users[userIndex].pw;
    if(inputPw === storedPW){
        currentUser = users[userIndex];
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'summary.html';
    }else{
        document.getElementById('wrong_email_password').classList.remove('d__none');
        document.getElementById('password_container').classList.add('error__inputs');
        document.getElementById('password_input_login').value = '';
    }
}

function buildCurrentUser(){

}

/**
 * Adds error styling to the email and password input containers
 * by adding the 'error__inputs' class to their respective elements.
 * 
 */
function errorBorders(){
    document.getElementById('email_container').classList.add('error__inputs');
    document.getElementById('password_container').classList.add('error__inputs')    
}

/**
 * Handles the guest login process by preventing the default form submission,
 * using predefined guest credentials (email: 'guest', password: 'guest123'),
 * and checking if the guest user exists in the `users` array.
 * 
 * If the guest user is found, the function checks the password using the `testpPasswordLogin` function.
 * If the guest user is not found, an alert with the message 'Database error' is displayed.
 * 
 * @param {Event} event - The event object from the form submission.
 */
function guestLogIN(event){
    event.preventDefault();
    let email = 'guest';
    let inputPw = 'guest123';
    console.log(email);
    console.log(inputPw);
    
    let userIndex = users.findIndex(user => user.email == email);

    if(userIndex !==-1){
        testpPasswordLogin(inputPw, userIndex);        
    }else{
        alert('Database error')
    }
}
