class Usuario {
    constructor(nombre, apellido, email, username, contraseña, fechaNacimiento, rutaImagenPerfil) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.username = username;
      this.contraseña = contraseña;
      this.fechaNacimiento = fechaNacimiento;
      this.rutaImagenPerfil = rutaImagenPerfil;
    }

  async registrar() {
    // Método para registrar un usuario
  }

  async iniciarSesion() {
      // Método para iniciar sesión de un usuario
      // Realizar solicitud fetch para iniciar sesión en el backend
      // Puedes enviar el nombre de usuario (username) y contraseña (contraseña) al backend
      const url = 'URL_DE_INICIO_DE_SESION'; // Reemplaza con la URL adecuada
      const datos = {
        username: this.username,
        contraseña: this.contraseña,
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });
  
      if (response.ok) {
        // La sesión se inició con éxito
        console.log('Sesión iniciada con éxito');
        // Puedes realizar acciones adicionales después de iniciar sesión
      } else {
        console.error('Error al iniciar sesión');
        // Puedes manejar el error de inicio de sesión aquí
      }
    }

  async obtenerInformacion() {
    // Método para obtener información del usuario
  }

  async actualizarPerfil() {
    // Método para actualizar el perfil del usuario
  }
}

export { Usuario };
