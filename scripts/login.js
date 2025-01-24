let skipAnimation;

function initLogin() {
    logoAnimation(false);
    fetchUsers();
}

function logoAnimation(skipAnimation) {
    const overlay = document.getElementById('overlay');
    const bigLogoDiv = document.getElementById('biglogo_div');
    if (skipAnimation) {
        skipLogoAnimation(overlay, bigLogoDiv);
    } else {
        startLogoAnimation(overlay, bigLogoDiv);
    }
}

function skipLogoAnimation(overlay, bigLogoDiv) {
    overlay.classList.add("d__none");  
    bigLogoDiv.classList.add("d__none");  
}

function startLogoAnimation(overlay, bigLogoDiv) {
    setTimeout(() => {
        overlay.classList.add("hidden");
    }, 500); 
    setTimeout(() => {
        bigLogoDiv.classList.add("move__to__corner");
    }, 100);
    endLogoAnimation(overlay, bigLogoDiv);
}

function endLogoAnimation(overlay, bigLogoDiv) {
    const smallLogo = document.getElementById('small_logo');
    setTimeout(() => {
        overlay.classList.add("d__none");
        bigLogoDiv.classList.add("d__none");
        smallLogo.classList.add("visible");
    }, 1000);
}

function maskPassword(input) {
    const actualValue = input.value;  
    input.dataset.actualValue = actualValue;  
    input.value = '*'.repeat(actualValue.length); 
}


