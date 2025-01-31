let flatpickrInstance;

async function initAddTasks() {
    initFlatpickr();
}

function initFlatpickr() {
    flatpickrInstance = flatpickr("#task_due_date", {
        dateFormat: "d/m/Y",
        altInput: true,
        altFormat: "d/m/Y",
        allowInput: true,
        defaultDate: null,
        disableMobile: true,
        locale: "de",
        placeholder: "dd/mm/yyyy",
    });
}

function openCalendar() {
    if (flatpickrInstance) flatpickrInstance.open();
}