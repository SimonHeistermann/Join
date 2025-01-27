/**
 * Lädt das Array der gespeicherten Benutzer aus dem `localStorage` und gibt es in der Konsole aus.
 * 
 * Diese Funktion holt sich die Benutzerdaten aus dem `localStorage`, die unter dem Schlüssel `users` gespeichert sind. 
 * Die Daten werden als JSON-String abgerufen und dann mit `JSON.parse` in ein JavaScript-Array umgewandelt. 
 * Falls keine Benutzerdaten im `localStorage` gefunden werden, wird `storedUserArray` den Wert `null` haben. 
 * Das geparste Array der Benutzer wird anschließend in der Konsole ausgegeben.
 * 
 * @param {string} storedUserArray - Der JSON-String, der die Benutzerinformationen aus dem `localStorage` enthält.
 * @param {Array|null} users - Das JavaScript-Array, das die geparsten Benutzerdaten enthält. Falls keine Daten vorhanden sind, ist es `null`.
 */
function handleUsers(){
    let storedUserArray = localStorage.getItem("users");
    users = JSON.parse(storedUserArray)
    console.log(users); 
}

/**
 * Überprüft, ob alle erforderlichen Eingabefelder (Name, Email, Passwort) korrekt ausgefüllt sind.
 * Wenn alle Felder gültig sind, wird die Funktion `doTheyMatch` aufgerufen. Andernfalls wird die Ausführung gestoppt.
 * 
 */
function isEverythingFilledUp(){
    if (testname() == 0 && testemail() == 0 && testpassword() == 0){
        doTheyMatch();
    }
    else{
        return;
    }
}

/**
 * Überprüft, ob das Namens-Eingabefeld auf der Seite leer ist.
 * Wenn das Feld leer ist, wird der Rahmen des Containers rot gefärbt und eine Fehlermeldung angezeigt.
 * Gibt `1` zurück, wenn das Feld leer ist, und `0`, wenn es ausgefüllt ist.
 * 
 * @returns {number} 1, wenn das Namensfeld leer ist, ansonsten 0.
 */
function testname(){
    let nameInput = document.getElementById('person_input_register').value.trim();
    if(nameInput.length == 0){
        let border = document.querySelector('.person__container');
        border.style.borderColor = '#fb3c53';
        document.getElementById('errormessage_box').classList.remove('d__none');
        return 1;
    }
    else{
        return 0;
    }
}

/**
 * Überprüft, ob das Email-Eingabefeld auf der Seite leer ist.
 * Wenn das Feld leer ist, wird der Rahmen des Containers rot gefärbt und eine Fehlermeldung angezeigt.
 * Gibt `1` zurück, wenn das Feld leer ist, und `0`, wenn es ausgefüllt ist.
 * 
 * @returns {number} 1, wenn das Email-Feld leer ist, ansonsten 0.
 */
function testemail(){
    let nameInput = document.getElementById('email_input_register').value.trim();
    if(nameInput.length == 0){
        let border = document.querySelector('.email__container');
        border.style.borderColor = '#fb3c53';
        document.getElementById('errormessage_box').classList.remove('d__none');
        return 1;
    }
    else{
        return 0;
    }
}

/**
 * Überprüft, ob das Passwort-Eingabefeld auf der Seite leer ist.
 * Wenn das Feld leer ist, wird der Rahmen des Containers rot gefärbt und eine Fehlermeldung angezeigt.
 * Gibt `1` zurück, wenn das Feld leer ist, und `0`, wenn es ausgefüllt ist.
 * 
 * @returns {number} 1, wenn das Passwort-Feld leer ist, ansonsten 0.
 */
function testpassword(){
    let nameInput = document.getElementById('password_input_register').value.trim();
    if(nameInput.length == 0){
        let border = document.querySelector('.password__container');
        border.style.borderColor = '#fb3c53';
        document.getElementById('errormessage_box').classList.remove('d__none');
        return 1;
    }
    else{
        return 0;
    }
}

/**
 * Überprüft, ob die eingegebenen Passwörter übereinstimmen.
 * 
 * Diese Funktion vergleicht die Werte der Passworteingabefelder. Wenn die Passwörter übereinstimmen,
 * wird die Funktion `submitUser()` aufgerufen, um den Benutzer zu registrieren. Falls die Passwörter
 * nicht übereinstimmen, werden beide Felder geleert, und eine Fehlermeldung wird dem Benutzer angezeigt.
 * 
 * @param {HTMLInputElement} password - Das Eingabefeld für das Passwort des Benutzers.
 * @param {HTMLInputElement} confirmation - Das Eingabefeld für die Passwortbestätigung des Benutzers.
 */
function doTheyMatch(){
    let password = document.getElementById('password_input_register');
    let confirmation = document.getElementById('confirm_password_input_register');
    if(password.value == confirmation.value){
        submitUser();
    }
    else{
        password.value = '';
        confirmation.value = '';
        let border = document.querySelector('.password__container');
        border.style.borderColor = '#fb3c53';
        let borderC = document.querySelector('.confirmation__container');
        borderC.style.borderColor = '#fb3c53';
        document.getElementById('noMatchmessage_box').classList.remove('d__none');
        return 1;
    }
}

/**
 * Überprüft, ob das angegebene Kontrollkästchen (checkbox) für die Zustimmung zur Datenschutzrichtlinie aktiviert wurde.
 * Wenn das Kontrollkästchen aktiviert ist, wird die Funktion `checkPassword()` aufgerufen.
 * Andernfalls wird eine Nachricht in der Konsole ausgegeben, dass das Kontrollkästchen nicht angekreuzt wurde.
 *
 * @param {HTMLInputElement} checkbox - Das Kontrollkästchen-Element, das den Status der Zustimmung zur Datenschutzrichtlinie darstellt.
 */
