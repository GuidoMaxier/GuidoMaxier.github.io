var inputs = document.getElementsByClassName('formulario__input');
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', function () {
        if(this.value.length>=1) {
            this.nextElementSibling.classList.add('fijar');
        } else {
            this.nextElementSibling.classList.remove('fijar');
        }
    });
}

var texts = document.getElementsByClassName('.formulario__text');
for (let i = 0; i < texts.length; i++) {
    texts[i].addEventListener('keyup', function () {
        if(this.value.length>=1) {
            this.nextElementSibling.classList.add('fijar');
        } else {
            this.nextElementSibling.classList.remove('fijar');
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contacto-form");
    const nombres = document.getElementById("nombres");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const mensaje = document.getElementById("mensaje");
    const mensajeEnviado = document.getElementById("mensaje-enviado");


    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (validarFormulario()) {
            mostrarMensajeEnviado();
            form.reset();
        }
    });

    function validarFormulario() {
        let valido = true;
    
        // Validación del nombre (mínimo 4 caracteres)
        if (nombres.value.trim() === "" || nombres.value.length < 4) {
            mostrarError(nombres, "Nombres debe tener al menos 4 caracteres");
            nombres.value = ""
            valido = false;
        } else {
            mostrarError(nombres, null);
        }
    
        // Validación del correo electrónico
        if (correo.value.trim() === "" || !esCorreoValido(correo.value)) {
            mostrarError(correo, "Ingresa un correo válido");
            correo.value = ""
            valido = false;
        } else {
            mostrarError(correo, null);
        }
    
        // Validación del número de teléfono para Argentina
        if (telefono.value.trim() !== "" && !esTelefonoValidoArgentina(telefono.value)) {
            mostrarError(telefono, "Ingresa un nro de teléfono válido en Argentina");
            telefono.value = ""
            valido = false;
        } else {
            mostrarError(telefono, null);
        }
    
        // Puedes agregar más validaciones para el mensaje si es necesario.
    
        return valido;
    }
    
    function esTelefonoValidoArgentina(telefono) {
        // Valida que el número de teléfono tenga el formato adecuado para Argentina (puedes ajustar la expresión regular según tus necesidades).
        const expresionRegular = /^\+54\d{2,3}\d{4}\d{4}$/;
        return expresionRegular.test(telefono);
    }
    
    function esCorreoValido(correo) {
        // Puedes usar una expresión regular para validar el formato del correo electrónico.
        // Aquí se muestra un ejemplo simple.
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(correo);
    }

    function mostrarError(input, mensaje) {
        const campo = input.parentElement;
        const error = campo.querySelector(".error");
        if (mensaje) {
            campo.classList.add("error");
            error.innerText = mensaje;
        } else {
            campo.classList.remove("error");
            error.innerText = "";
        }
    }

    function mostrarMensajeEnviado() {
        mensajeEnviado.innerText = "El formulario se ha enviado correctamente. ¡Gracias!";
    }
});
