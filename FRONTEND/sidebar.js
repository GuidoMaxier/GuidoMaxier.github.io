/* Created by Tivotal */

let btn = document.querySelector(".fa-dice-d20");
let sidebar = document.querySelector(".sidebar");

btn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

let arrows = document.querySelectorAll(".arrow");
for (var i = 0; i < arrows.length; i++) {
  arrows[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;

    arrowParent.classList.toggle("show");
  });
}


// Obtén todos los elementos del menú
const menuItems = document.querySelectorAll('.nav-list li');

// Obtén el iframe
const iframe = document.getElementById('content-frame');

// Agrega un evento de clic a cada elemento del menú
menuItems.forEach((menuItem) => {
menuItem.addEventListener('click', function() {
// Obtén la URL de data-src del elemento del menú actual
const dataSrc = this.getAttribute('data-src');
if (dataSrc) {
    // Cambia la URL del iframe
    iframe.src = dataSrc;
       }
    });
   });



// se logea


   document.addEventListener("DOMContentLoaded", function () {
    const userSection = document.getElementById("userSection");
    const loginLink = document.getElementById("loginLink");
    const registerLink = document.getElementById("registerLink");

    // Verificar si hay un usuario en la sesión
    const usuarioLogeadoJSON = sessionStorage.getItem("usuarioLogeado");
    if (usuarioLogeadoJSON) {
        const usuarioLogeado = JSON.parse(usuarioLogeadoJSON);

        // Mostrar información del usuario y botón de logout
        loginLink.style.display = "none";
        registerLink.style.display = "none";
        userSection.style.display = "flex";
        // Actualiza el avatar y nombre del usuario
        document.getElementById("userAvatar").src = usuarioLogeado.avatar;
        document.getElementById("userName").textContent = usuarioLogeado.nombre;

        // Añade un evento para el botón de logout
        document.getElementById("logoutButton").addEventListener("click", function () {
            // Elimina el usuario de la sesión
            sessionStorage.removeItem("usuarioLogeado");

            // Redirige al usuario a la página de inicio de sesión
            window.location.href = "login.html";
        });
    } else {
        // No hay usuario logeado en la sesión
        loginLink.style.display = "block";
        registerLink.style.display = "block";
        userSection.style.display = "none";
    }


    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");


    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });

    // Cierra el menú cuando se hace clic en cualquier otro lugar de la página
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && event.target !== menuToggle) {
            menu.classList.remove("active");
        }
    });
});