function submitUser(){
    let checkbox = document.getElementById('agree_privacy_policy');
    if(checkbox.checked == true){
        registerUser();
        console.log("checked");        
    }
    else{
        console.log("not checked");
        
    }
}


/**
 * Registriert einen neuen Benutzer, indem die Formulardaten gesammelt und ein Benutzerobjekt mit einer eindeutigen ID erstellt wird.
 * Der Benutzer wird anschließend in das `users`-Array eingefügt.
 *
 * @param {Array} users - Das Array, das alle registrierten Benutzer speichert. Jeder Benutzer wird durch seine ID eindeutig identifiziert.
 * @param {HTMLFormElement} form - Das HTML-Formular, das die Benutzereingabefelder enthält.
 * @param {FormData} formData - Ein FormData-Objekt, das die Formulardaten als Schlüssel-Wert-Paare speichert.
 * @param {Object} userObject - Ein Objekt, das die Formulardaten des neuen Benutzers enthält (z. B. `username`, `email`, etc.).
 * @param {number} userID - Die eindeutige ID für den neuen Benutzer, basierend auf der aktuellen Anzahl der Benutzer im `users`-Array.
 */
function registerUser(){
 let form = document.getElementById('sign_up_form');
 let formData = new FormData(form); //hab ich aus dem Buch von Rheinwerk: FormData stellt im endeffekt bereits ein Objekt her, dass dann abgefrühstückt werden kann                    
 let userObject ={};                //es kann dann über die for ...of schleife mit [key(name="") und value(input)] für jedes Element des Formulars ein Objekt erstellen weil es die
                                    //sachen durchgeht
 for (let[key, value] of formData){
    userObject[key] = value;
 }
 
 pushPushItRealHard(userObject);
}

/**
 * Setzt das Anmeldeformular und zugehörige Elemente zurück.
 * Diese Funktion leert alle Eingabefelder innerhalb des Formulars,
 * setzt insbesondere das Passwortbestätigungsfeld zurück und
 * deaktiviert das Kontrollkästchen für die Zustimmung zur Datenschutzerklärung.
 *
 */
function resetForm(){
    document.getElementById('sign_up_form').reset();
    document.getElementById('confirm_password_input_register').value = '';
    document.getElementById('agree_privacy_policy').checked = false;
    document.getElementById('signed_up_notification').classList.add('signed__up__notification__active');
    document.getElementById('overlay_signed_up').classList.remove('d__none');
}

/**
 * Fügt einen neuen Benutzer zum `users`-Array hinzu, registriert den Benutzer in Firebase, 
 * setzt das Formular zurück und aktualisiert den lokalen Speicher. Leitet weiter zum Login.
 *
 * @param {Object} userObject - Ein Objekt, das die Daten des Benutzers mit einer eindeutigen ID enthält. 
 *                              Das Objekt sollte mindestens folgende Eigenschaften enthalten:
 *                              - `id` (string|number): Die eindeutige Benutzer-ID.
 *                              - Weitere benutzerdefinierte Eigenschaften (z. B. `username`, `email`).
 * 
 * @returns {Promise<void>} Eine Promise, die aufgelöst wird, nachdem der Benutzer erfolgreich in Firebase registriert wurde
 *                          und das `users`-Array aktualisiert wurde.
 * 
 */
async function pushPushItRealHard(userObject){
    users.push(userObject);
    await registerUserInFirebase()
    resetForm();
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = 'login.html';
}

/**
 * Sendet das `users`-Array als JSON-Daten an die angegebene `usersUrl`, um die Benutzer in Firebase zu registrieren.
 *
 * @param {string} usersUrl - Die URL, an die die Benutzerinformationen gesendet werden sollen.
 *                            Diese URL repräsentiert den Endpunkt der Firebase-Datenbank.
 * @param {Array} users - Ein Array von Benutzerobjekten, die registriert werden sollen.
 *                        Jedes Objekt enthält Benutzerdetails wie `id`, `username`, `email` usw.
 *
 * @returns {Promise<void>} Eine Promise, die aufgelöst wird, wenn der PUT-Request erfolgreich abgeschlossen wurde.
 */
async function registerUserInFirebase() {
    try {
        let response =await fetch(usersUrl, {
        method:"PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(users)     
        })
    }

     catch (error) {
        showErrorAlert();
    }
    
}

/**
 * Aktiviert den "Registrieren"-Button, wenn die Checkbox zur Zustimmung der Datenschutzrichtlinie angehakt ist.
 * 
 * Diese Funktion überprüft, ob die Checkbox mit der ID `agree_privacy_policy` angehakt ist. 
 * Ist dies der Fall, wird der "Registrieren"-Button mit der ID `register_button` aktiviert, indem das `disabled`-Attribut auf `false` gesetzt wird.
 * 
 * @param {HTMLInputElement} checkbox - Die Checkbox, die anzeigt, ob die Datenschutzrichtlinie akzeptiert wurde. Sie wird über die ID `agree_privacy_policy` ausgewählt.
 * @param {HTMLButtonElement} button - Der Button, der aktiviert wird, wenn die Checkbox angehakt ist. Er wird über die ID `register_button` ausgewählt.
 * @param {boolean} isChecked - Ein Boolean-Wert, der den aktuellen Zustand der Checkbox (angekreuzt oder nicht) angibt.
 */
function enableRegisterButton(){
    let isChecked = document.getElementById('agree_privacy_policy').checked;

    if(isChecked == true){
        document.getElementById('register_button').disabled = false;
    }
}