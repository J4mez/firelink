document.getElementById("optionsButton").addEventListener("click", () => {
    window.location.href = "options.html";
});

document.getElementById("shareButton").addEventListener("click", () => {
    window.location.href = "share.html";
});

document.getElementById("manageButton").addEventListener("click", () => {
    window.location.href = "manage.html";
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
            (!tabs[0].url.startsWith("http"))
        ) {
            return getDefaultUrl();
        }
        return tabs[0].url;
    } catch (error) {
        throw new Error("An error occurred: " + error);
    }
}

getCurrentTabUrl()
    .then((currentUrl) => {
        document.getElementById("currentUrl").textContent = ("URL to share: " + currentUrl);
    })
    .catch((error) => {
        console.error(error);
    });