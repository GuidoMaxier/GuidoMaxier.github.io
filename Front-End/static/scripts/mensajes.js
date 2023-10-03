class Mensaje {
  constructor(canalId, usuarioId, contenido, fecha) {
    this.canalId = canalId;
    this.usuarioId = usuarioId;
    this.contenido = contenido;
    this.fecha = fecha;
  }
}


async function cargarMensajesEnChat() {
  const chatElement = document.getElementById("chat");

  // ID del canal del que deseas cargar los mensajes
  // Reemplaza con el ID del canal deseado
  // const canalId = obtenerCanalId(); // Asegúrate de obtener el canalId de alguna manera

  try {
    // Realizar una solicitud al servidor para obtener los mensajes del canal
    const response = await fetch(`http://127.0.0.1:5000/mensaje/canal/${canalId}`);
    if (!response.ok) {
      throw new Error('Error al obtener mensajes');
    }
    const mensajes = await response.json();

    if (cantidadMensajes < mensajes.length){
      // Recorrer los mensajes y agregarlos al chat

      const chatContainer = document.getElementById('chat')

      chatContainer.innerHTML = '';

      cantidadMensajes = mensajes.length;

      for (const mensaje of mensajes) {
        try {
          const datosUsuario = await obtenerDatosUsuario(mensaje.usuario_id);

          const avatarSrc = datosUsuario.ruta_imagen_perfil;
          const userName = datosUsuario.username;
          const messageTime = mensaje.fecha;
          const messageText = mensaje.contenido;
          const id_mensaje = mensaje.id_mensaje;
        
          addMessage(avatarSrc, userName, messageText, messageTime, id_mensaje);

          // Desplázate al final del chat después de agregar un mensaje
          chatElement.scrollTop = chatElement.scrollHeight;


          
        } catch (error) {
          console.error(error);
        }
      }
  }

    // Desplázate al final del chat después de cargar todos los mensajes
    chatElement.scrollTop = chatElement.scrollHeight;
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
  }
}

  

 // Llama a la función cada 10 segundos
setInterval(cargarMensajesEnChat, 6000);


  // Llamar a la función para cargar los mensajes en el chat
// cargarMensajesEnChat();



// Función para obtener los datos del usuario desde la API y actualizar el formulario
async function obtenerDatosUsuario(idUsuario) {
  const url = `http://127.0.0.1:5000/${idUsuario}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error al obtener los datos del usuario desde la API');
    }

    const data = await response.json();

    // Actualiza los campos del formulario con los nuevos datos
    return data;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    throw error; // Puedes volver a lanzar el error para que sea manejado en un nivel superior si es necesario
  }
}

  

async function enviarMensaje(canalId, usuarioId, contenido, fecha) {
  const url = 'http://127.0.0.1:5000/mensaje/'; // Reemplaza con la URL correcta de tu backend

  // Crear un objeto con los datos del mensaje
  const mensajeData = {
    canal_id: canalId,
    usuario_id: usuarioId,
    contenido: contenido,
    fecha: fecha
  };

  console.log(mensajeData);

  // Configurar la solicitud POST
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mensajeData),
  };

  try {
    // Realizar la solicitud POST al servidor
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error('Error al enviar el mensaje al servidor');
    }
    const data = await response.json();

    // Los datos de respuesta desde el servidor, si los hay, estarán disponibles aquí
    await cargarMensajesEnChat();
    console.log('Mensaje enviado exitosamente:', data);
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
}


  async function eliminarMensaje(idMensaje) {
    try {
        // Mostrar un cuadro de diálogo de confirmación
        const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este mensaje? Esta acción no se puede deshacer.');

        if (confirmacion) {
            // Obtener el ID del usuario desde localStorage
            //const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;

            // Realizar la solicitud DELETE al backend con la URL correcta
            const response = await fetch(`http://127.0.0.1:5000/mensaje/${idMensaje}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                //alert('Entro?'+idMensaje)
                // Usuario eliminado exitosamente, redireccionar a index.html o realizar cualquier otra acción necesaria
                //localStorage.removeItem('userData');
                //window.location.href = "./index.html";
            } else {
                // Manejar errores aquí
                console.error('Error al eliminar el mensaje');
            }
        }
    } catch (error) {
        console.error('Error al comunicarse con el backend', error);
    }
}


async function editarMensaje(idMensaje, nuevoContenido) {
  try {
    // Mostrar un cuadro de diálogo de confirmación
    const confirmacion = window.confirm('¿Estás seguro de que quieres editar este mensaje? Esta acción no se puede deshacer.');

    if (confirmacion) {
      // URL para editar un mensaje específico
      const url = `http://127.0.0.1:5000/mensaje/${idMensaje}`;

      // Crear un objeto con los datos del mensaje editado
      const mensajeEditado = {
        contenido: nuevoContenido, // Aquí debes pasar el nuevo contenido del mensaje
      };

      // Configurar la solicitud PUT
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensajeEditado),
      };

      // Realizar la solicitud PUT al servidor
      const response = await fetch(url, requestOptions);

      if (response.status === 200) {
        // Mensaje editado exitosamente, realiza cualquier otra acción necesaria
        console.log('Mensaje editado exitosamente');
        cargarMensajesEnChat(); // Recarga los mensajes en el chat
      } else {
        // Manejar errores aquí
        console.error('Error al editar el mensaje');
      }
    }
  } catch (error) {
    console.error('Error al comunicarse con el backend', error);
  }
}
