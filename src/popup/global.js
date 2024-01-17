document.getElementById("closeButton").addEventListener("click", () => {
    window.location.href = "index.html";
});

try {
    document.getElementById("optionsButton").addEventListener("click", () => {
        window.location.href = "options.html";
    });
    
} catch (error) {
    console.error("optionsButton not found");
}

