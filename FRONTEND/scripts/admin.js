// Función para agregar una nueva cancha.
function agregarCancha() {
    const nombreCancha = document.querySelector("#nombreCancha").value;
    const precioCancha = document.querySelector("#precioCancha").value;
    if (nombreCancha) {
        const nuevaCancha = {
            nombre: nombreCancha,
            precio:precioCancha,
        };

        // Agregar la nueva cancha al arreglo de canchas (simulado) y guardar en localStorage.
        let canchas = JSON.parse(localStorage.getItem('canchas')) || [];
        canchas.push(nuevaCancha);
        localStorage.setItem('canchas', JSON.stringify(canchas));

        // Actualizar la lista de canchas en la página.
        actualizarListaCanchas();

        // Limpiar el campo de entrada.
        document.querySelector("#nombreCancha").value = "";
        document.querySelector("#precioCancha").value = "";
    }
}

// Función para mostrar las tarjetas de las canchas existentes.
function actualizarListaCanchas() {
    const canchasList = document.querySelector('#canchasList');
    canchasList.innerHTML = "";

    const canchas = JSON.parse(localStorage.getItem('canchas')) || [];

    for (let i = 0; i < canchas.length; i++) {
        const cancha = canchas[i];

        // Crear una tarjeta para cada cancha.
        const card = document.createElement('div');
        card.classList.add('cancha-card');
        card.innerHTML = `
            <p><strong>Nombre:</strong> ${cancha.nombre}</p>
            <p><strong>Precio:</strong> $${cancha.precio} por hora</p>
            <button onclick="editarCancha(${i})">Editar</button>
            <button onclick="eliminarCancha(${i})">Eliminar</button>
        `;

        canchasList.appendChild(card);
    }
}

// Función para eliminar una cancha.
function eliminarCancha(index) {
    let canchas = JSON.parse(localStorage.getItem('canchas')) || [];
    canchas.splice(index, 1);
    localStorage.setItem('canchas', JSON.stringify(canchas));
    actualizarListaCanchas();
}


// Actualizar la lista de canchas al cargar la página.
actualizarListaCanchas();


// Función para abrir la ventana modal de edición.
function editarCancha(index) {
    const canchas = JSON.parse(localStorage.getItem('canchas')) || [];
    const cancha = canchas[index];
    
    // Llena los campos de la ventana modal con los valores actuales.
    document.getElementById("nuevoNombre").value = cancha.nombre;
    document.getElementById("nuevoPrecio").value = cancha.precio;
    
    // Muestra la ventana modal.
    document.getElementById("modal").style.display = "block";
    
    // Guarda el índice de la cancha que se está editando.
    document.getElementById("modal").setAttribute("data-index", index);
}

// Función para guardar la edición desde la ventana modal.
function guardarEdicion() {
    const canchas = JSON.parse(localStorage.getItem('canchas')) || [];
    const index = document.getElementById("modal").getAttribute("data-index");
    
    if (index !== null) {
        const nuevoNombre = document.getElementById("nuevoNombre").value;
        const nuevoPrecio = document.getElementById("nuevoPrecio").value;
        
        canchas[index].nombre = nuevoNombre;
        canchas[index].precio = nuevoPrecio;
        
        localStorage.setItem('canchas', JSON.stringify(canchas));
        actualizarListaCanchas();
    }
    
    // Cierra la ventana modal.
    cerrarModal();
}

// Función para cerrar la ventana modal.
function cerrarModal() {
    document.getElementById("modal").style.display = "none";

}

function profile() {
    // const canchas = JSON.parse(localStorage.getItem('canchas')) || [];
    // const cancha = canchas[index];
    
    // Llena los campos de la ventana modal con los valores actuales.
    // document.getElementById("nuevoNombre").value = cancha.nombre;
    // document.getElementById("nuevoPrecio").value = cancha.precio;
    
    // Muestra la ventana modal.
    document.querySelector(".modal-profile").style.display = "block";  
    
}

function cerrarModalProfile() {
    document.querySelector(".modal-profile").style.display = "none";  
}
