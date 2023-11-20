// WIP: This file is not used yet. It will be used to make API calls to generate the short URLs.
// TODO: Make it work
// TODO: Way to manage options
async function generateShortURL(longURL, options) {
    let headersList = {
        Accept: "application/json",
        "X-API-Key": options.apiKey,
        "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
        longUrl: longURL,
        tags: [options.tags],
        forwardQuery: options.forwardQuery,
        customSlug: options.customSlug,
        findIfExists: true,
    });

    let response = await fetch(
        `https://${options.apiEndpoint}/rest/v3/short-urls`,
        {
            method: "POST",
            body: bodyContent,
            headers: headersList,
        }
    );

    let data = await response.text();
    console.log(data);
}
