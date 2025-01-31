let contacts = [];
const BASE_URL = "https://backenjoin-default-rtdb.europe-west1.firebasedatabase.app/";


/**
 * Loads data from the specified endpoint.
 * @param {string} [path=""] - The API endpoint path to load data from.
 * @returns {Promise<Object|undefined>} A promise that resolves to the JSON response or undefined in case of an error.
 */
async function loadData(path = "") {
    try {
        let response = await fetch(BASE_URL + path + ".json");
        let responseToJson = await response.json();
        return responseToJson;
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

/**
 * Sends data to the specified endpoint using a POST request.
 * @param {string} [path=""] - The API endpoint path to post data to.
 * @param {Object} [data={}] - The data object to send.
 * @returns {Promise<Object|undefined>} A promise that resolves to the JSON response or undefined in case of an error.
 */
async function postData(path = "", data = {}) {
    try {
        let response = await fetch(BASE_URL + path + ".json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error posting data:", error);
    }
}

/**
 * Deletes data at the specified endpoint using a DELETE request.
 * @param {string} [path=""] - The API endpoint path to delete data from.
 * @returns {Promise<Object|undefined>} A promise that resolves to the JSON response or undefined in case of an error.
 */
async function deleteData(path = "") {
    try {
        let response = await fetch(BASE_URL + path + ".json", {
            method: "DELETE"
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}

/**
 * Updates data at the specified endpoint using a PUT request.
 * @param {string} [path=""] - The API endpoint path to update data.
 * @param {Object} [data={}] - The updated data object.
 * @returns {Promise<Object|undefined>} A promise that resolves to the JSON response or undefined in case of an error.
 */
async function putData(path = "", data = {}) {
    try {
        let response = await fetch(BASE_URL + path + ".json", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error putting data:", error);
    }
}

async function init() {
    try {
        await fetchUsers();
        await fetchTasks();
        await fetchContacts();
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}


