//save the API key to local storage when the save button is clicked
//this API Key is used for all actions. Later this will be in a options menu or something
//TODO: Move it to a options menu
document.getElementById("saveKeyButon").addEventListener("click", function () {
    const key = document.getElementById("apiKeyInput").value;
    localStorage.setItem("apiKey", key);
    console.log(key);
    document.getElementById("apiKeyShow").textContent = key;
});

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
        if (
            tabs[0].url === undefined ||
            tabs[0].url.startsWith("http" || "https") == false
        ) {
            return getDefaultUrl();
        }
        return tabs[0].url;
    } catch (error) {
        console.error("An error occurred: ", error);
        return getDefaultUrl();
    }
}

getCurrentTabUrl()
    .then((currentUrl) => {
        document.getElementById("currentUrl").textContent = ("URL to share: " + currentUrl);
    })
    .catch((error) => {
        console.error("An error occurred: ", error);
    });

//gets the API key from local storage and displays it in the popup. This will not be in prod but is useful for testing
//TODO: remove this before prod
var apiKey = localStorage.getItem("apiKey");
document.getElementById("apiKeyShow").textContent = apiKey;
