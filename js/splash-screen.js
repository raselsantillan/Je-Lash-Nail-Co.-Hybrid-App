document.addEventListener("DOMContentLoaded", function() {
    var splashScreen = document.querySelector('.splash-screen');

    // Show splash screen on page load
    splashScreen.style.opacity = 1;

    splashScreen.addEventListener('animationend', function() {
        // Redirect to index.html after fade-in animation
        window.location.href = 'index.html';
    });
});
