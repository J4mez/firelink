// Get the form element
const form = document.getElementById('optionsForm');

// Variables to store the options
let userSlug, userTitle, userTags, apiKey;

// Load the values from localStorage if they exist
if(localStorage.getItem('userSlug')) {
    userSlug = localStorage.getItem('userSlug');
    document.getElementById('customSlug').value = userSlug;
}

if(localStorage.getItem('apiKey')) {
    apiKey = localStorage.getItem('apiKey');
    document.getElementById('apiKeyInput').value = apiKey;
}

if(localStorage.getItem('userTitle')) {
    userTitle = localStorage.getItem('userTitle');
    document.getElementById('title').value = userTitle;
}

if(localStorage.getItem('userTags')) {
    userTags = JSON.parse(localStorage.getItem('userTags'));
    document.getElementById('tags').value = userTags.join(',');
}

// Add an event listener for form submission
form.addEventListener('submit', function(event) {
    // Prevent the form from being submitted
    event.preventDefault();

    // Get the values from the form
    userSlug = document.getElementById('customSlug').value;
    userTitle = document.getElementById('title').value;
    userTags = document.getElementById('tags').value.split(',');
    apiKey = document.getElementById("apiKeyInput").value;

    // Add "api" to the beginning of the tags array
    userTags.unshift('api');

    // Store the values in localStorage
    localStorage.setItem('userSlug', userSlug);
    localStorage.setItem('userTitle', userTitle);
    localStorage.setItem('userTags', JSON.stringify(userTags));
    localStorage.setItem("apiKey", apiKey);

    // Log the values (for testing purposes)
    console.log(userSlug, userTitle, userTags, apiKey);
});