async function generateShortURL(options) {
    const longUrl = await getCurrentTabUrl();

    const headersList = {
        Accept: "application/json",
        "X-API-Key": options.apiKey,
        "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
        longUrl: longUrl,
        tags: options.userTags,
        customSlug: options.customSlug,
        forwardQuery: options.forwardQuery,
        title: options.userTitle,
    });

    const response = await fetch(
        `https://${options.apiEndpoint}/rest/v3/short-urls`,
        {
            method: "POST",
            body: bodyContent,
            headers: headersList,
        }
    );
    return response;
}

//gets the current URL and displays it in the popup. Later this will be used to generate a short URL
const DEFAULT_URL = "https://example.com";

function getDefaultUrl() {
    return Promise.resolve(DEFAULT_URL);
}

async function getCurrentTabUrl() {
    if (typeof browser === "undefined" || !browser.tabs) {
        return getDefaultUrl();
    }
    try {
        const tabs = await browser.tabs.query({
            active: true,
            currentWindow: true,
        });
        //check if the tab is valid and has http or https in the URL if not return the default URL
        if (tabs[0].url === undefined || !tabs[0].url.startsWith("http")) {
            return getDefaultUrl();
        }
        return tabs[0].url;
    } catch (error) {
        console.error("An error occurred: ", error);
        return getDefaultUrl();
    }
}

getCurrentTabUrl().then((currentUrl) => {
    document.getElementById("currentUrl").textContent =
        "URL to share: " + currentUrl;
});

function defineOptions() {
    // Load the values from localStorage if they exist
    var userSlug = localStorage.getItem("userSlug");
    var userTitle = localStorage.getItem("userTitle");
    var userTags = localStorage.getItem("userTags")
        ? JSON.parse(localStorage.getItem("userTags"))
        : null;

    // Check if the values are undefined, if so, set them to null
    userSlug = typeof userSlug !== "undefined" ? userSlug : null;
    userTitle = typeof userTitle !== "undefined" ? userTitle : null;
    userTags = typeof userTags !== "undefined" ? userTags : null;

    var options = {
        apiKey: localStorage.getItem("apiKey"),
        apiEndpoint: localStorage.getItem("apiEndpoint") || "short.morge.news",
        userTags: userTags, // Use the value from localStorage
        customSlug: userSlug, // Use the value from localStorage
        userTitle: userTitle, // Use the value from localStorage
        forwardQuery: true,
    };
    return options;
}

//add a event listener to the button to generate the short URL and display it in the popup
document
    .getElementById("shareUrlButton")
    .addEventListener("click", async function () {
        options = defineOptions();
        generatorResult = await generateShortURL(options);
        console.log(generatorResult);
        if (generatorResult.status != 200) {
            console.log("error");
            parsedResult = await generatorResult.json();
            //add the message to a new text element and add it to the result div
            var p = document.createElement("p");
            p.setAttribute("id", "generatedUrl");
            p.textContent = "Error: " + parsedResult.detail;
            document.getElementById("resultDiv").appendChild(p);
        } else {
            parsedResult = await generatorResult.json();
            //add the message to a new text element and add it to the result div
            var p = document.createElement("p");
            p.setAttribute("id", "generatedUrl");
            p.textContent = parsedResult.shortUrl;
            document.getElementById("resultDiv").appendChild(p);
            document.getElementById("currentUrl").textContent = "Shorted URL:";
            document.getElementById("shareUrlButton").remove();

            // Create a new button element
            var btn = document.createElement("button");
            btn.textContent = "Copy to clipboard";

            // Add an event listener to the button
            btn.addEventListener("click", function () {
                var textToCopy =
                    document.getElementById("generatedUrl").textContent;
                navigator.clipboard.writeText(textToCopy).then(
                    function () {
                        console.log("Copying to clipboard was successful!");
                        var successMsg = document.createElement("p");
                        successMsg.textContent = "Text copied successfully!";
                        document
                            .getElementById("resultDiv")
                            .appendChild(successMsg);
                    },
                    function (err) {
                        console.error("Could not copy text: ", err);
                    }
                );
            });

            // Append the button to the result div
            document.getElementById("resultDiv").appendChild(btn);
        }
    });
