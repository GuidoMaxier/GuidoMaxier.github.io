
let btn = document.querySelector(".fa-dice-d20");
let sidebar = document.querySelector(".sidebar");

btn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

let arrows = document.querySelectorAll(".arrow");
for (let i = 0; i < arrows.length; i++) {
  arrows[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;

    arrowParent.classList.toggle("show");
  });
}



  // document.addEventListener("DOMContentLoaded", function () {
  //   const menuLinks = document.querySelectorAll(".nav-list a");

  //   menuLinks.forEach((link) => {
  //     link.addEventListener("click", function (event) {
        // event.preventDefault(); // Evita el comportamiento predeterminado de los enlaces.

        // const dataSrc = link.getAttribute("href"); // Obtiene la URL de destino.
        // const iframe = document.getElementById("content-frame");

        // if (dataSrc && iframe) {
            // iframe.src = dataSrc; // Carga la URL de destino en el iframe.
          
  //       }
  //     });
  //   });
  // });



// Escucha los mensajes del iframe
window.addEventListener("message", function (event) {
  // Verifica si el mensaje proviene del iframe y si contiene la información del usuario
  if (event.source === iframeElement.contentWindow && event.data === "usuarioLogeado") {
      // Actualizamos el contenedor
      location.reload(); 

  }
});

// Obtén la referencia al elemento iframe
const iframeElement = document.getElementById("content-frame");



document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".nav-list a");
  const iframeElement = document.getElementById("content-frame");
  const usuarioLogeado = sessionStorage.getItem("usuarioLogeado");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const dataSrc = link.getAttribute("href");
      if (dataSrc && iframeElement) {
        iframeElement.src = dataSrc;
      }
    });
  });

  if (usuarioLogeado) {

    const loginMenu = document.querySelector(".login-menu");
    if (loginMenu) {
      loginMenu.style.display = "none";
    }

    const usuarioData = JSON.parse(usuarioLogeado);
    const profileImage = document.querySelector(".profile-content img");
    profileImage.src = usuarioData.avatar;

    const profileName = document.querySelector(".name-job .name");
    profileName.textContent = usuarioData.nombre;

    const profileJob = document.querySelector(".name-job .job");
    profileJob.textContent = usuarioData.rol;

    const profileMenu = document.querySelector(".profile-menu");
    const logoutMenu = document.querySelector(".logout-menu");
    const profileDetails = document.querySelector(".profile-details");

    if (logoutMenu && profileDetails) {
      logoutMenu.style.display = "flex";
      profileDetails.style.display = "flex";
      profileMenu.style.display = "flex";
    }
    // Agregar un evento de clic al botón de cierre de sesión
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      logoutButton.addEventListener("click", function () {
        // Eliminar la información de la sesión
        sessionStorage.removeItem("usuarioLogeado");
        // Recargar la página
        location.reload();
      });
    }
  }
});

