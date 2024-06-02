document.addEventListener("DOMContentLoaded", function() {
    var splashScreen = document.querySelector('.splash-screen');

    splashScreen.addEventListener('animationend', function() {
        window.location.href = 'home.html';
    });
});
