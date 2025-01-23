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
        checkPassword();
        console.log("checked");        
    }
    else{
        console.log("not checked");
        
    }
}

/**
 * Überprüft, ob das eingegebene Passwort und das Bestätigungspasswort übereinstimmen.
 * Wenn die Passwörter gleich sind, wird die Funktion `registerUser()` aufgerufen.
 * Andernfalls passiert nichts (keine Aktion wird ausgeführt).
 *
 * @param {string} pw - Das eingegebene Passwort des Benutzers.
 * @param {string} confirm_Pw - Das Bestätigungspasswort des Benutzers.
 */
function checkPassword(){
    let pw = document.getElementById('password_input_register').value;
    let confirm_Pw = document.getElementById('confirm_password_input_register').value;

    if(pw === confirm_Pw){
        registerUser();
    }
    else{

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
 * @param {Object} userWithId - Ein Objekt, das die Benutzer-ID als Schlüssel und das `userObject` als Wert enthält.
 */
function registerUser(){
 let userID = users.length + 1;
 let form = document.getElementById('sign_up_form');
 let formData = new FormData(form); //hab ich aus dem Buch von Rheinwerk: FormData stellt im endeffekt bereits ein Objekt her, dass dann abgefrühstückt werden kann                    
 let userObject ={};                //es kann dann über die for ...of schleife mit [key(name="") und value(input)] für jedes Element des Formulars ein Objekt erstellen weil es die
                                    //sachen durchgeht
 for (let[key, value] of formData){
    userObject[key] = value;
 }
 let userWithId = {
    [userID]:userObject
 };
 users.push(userWithId);
 resetForm();
 console.log(users);
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
}

