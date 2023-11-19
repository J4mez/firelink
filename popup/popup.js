document.getElementById("saveKeyButon").addEventListener("click", function () {
    const key = document.getElementById("apiKeyInput").value;
    localStorage.setItem("apiKey", key);
    document.getElementById("apiKeyShow").textContent = key;
    console.log("Key saved");
    console.log(key);
});

function getCurrentTabUrl() {
    return browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
            return tabs[0].url;
        });
}

getCurrentTabUrl().then(
    (url) => (document.getElementById("currentUrl").textContent = url)
);

var apiKey = localStorage.getItem("apiKey");
document.getElementById("apiKeyShow").textContent = apiKey;