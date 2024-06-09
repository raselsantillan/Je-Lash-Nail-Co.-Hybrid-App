document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const registerContent = document.getElementById('register-content');
    
    showRegister.addEventListener('click', function (e) {
        e.preventDefault();
        loginForm.parentElement.classList.remove('active');
        registerContent.classList.add('active');
    });
    
    showLogin.addEventListener('click', function (e) {
        e.preventDefault();
        registerContent.classList.remove('active');
        loginForm.parentElement.classList.add('active');
    });
    
    // Initialize with login form visible
    loginForm.parentElement.classList.add('active');
});
