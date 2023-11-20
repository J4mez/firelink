async function listShortURLs (options){
    let headersList = {
        "Accept": "application/json",
        "X-API-Key": options.apiKey
       }
       
       let response = await fetch(`https://${options.apiEndpoint}/rest/v3/short-urls`, { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.text();
       console.log(data);
       return data;
}
//define options TODO: make it easier to change options
var listOptions = {
    apiKey: localStorage.getItem("apiKey"),
    apiEndpoint: "short.morge.news",
}

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