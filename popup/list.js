// List all short URLs that the API key has access to (only the ones it created.)
// This will be later used to manage the already existing short URLs
async function listShortURLs(options) {
    let headersList = {
        Accept: "application/json",
        "X-API-Key": options.apiKey,
    };

    let response = await fetch(
        `https://${options.apiEndpoint}/rest/v3/short-urls`,
        {
            method: "GET",
            headers: headersList,
        }
    );

    let data = await response.text();
    console.log(data);
    return data;
}
// Define options for the URL listing function.
// This will be later be edited in the options menu
// TODO: Move it to options menu
var listOptions = {
    apiKey: localStorage.getItem("apiKey"),
    apiEndpoint: "short.morge.news",
};

// This funcion gets all short URLs and displays them in the popup
// This will be later used to manage already existing short URLs
async function getListShortURLs() {
    try {
        const result = await listShortURLs(listOptions);
        document.getElementById("urlList").textContent = result;
    } catch (error) {
        console.log(error);
        document.getElementById("urlList").textContent = error.message;
    }
}
getListShortURLs();
