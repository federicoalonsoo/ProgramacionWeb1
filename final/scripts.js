document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.getElementById("registroForm");
    const loginForm = document.getElementById("loginForm");
    const passwordMessage = document.getElementById("passwordMessage");
    const loginMessage = document.getElementById("loginMessage");
    const loginLink = document.getElementById("login-link");
    const profileLink = document.getElementById("profile-link");
    const messagesLink = document.getElementById("messages-link");
    const logoutLink = document.getElementById("logout-link");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".header-nav");
    const headerIcons = document.querySelector(".header-icons");


    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        headerIcons.classList.toggle("active");
    });
    
    function actualizarMenu() {
        if (localStorage.getItem("userLoggedIn")) {
            loginLink.style.display = "none";
            profileLink.style.display = "block";
            messagesLink.style.display = "block";
            logoutLink.style.display = "block";
            logoutLink.addEventListener("click", (event) => {
                event.preventDefault();
                localStorage.removeItem("userLoggedIn");
                localStorage.removeItem("userName");
                localStorage.removeItem("userEmail");
                window.location.href = "index.html";
            });
        } else {
            loginLink.style.display = "block";
            profileLink.style.display = "none";
            messagesLink.style.display = "none";
            logoutLink.style.display = "none";
        }
    }
    actualizarMenu();
    
    if (localStorage.getItem('userLoggedIn')) {
        mostrarContenidoRegistrado();
        mostrarOpcionesUsuario();
    }
    else {
        mostrarOpcionesVisitante();
    }

    
    if (registroForm) {
        registroForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const nombre = document.getElementById("nombre").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm_password").value;

            if (!nombre || !email || !password || !confirmPassword) {
                passwordMessage.textContent = "Todos los campos son obligatorios.";
                passwordMessage.style.color = "red";
                return;
            }

            if (password !== confirmPassword) {
                passwordMessage.textContent = "Las contraseñas no coinciden.";
                passwordMessage.style.color = "red";
                return;
            }

            if (!isValidPassword(password)) {
                passwordMessage.textContent = "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un símbolo (@$!%*?&).";
                passwordMessage.style.color = "red";
                return;
            }

            passwordMessage.textContent = "Registro exitoso. (Simulado)";
            passwordMessage.style.color = "green";

            localStorage.setItem("userLoggedIn", true);
            localStorage.setItem("userName", nombre);
            localStorage.setItem("userEmail", email);
            setTimeout(() => {
                mostrarContenidoRegistrado();
                mostrarOpcionesUsuario();
            }, 1000);
            location.href = "index.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const emailLogin = document.getElementById("email_login").value;
            const passwordLogin = document.getElementById("password_login").value;
    
            if (!emailLogin || !passwordLogin) {
                loginMessage.textContent = "Todos los campos son obligatorios.";
                loginMessage.style.color = "red";
                return;
            }
    
            loginMessage.textContent = "Inicio de sesión exitoso. (Simulado)";
            loginMessage.style.color = "green";
    
            localStorage.setItem('userLoggedIn', true);
            localStorage.setItem("userEmail", emailLogin);
            setTimeout(() => {
                mostrarContenidoRegistrado();
                mostrarOpcionesUsuario();
            }, 1000);
            location.href = "index.html";
        });
    }
        

    

    function isValidPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    function mostrarContenidoRegistrado() {
        document.querySelector('.card-bienvenida').style.display='none';
        document.querySelector('.card-feed').style.display='block';
        document.querySelector('.card-desafios').style.display='block';
        document.querySelector('.card-consejos').style.display='block';
    }

    function mostrarOpcionesVisitante() {
        loginLink.style.display = "block";
        profileLink.style.display = "none";
        messagesLink.style.display = "none";
        logoutLink.style.display = "none";
    }

    function mostrarOpcionesUsuario() {
        loginLink.style.display = "none";
        profileLink.style.display = "block";
        messagesLink.style.display = "block";
        logoutLink.style.display = "block";
        logoutLink.addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.removeItem("userLoggedIn");
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            location.href = "index.html";
        });
    }

    
});
