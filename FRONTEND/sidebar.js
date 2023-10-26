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



  document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".nav-list a");

    menuLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault(); // Evita el comportamiento predeterminado de los enlaces.

        const dataSrc = link.getAttribute("href"); // Obtiene la URL de destino.
        const iframe = document.getElementById("content-frame");

        if (dataSrc && iframe) {
            iframe.src = dataSrc; // Carga la URL de destino en el iframe.
          
        }
      });
    });
  });



// Escucha los mensajes del iframe
window.addEventListener("message", function (event) {
  // Verifica si el mensaje proviene del iframe y si contiene la información del usuario
  if (event.source === iframeElement.contentWindow && event.data === "usuarioLogeado") {
      // Realiza la actualización de la página contenedora aquí
      location.reload(); // O cualquier otra acción que necesites
  }
});

// Obtén la referencia al elemento iframe
const iframeElement = document.getElementById("content-frame");



