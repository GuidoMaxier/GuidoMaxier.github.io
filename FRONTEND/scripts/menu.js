document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const menu = document.getElementById("menu");

    menuButton.addEventListener("click", function () {
        menu.classList.toggle("show");
    });

    // Cierra el menú cuando se hace clic en cualquier otro lugar de la página
    document.addEventListener("click", function (event) {
        if (event.target !== menuButton && event.target !== menu) {
            menu.classList.remove("show");
        }
    });
});
