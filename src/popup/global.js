try {
    document.getElementById("closeButton").addEventListener("click", () => {
        window.location.href = "index.html";
    });
} catch (error) {
    console.error("closeButton not found");
}

try {
    document.getElementById("optionsButton").addEventListener("click", () => {
        window.location.href = "options.html";
    });
} catch (error) {
    console.error("optionsButton not found");
}

try {
    document.getElementById("shareButton").addEventListener("click", () => {
        window.location.href = "share.html";
    });
} catch (error) {
    console.error("shareButton not found");
}

try {
    document.getElementById("manageButton").addEventListener("click", () => {
        //window.location.href = "manage.html";
        //send to https://app.shlink.io/manage-servers
        browser.tabs.create({ url: "https://app.shlink.io/manage-servers" });
    });
} catch (error) {
    console.error("manageButton not found");
}

try {
    document
        .getElementById("btn-close-success")
        .addEventListener("click", () => {
            hideSuccess();
        });
} catch (error) {
    console.error("btn-close-success not found");
}

try {
    document
        .getElementById("btn-close-error")
        .addEventListener("click", () => {
            hideError();
        });
} catch (error) {
    console.error("btn-close-error not found");
}

// To show the error notification with a message
function showError(message) {
    const errorDiv = document.getElementById("errorNotification");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorDiv.classList.remove("d-none");
}

// To hide the error notification
function hideError() {
    const errorDiv = document.getElementById("errorNotification");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = "";
    errorDiv.classList.add("d-none");
}

// To show the loading spinner
function showLoading() {
    const spinner = document.getElementById("loadingSpinner");
    spinner.classList.remove("d-none");
}

// To hide the loading spinner
function hideLoading() {
    const spinner = document.getElementById("loadingSpinner");
    spinner.classList.add("d-none");
}

// To show the success notification with a message
function showSuccess(message) {
    const successDiv = document.getElementById("successNotification");
    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = message;
    successDiv.classList.remove("d-none");
}

// To hide the success notification
function hideSuccess() {
    const successDiv = document.getElementById("successNotification");
    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = "";
    successDiv.classList.add("d-none");
}

//gets the current URL and displays it in the popup. Later this will be used to generate a short URL
const DEFAULT_URL = "https://example.com";

function getDefaultUrl() {
    let tabs = [{ url: DEFAULT_URL }];
    return Promise.resolve(tabs[0].url);
}

async function getCurrentTabUrl() {
    if (typeof browser === "undefined" || !browser.tabs) {
        return getDefaultUrl();
    }
    try {
        let tabs = await browser.tabs.query({
            active: true,
            currentWindow: true,
        });
        //check if the tab is valid and has http or https in the URL if not return the default URL
        if (tabs[0].url === undefined || !tabs[0].url.startsWith("http")) {
            return getDefaultUrl();
        }
        return tabs[0].url;
    } catch (error) {
        throw new Error("An error occurred: " + error);
    }
}

