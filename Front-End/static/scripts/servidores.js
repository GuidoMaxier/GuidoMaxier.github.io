class Servidor {
  constructor(nombre, descripcion, fechaCreacion) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaCreacion = fechaCreacion;
  }
}



// window.addEventListener('load', function () {
//   // Comprobar si `userData` está en localStorage y contiene datos del usuario
//   const storedUserData = localStorage.getItem('userData');
  
//   if (storedUserData) {
//       const userData = JSON.parse(storedUserData);
//       // Obtener el ID de usuario
//       const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;
//       cargarServidores(idUsuario);

//   } else {
//       // Si no se encuentra userData en localStorage, redirigir al usuario a la página de inicio de sesión
//      // alert("Esta siendo redireccionado...");
//       window.location.href = "/Front-End/templates/index.html";
//   }
// });

// Obtener el elemento con la clase "server_name"
const serverNameElement = document.querySelector('.server_name');

// Cambiar el contenido del elemento a la nueva palabra
serverNameElement.querySelector('p').textContent = 'Servidor';

////////////// READ SERVIDORES //////////////////////////
async function cargarServidores(idUsuario) {
  try {
    // Limpiar la lista de servidores existentes
    serverList.innerHTML = '';

    const response = await fetch(`http://127.0.0.1:5000/servidor/user/${idUsuario}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error al obtener la lista de servidores');
    }

    const data = await response.json();

    // La respuesta del servidor con la lista de servidores se encuentra en 'data'
    const servers = data;

    if (Array.isArray(data) && data.length > 0) {
      noShowServers();
    }

    // Recorrer la lista de servidores y crear elementos HTML para cada uno de ellos
    servers.forEach((server) => {
      const newServerItem = document.createElement('div');
      newServerItem.classList.add('profile1');

      // Almacenar el id_servidor como un atributo personalizado
      newServerItem.dataset.serverId = server.id_servidor;

      const serverIcon = document.createElement('p');
      serverIcon.textContent = server.nombre[0];

      const whiteLine = document.createElement('div');
      whiteLine.classList.add('white_line');

      const hoverText = document.createElement('div');
      hoverText.classList.add('hover');
      hoverText.textContent = server.nombre;

      newServerItem.appendChild(serverIcon);
      newServerItem.appendChild(whiteLine);
      newServerItem.appendChild(hoverText);

      // Agregar el nuevo servidor a la lista de servidores en el frontend
      serverList.appendChild(newServerItem);

      // Agregar un evento click al nuevo servidor
      newServerItem.addEventListener('click', async (event) => {
        serverId = event.currentTarget.dataset.serverId;

        await cargarCanales(serverId);

        // Obtener el elemento con la clase "server_name"
        const serverNameElement = document.querySelector('.server_name');

        // Cambiar el contenido del elemento a la nueva palabra
        serverNameElement.querySelector('p').textContent = server.nombre;

        toggleChannelColumnVisibility();

        // Imprime el valor en la consola o haz lo que necesites con él
        console.log('Valor de data-server-id:', serverId);
      });
    });
  } catch (error) {
    console.error(error.message); // Maneja errores si ocurrieron
  }
}




  ////////////////// CREATE SERVIDORES //////////////////////

async function crearServidor(serverData) {
  try {
    console.log(serverData);

    // Realiza la solicitud HTTP POST al backend
    const response = await fetch('http://127.0.0.1:5000/servidor/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serverData),
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        console.error(errorData.message); // Muestra el mensaje de error del backend
        alert(errorData.message);
      } else {
        throw new Error('Error al crear el servidor');
      }
    } else {
      const data = await response.json();
      console.log(data.message); // Muestra el mensaje de éxito en la consola
      await cargarServidores(serverData.id_usuario);
      // Aquí puedes realizar cualquier otra acción después de crear el servidor con éxito
    }
  } catch (error) {
    console.error(error.message); // Maneja otros errores si ocurren
  }
}



async function buscarServidores(buscador) {
  try {
    // Limpiar la lista de servidores existentes
    serverListSearch.innerHTML = '';

    // Crear un objeto de datos con la frase de búsqueda
    const searchData = {
      busqueda: buscador
    };

    const response = await fetch('http://127.0.0.1:5000/servidor/buscar-servidores/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchData)
    });

    if (!response.ok) {
      throw new Error('Error al obtener la lista de servidores');
    }

    const servers = await response.json();

    
    
    // Recorrer la lista de servidores y crear elementos HTML para cada uno de ellos
      servers.forEach((server) => {

      const newServerItem = document.createElement('div');
      newServerItem.classList.add('photoIMG');

      // Almacenar el id_servidor como un atributo personalizado
      newServerItem.dataset.serverId = server.id_servidor;


      const serverImg = document.createElement('img');
      serverImg.src = "https://th.bing.com/th/id/R.11991d9b6e676d00ecfcf8c537c8667b?rik=CIiipjJChLiomw&pid=ImgRaw&r=0";

      const serverIcon = document.createElement('p');
      serverIcon.textContent = server.nombre.substring(0, 7);

      // const whiteLine = document.createElement('div');
      // whiteLine.classList.add('white_line');

      const hoverText = document.createElement('div');
      hoverText.classList.add('hover');
      hoverText.textContent = server.nombre;

      newServerItem.appendChild(serverIcon);
      // newServerItem.appendChild(whiteLine);
      newServerItem.appendChild(serverImg);
      newServerItem.appendChild(hoverText);
  

      // Agregar el nuevo servidor a la lista de servidores en el frontend
      serverListSearch.appendChild(newServerItem);

      // Agregar un evento click al nuevo servidor
      newServerItem.addEventListener('click', async (event) => {
        serverId_S = event.currentTarget.dataset.serverId;

        openModal(server.nombre);

        // Imprime el valor en la consola o haz lo que necesites con él
        console.log('Valor de data-server-id:', serverId_S);
      });
    });
  } catch (error) {
    console.error(error.message); // Maneja errores si ocurrieron
  }
}


    //if (Array.isArray(data) && data.length > 0) {
      //noShowServers();
    //} else {
      // Mostrar un mensaje cuando no se encuentran servidores
      //showNoResultsMessage();
    //}

    // Resto del código para mostrar los servidores, igual que antes
    // ...
  //} catch (error) {
    //console.error(error.message); // Maneja errores si ocurrieron
  //}
//}


// Función para mostrar un mensaje cuando no se encuentran servidores
function showNoResultsMessage() {
  const noResultsMessage = document.createElement('p');
  noResultsMessage.textContent = 'No se encontraron servidores con esa frase de búsqueda.';
  serverList.appendChild(noResultsMessage);
}


async function joinServer() {
  try {

     const idUsuario = JSON.parse(localStorage.getItem('userData')).id_usuario;
        // Crear un objeto con los datos a enviar
            const data = {
              usuario_id: idUsuario,
              servidor_id: serverId_S,
              rol: 'usuario'
          };
      // Realizar la solicitud de fetch aquí
      const response = await fetch("/userserver/join_server", {
          method: "POST", // O el método HTTP adecuado
          headers: {
              "Content-Type": "application/json"
              // Puedes agregar otros encabezados si es necesario
          },
          body: JSON.stringify(data) // Ajusta los datos según tus necesidades
      });

      if (response.status === 200) {
          // Puedes procesar la respuesta si es necesario
          return response.json();
      } else {
          throw new Error("Error al unirse al servidor");
      }
  } catch (error) {
      throw error; // Propaga el error para que se maneje en la función `confirmation`
  }
}