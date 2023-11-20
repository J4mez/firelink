// WIP: This file is not used yet. It will be used to make API calls to generate the short URLs.
// TODO: Make it work
// TODO: Way to manage options
async function generateShortURL(options) {
    longUrl = await getCurrentTabUrl();
    console.log("generate short url for " + longUrl);

    let headersList = {
        Accept: "application/json",
        "X-API-Key": options.apiKey,
        "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
        longUrl: longUrl,
        tags: options.tags,
        //forwardQuery: options.forwardQuery,
        //customSlug: options.customSlug,
    });

    let response = await fetch(
        `https://${options.apiEndpoint}/rest/v3/short-urls`,
        {
            method: "POST",
            body: bodyContent,
            headers: headersList,
        }
    );

    let data = await response;
    return data;
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

//define some options. Later this will be user defined in the options menu
userTags = ["api", "test"];
userSlug = undefined;

//add a event listener to the button to generate the short URL and display it in the popup
document
    .getElementById("shareUrlButton")
    .addEventListener("click", async function () {
        var options = {
            apiKey: localStorage.getItem("apiKey"),
            apiEndpoint:
                localStorage.getItem("apiEndpoint") || "short.morge.news",
            tags: userTags || [],
            customSlug: userSlug || undefined,
            forwardQuery: true,
        };
        generatorResult = await generateShortURL(options);
        console.log(generatorResult);
        if (generatorResult.status != 200) {
            parsedResult = await generatorResult.json();
            //add the message to a new text element and add it to the result div
            var p = document.createElement("p");
            p.setAttribute("id", "generatedUrl");
            p.textContent = parsedResult.shortUrl;
        }
        else
        {
            parsedResult = await generatorResult.json();
            //add the message to a new text element and add it to the result div
            var p = document.createElement("p");
            p.setAttribute("id", "generatedUrl");
            p.textContent = parsedResult.shortUrl;
            document.getElementById("resultDiv").appendChild(p);
        } 
    });
