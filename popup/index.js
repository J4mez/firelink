//save the API key to local storage when the save button is clicked
//this API Key is used for all actions. Later this will be in a options menu or something
//TODO: Move it to a options menu
document.getElementById("saveKeyButon").addEventListener("click", function () {
    const key = document.getElementById("apiKeyInput").value;
    localStorage.setItem("apiKey", key);
    document.getElementById("apiKeyShow").textContent = key;
    console.log("Key saved");
    console.log(key);
});

function getCurrentTabUrl() {
    //error handling if the browser does not support the tabs API
    // this is mainly for testing and should not do anything in production as the extension has access to the brower API
    if (typeof browser === "undefined" || !browser.tabs) {
        var tabs = [{ url: "https://example.com" }];
        return Promise.resolve(tabs[0].url);
    }
    return browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
            return tabs[0].url;
        })
        .catch((error) => {
            console.error("An error occurred: ", error);
            var tabs = [{ url: "https://example.com" }];
            return tabs[0].url;
        });
}
//gets the current URL and displays it in the popup. Later this will be used to generate a short URL
getCurrentTabUrl().then(
    (url) => (document.getElementById("currentUrl").textContent = url)
);

//gets the API key from local storage and displays it in the popup. This will not be in prod but is useful for testing
//TODO: remove this before prod
var apiKey = localStorage.getItem("apiKey");
document.getElementById("apiKeyShow").textContent = apiKey;
