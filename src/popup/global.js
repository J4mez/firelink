document.getElementById("closeButton").addEventListener("click", () => {
    window.location.href = "index.html";
});

try {
    document.getElementById("optionsButton").addEventListener("click", () => {
        window.location.href = "options.html";
    });
    
} catch (error) {
    console.error("optionsButton not found");
}

// To show the error notification with a message
function showError(message) {
    const errorDiv = document.getElementById("errorNotification");
    errorDiv.textContent = message;
    errorDiv.classList.remove("d-none");
}

// To hide the error notification
function hideError() {
    const errorDiv = document.getElementById("errorNotification");
    errorDiv.classList.add("d-none");
}

// To show the loading spinner
function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    spinner.classList.remove('d-none');
}

// To hide the loading spinner
function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    spinner.classList.add('d-none');
}

// To show the success notification with a message
function showSuccess(message) {
    const successDiv = document.getElementById('successNotification');
    successDiv.textContent = message;
    successDiv.classList.remove('d-none');
}

// To hide the success notification
function hideSuccess() {
    const successDiv = document.getElementById('successNotification');
    successDiv.classList.add('d-none');
}
