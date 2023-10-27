// Verifica si ya existe un valor en localStorage para la clave "usuarios"
if (!localStorage.getItem('usuarios')) {
    // Si no existe, guarda los datos en localStorage
    const usuarios = [
      {
        username: 'anita',
        clave: 'admin123',
        avatar: '../img/avatar/soldier.png',
        nombre: 'Ana',
        apellido: 'Sayago',
        email: 'anita@gmail.com',
        fn: '2000-01-01',
        rol: 'administrador',
      },
      {
        username: 'crist',
        clave: 'admin123',
        avatar: '../img/avatar/monkey.png',
        nombre: 'Cristopher',
        apellido: '',
        email: 'cristopher@gmail.com',
        fn: '2000-01-01',
        rol: 'administrador',
      },
      {
        username: 'eli',
        clave: 'admin123',
        avatar: '../img/avatar/pilot.png',
        nombre: 'Eliezer',
        apellido: '',
        email: 'eliezer@gmail.com',
        fn: '2000-01-01',
        rol: 'administrador',
      },
      {
        username: 'hernan',
        clave: 'admin123',
        avatar: '../img/avatar/alien.png',
        nombre: 'Hernan',
        apellido: 'Casasola',
        email: 'hernan.casasola@gmail.com',
        fn: '2000-01-01',
        rol: 'administrador',
      }
    ];
  
    // Convierte el objeto a JSON
    const usuariosJSON = JSON.stringify(usuarios);
    // Guarda el JSON en localStorage
    localStorage.setItem('usuarios', usuariosJSON);
  }


  document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // Recuperamos los usuarios almacenados en el localStorage
    const usuariosJSON = localStorage.getItem('usuarios');
    const usuarios = JSON.parse(usuariosJSON);

    // Verificamos si existe un usuario con el nombre de usuario proporcionado
    const usuarioEncontrado = usuarios.find(user => user.username === username);

    if (usuarioEncontrado) {
        // Comparamos la contraseña ingresada con la contraseña del usuario encontrado
        if (usuarioEncontrado.clave === password) {
            // Inicio de sesión exitoso
            // alert('¡Inicio de sesión exitoso!\nBienvenido, ' + usuarioEncontrado.nombre);

            // Guarda al usuario en la sesión actual
            sessionStorage.setItem("usuarioLogeado", JSON.stringify(usuarioEncontrado));

            // Redirige al usuario a la página deseada después del inicio de sesión.
            if (usuarioEncontrado.rol === 'administrador'){
                // window.location.href = '/FRONTEND/index.html';
                parent.postMessage("usuarioLogeado", "*");
            } else if (usuarioEncontrado.rol === 'cliente') {
                window.location.href = '/FRONTEND/sidebar.html';
            }
        } else {
            // Contraseña incorrecta
            const errorPass = document.querySelector("#error-pass");
            errorPass.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.';
        }
    } else {
        // Usuario no encontrado
        const errorUser = document.querySelector("#error-user");
        errorUser.textContent = 'Usuario no encontrado. Regístrate si eres nuevo.';
    }
});

  
  

// document.getElementById('register-form').addEventListener('submit', function (e) {
//     e.preventDefault();

    // Aquí puedes agregar la lógica de registro, por ejemplo, enviar datos al servidor.
    // alert('¡Registro exitoso!');
// });
const loginContainer = document.querySelector('.login-container');
const registerContainer = document.querySelector('.register-container');
loginContainer.style.display = 'block';
registerContainer.style.display = 'none';


// Función para alternar entre los formularios de inicio de sesión y registro
function toggleFormRegister() {

    if (loginContainer.style.display === 'block') {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    }  
}

function toggleFormLogin() {
    if (registerContainer.style.display === 'block'){
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    }
}

// Evento para alternar entre los formularios al hacer clic en el enlace
document.querySelector('.toggle-form-button-login').addEventListener('click', toggleFormLogin);
document.querySelector('.toggle-form-button-register').addEventListener('click', toggleFormRegister);

    
