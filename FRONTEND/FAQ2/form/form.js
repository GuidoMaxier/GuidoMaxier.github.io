
var inputs = document.getElementsByClassName('formulario__input');
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', function () {
        if(this.value.length>=1) {
            this.nextElementSibling.classList.add('fijar');
        } else {
            this.nextElementSibling.classList.remove('fijar');
        }
    });
}

const nombre = document.getElementById("name")
const email = document.getElementById("email")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")
const errorfirstname = document.getElementById("error-firstname")

// form.addEventListener("submit", e=>{
//     e.preventDefault()
//     let warnings = ""
//     let entrar = false
//     if(nombre.value.length <4){
//         warnings += `El nombre no es valido <br>`
//         entrar = true
//     }
//     if(entrar){
//         parrafo.innerHTML = warnings
//     }
// })
if(nombre === ''){
    errorfirstname.textContent='Debes completar el campo nombre';
    validation = false;
} 


// Validación del formato del correo electrónico
var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
if (!emailRegex.test(email)) {
    errorEmail.textContent = "El correo electrónico no es válido";
    validation = false;
} else {
    errorEmail.textContent = "";
}

// // Validación de contraseña al menos 8 caracteres
// if (password.length < 8) {
//     errorPassword.textContent = "La contraseña debe tener al menos 8 caracteres";
//     validation = false;
// } else {
//     errorPassword.textContent = "";
// }

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
avatar: '../img/avatar/guest-300x300.webp',
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