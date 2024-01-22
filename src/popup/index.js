getCurrentTabUrl()
    .then((currentUrl) => {
        //trimm the URL if it's loger than 50 characters
        if (currentUrl.length > 50) {
            var showCurrentUrl = currentUrl.substring(0, 50) + "...";
        }
        else {
            var showCurrentUrl = currentUrl;
        }
        document.getElementById("currentUrl").textContent =
            "URL to share: " + showCurrentUrl;
    })
    .catch((error) => {
        console.error(error);
    });
