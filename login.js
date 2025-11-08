document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Redirect to the game page no matter what
    window.location.href = "front.html";
});