function maskPassword(input) {
    const actualValue = input.value;  // Der tatsächliche Wert
    input.dataset.actualValue = actualValue;  // Speichere den tatsächlichen Wert im Dataset
    input.value = '*'.repeat(actualValue.length);  // Zeige Sterne (oder ein anderes Zeichen)
}


