const container = document.getElementById('container')


// Se abre la ventana Explorador
document.getElementById('explorer').addEventListener('click', () => {
    
    container.style.display = 'block';
});

//Se cierra la ventana explorador
document.getElementById('close-container').addEventListener('click', () => {
    container.style.display = 'none';
});



let currentPhoto = "";
    
function openModal(photoName) {
    currentPhoto = photoName;
    const modal = document.getElementById("modal_e");
    modal.style.display = "block";
}
    
function closeModal() {
    const modal = document.getElementById("modal_e");
    modal.style.display = "none";
}
    
function confirmation() {
    alert(`Te has unido al servidor ${currentPhoto}`);

        //unirse al servidor llamar al fetch
    
    closeModal();
}



const searchInput = document.querySelector('.search2');

// Agregar un evento keydown al input de búsqueda
searchInput.addEventListener('keydown', function (event) {
  // Verificar si la tecla presionada es "Enter" (código 13)
  if (event.keyCode === 13) {
    // Obtener el valor del input
    
    const buscador = searchInput.value;
    alert('Alerta'+ buscador)
    
    // Llamar a la función cargarServidores con el valor
    buscarServidores(buscador);

    // Limpiar el input después de presionar "Enter" (opcional)
    searchInput.value = '';
  }
});