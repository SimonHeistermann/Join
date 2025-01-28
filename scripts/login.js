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


function login(event){
    event.preventDefault();
    let email = document.getElementById('email_input_login').value;
    let inputPw = document.getElementById('password_input_login').value;
    console.log(email);
    console.log(inputPw);
    
    let userIndex = users.findIndex(user => user.email == email);

    if(userIndex !==-1){
        testpPasswordLogin(inputPw, userIndex);
        console.log(userIndex);
        
    }else{
        document.getElementById('wrong_email_password').classList.remove('d__none');
    }
}

function testpPasswordLogin(inputPw, userIndex){
    let storedPW = users[userIndex].pw;
    if(inputPw === storedPW){
        console.log(inputPw);
        console.log(storedPW);
        
        
        window.location.href = 'summary.html';
    }else{
        document.getElementById('wrong_email_password').classList.remove('d__none');
    }
}