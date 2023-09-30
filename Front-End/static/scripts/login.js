document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    login();
});

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {
        username: username,
        contraseña: password, 
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/login2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (response.status === 200) {
            const userData = await response.json();
            // Almacena userData en localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            // Redirige a la página de PRINCIPAL
            window.location.href = "./discord.html";
        } else {
            const errorData = await response.json();
            alert(errorData.message + "\nTe invitamos a crear una cuenta de usuario");
            //document.getElementById("message").innerHTML = errorData.message;
        }
    } catch (error) {
        console.error("An error occurred:", error);
        document.getElementById("message").innerHTML = "An error occurred.";
    }
}






