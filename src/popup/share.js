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
        domain: options.domain,
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

//generate a preview of the short URL
// if the slug is null, we generate a random slug but thats not saved in the local storage or the one used by the API
function generatePreview() {
    var options = defineOptions();
    previewSlug = options.customSlug;
    // generate 5 random characters if no slug is set
    if (previewSlug == null) {
        previewSlug = Math.random().toString(36).substring(2, 7);
    }
    var previewUrl = "https://" + options.apiEndpoint + "/" + previewSlug;
    document.getElementById("shortUrlPreview").textContent =
        "Preview: " + previewUrl;
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

getCurrentTabUrl()
    .then((currentUrl) => {
        document.getElementById("currentUrl").textContent =
            "URL to share: " + currentUrl;
    })
    .catch((error) => {
        console.error(error);
    });

//handle the slug setting in the share form. This overrites the slug in the options page and is saved when the user clicks on the share button
const form = document.getElementById("sharingOptionsForm");
var inputSlugField = document.getElementById("customSlugSharePage");

if (localStorage.getItem("userSlug")) {
    userSlug = localStorage.getItem("userSlug");
    document.getElementById("customSlugSharePage").value = userSlug;
}

form.addEventListener("submit", function (event) {
    // Prevent the form from being submitted
    event.preventDefault();
    userSlug = inputSlugField.value;
    localStorage.setItem("userSlug", userSlug);
    generatePreview();
});

// Function to handle input events
function handleInput() {
    // Clear any existing timeout
    clearTimeout(inputTimeout);

    // Set a new timeout
    inputTimeout = setTimeout(() => {
        // Get the value from the input field
        const inputValue = inputSlugField.value;

        // Store the value in localStorage
        localStorage.setItem("userSlug", inputValue);
        generatePreview();

        console.log("Saved new slug:", inputValue);
    }, 300); // Adjust the delay as needed (in milliseconds)
}

// Initialize the inputTimeout variable and add an input event listener to the input field
let inputTimeout;
inputSlugField.addEventListener("input", handleInput);

// define the options for the short URL
// mostly loads stuff from localstorage.
// If there is nothing in localstorage, it sets the values to null or default values

function defineOptions() {
    // Load the values from localStorage if they exist
    var userSlug = localStorage.getItem("userSlug");
    var userTitle = localStorage.getItem("userTitle");
    var domain = localStorage.getItem("userTitle");
    var userTags = localStorage.getItem("userTags")
        ? JSON.parse(localStorage.getItem("userTags"))
        : null;

    // Check if the values are undefined or empty, if so, set them to null
    userSlug =
        typeof userSlug !== "undefined" && userSlug !== "" ? userSlug : null;
    userTitle =
        typeof userTitle !== "undefined" && userTitle !== "" ? userTitle : null;

    // Check if the tags are undefined or empty, if so, set them to null
    if (typeof userTags === "undefined" || userTags == null || userTags == "") {
        userTags = ["api"];
    } else {
        userTags.unshift("api");
    }

    // Check if the domain is undefined or empty, if so, set it to "short.morge.news"
    domain =
        typeof domain !== "undefined" && domain !== ""
            ? domain
            : "short.morge.news";

    var options = {
        apiKey: localStorage.getItem("apiKey"),
        apiEndpoint: localStorage.getItem("apiEndpoint") || "short.morge.news", //late the API Endpoint will be configurable, atm it defaults to short.morge.news
        userTags: userTags, // Use the value from localStorage
        customSlug: userSlug, // Use the value from localStorage
        userTitle: userTitle, // Use the value from localStorage
        domain: domain, // Use the value from localStorage
        forwardQuery: true,
    };
    return options;
}

//generate a preview of the short URL
generatePreview();

//add a event listener to the button to generate the short URL and display it in the popup
document
    .getElementById("shareUrlButton")
    .addEventListener("click", async function () {
        //adding loading text
        showLoading();
        //getting options from local storage
        options = defineOptions();
        //generating the short URL
        generatorResult = await generateShortURL(options);
        console.log(generatorResult);

        //error handling
        if (generatorResult.status != 200) {
            hideLoading();
            parsedResult = await generatorResult.json();
            showError("Error: " + parsedResult.detail);
        } else {
            hideLoading();
            hideError();
            parsedResult = await generatorResult.json();
            //add the URL to a new text element and add it to the result div
            showSuccess("Success! Your short URL is: " + parsedResult.shortUrl);
            document.getElementById("currentUrl").remove();
            document.getElementById("shareUrlButton").remove();
            document.getElementById("shortUrlPreview").remove();
            document.getElementById("sharingOptionsForm").remove();

            // Create a new button element
            var btn = document.createElement("button");
            btn.className = "btn btn-primary m-2 text-center";
            btn.textContent = "Copy to clipboard";

            // Add an event listener to the button
            btn.addEventListener("click", function () {
                var textToCopy = parsedResult.shortUrl;
                navigator.clipboard.writeText(textToCopy).then(
                    function () {
                        showSuccess("Copied to clipboard!");
                    },
                    function (err) {
                        console.error("Could not copy text: ", err);
                        showError("Could not copy text: " + err);
                    }
                );
            });

            // add the button below the successMessage div
            var element = document.getElementById("successMessage");
            element.appendChild(btn);
        }
    });
