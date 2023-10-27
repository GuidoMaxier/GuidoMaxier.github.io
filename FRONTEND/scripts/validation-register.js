
const registerform = document.querySelector('#register-form')

const validationForm = (event) => {
    event.preventDefault();
    

    const username = document.querySelector("#register-username").value;
    const firtsname = document.querySelector('#register-firstname').value;
    const lastname = document.querySelector('#register-lastname').value;
    const email = document.querySelector("#register-email").value;
    const password = document.querySelector("#register-password").value;
    const birthdate = document.querySelector("#register-birthdate").value;

    const errorUsername = document.querySelector("#error-username");
    const errorfirtsname = document.querySelector("#error-firtsname");
    const errorlastname = document.querySelector("#error-lastname");
    const errorEmail = document.querySelector("#error-email");
    const errorPassword = document.querySelector("#error-password");
    const errorBirthdate = document.querySelector("#error-birthdate");
    

    let validation = true;

    if(username === ''){
        errorUsername.textContent = "Debes completar el campo usuario";
        validation = false;
    } 
    
    if(firtsname === ''){
        errorfirtsname.textContent='Debes completar el campo nombre';
        validation = false;
    } 

    if(lastname  === ''){
        errorlastname.textContent='Debes completar el campo apellido';
        validation= false;
    }

    // Validación de longitud mínima del nombre de usuario al menos 6 caracteres
    if (username.length < 6) {
        errorUsername.textContent = "El usuario debe tener al menos 6 caracteres";
        validation = false; 
    } else {
        errorUsername.textContent = "";
    }

    // Validación del formato del correo electrónico
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        errorEmail.textContent = "El correo electrónico no es válido";
        validation = false;
    } else {
        errorEmail.textContent = "";
    }

    // Validación de contraseña al menos 8 caracteres
    if (password.length < 8) {
        errorPassword.textContent = "La contraseña debe tener al menos 8 caracteres";
        validation = false;
    } else {
        errorPassword.textContent = "";
    }

    // Validación de fecha de nacimiento (mayor de 18 años)
    var currentDate = new Date();
    var selectedDate = new Date(birthdate);
    var age = currentDate.getFullYear() - selectedDate.getFullYear();
    var birthMonth = selectedDate.getMonth();
    var currentMonth = currentDate.getMonth();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < selectedDate.getDate())) {
        age--;
    }

    if (age < 18) {
        errorBirthdate.textContent = "Debes ser mayor de 18 años para registrarte";
        validation = false;
    } else {
        errorBirthdate.textContent = "";
    }

    if(validation){
        registerform.submit();
        addUser();
        const exito = document.querySelector("#exito-usuario");
        exito.textContent='Usuario creado exitosamente';

    }
}

registerform.addEventListener('submit',validationForm);


function hideLabel() {
    var label = document.querySelector("#label-date");
    label.style.display = "none";
 
    var input = document.querySelector("#register-birthdate");
    input.style.color = "black";
}

function addUser(){

    const username = document.querySelector("#register-username").value;
    const firtsname = document.querySelector('#register-firstname').value;
    const lastname = document.querySelector('#register-lastname').value;
    const email = document.querySelector("#register-email").value;
    const password = document.querySelector("#register-password").value;
    const birthdate = document.querySelector("#register-birthdate").value;

    // Recuperar usuarios existentes del localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Crear un nuevo usuario
    const nuevoUsuario = {
    username: username,
    clave: password,
    avatar: '../img/avatar/OIP.jpeg',
    nombre: firtsname,
    apellido: lastname,
    email: email,
    fn: birthdate,
    rol: 'cliente',
    };

    // Agregar el nuevo usuario al arreglo existente
    usuarios.push(nuevoUsuario);

    // Guardar el arreglo actualizado en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}