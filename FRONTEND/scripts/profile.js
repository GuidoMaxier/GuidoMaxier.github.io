document.addEventListener('DOMContentLoaded', function() {
    // Obtener el elemento de imagen de perfil
    const imagenPerfil = document.getElementById('imagen_perfil');
    // Obtener los elementos de input
    const usernameInput = document.getElementById('usernameInput');
    const nombreInput = document.getElementById('nombreInput');
    const apellidoInput = document.getElementById('apellidoInput');
    const emailInput = document.getElementById('emailInput');
  
    // Obtener los datos del usuario almacenados en sessionStorage
    const usuarioString = sessionStorage.getItem('usuarioLogeado');
  
    if (usuarioString) {
      // Si se encontraron datos del usuario en sessionStorage
      const usuario = JSON.parse(usuarioString);
  
      // Establecer los valores en los elementos HTML
      usernameInput.value = usuario.username;
      nombreInput.value = usuario.nombre;
      apellidoInput.value = usuario.apellido;
      emailInput.value = usuario.email;
  
      // Establecer la imagen de perfil
      imagenPerfil.src = usuario.avatar;
    }
  });
  


// Obtener elementos HTML
const modal = document.getElementById('modal-avatar');
const openModalButton = document.getElementById('openModalAvatar');
const closeButton = document.getElementById('closeButton');

// Función para abrir la ventana modal
function openModal() {
  modal.style.display = 'block';
}

// Función para cerrar la ventana modal
function closeModal() {
  modal.style.display = 'none';
}

// Agregar eventos a los botones
openModalButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);


// Botón para guardar la selección del avatar
const guardarButton = document.getElementById('guardarButton');
guardarButton.addEventListener('click', () => {
  // Ejecuta la función para seleccionar el avatar
  seleccionarAvatar(avatarSrc);
  // Cierra la ventana modal
  closeModal();
});




function seleccionarAvatar(avatarSrc) {
  console.log(`Avatar seleccionado: ${avatarSrc}`);
  // Guarda en el sessionStorage
  sessionStorage.setItem('usuarioLogeado', JSON.stringify({ ...JSON.parse(sessionStorage.getItem('usuarioLogeado')), avatar: avatarSrc }));
  
  // Guarda  en el localStorage si es necesario 
  const usuarioLocalStorage = localStorage.getItem('usuarios');
  if (usuarioLocalStorage) {
    const usuarios = JSON.parse(usuarioLocalStorage);
    const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado'));
    const usuarioIndex = usuarios.findIndex(user => user.username === usuarioLogeado.username);
    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].avatar = avatarSrc;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  }
}
//  avatar seleccionado del sessionStorage
const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado'));
const avatarSrc = usuarioLogeado.avatar;

// Actualiza la imagen de perfil 
const imagenPerfil = document.getElementById('imagen_perfil');
imagenPerfil.src = avatarSrc;



// Obtén todas las imágenes de las filas
const images = document.querySelectorAll('.image-row img');

// Función para cambiar el estilo de la imagen cuando se hace clic
function toggleImageBorder(event) {
  const selectedImage = event.target;
  
  // Elimina la clase 'selected-avatar' de todas las imágenes
  images.forEach(image => image.classList.remove('selected-avatar'));
  
  // Agrega la clase 'selected-avatar' a la imagen seleccionada
  selectedImage.classList.add('selected-avatar');
}

// Agregar el evento de clic a todas las imágenes
images.forEach(image => {
  image.addEventListener('click', toggleImageBorder);
});




