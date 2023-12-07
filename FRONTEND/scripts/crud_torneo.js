const API_SERVER = 'http://127.0.0.1:8000';

// Función para realizar la petición fetch
async function fetchData(url, method, data = null) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  };

  const response = await fetch(url, options);
  return await response.json();
}

async function fetchDataWithFile(url, method, formData) {
  const options = {
    method: method,
    body: formData,
  };

  const response = await fetch(url, options);
  return await response.json();
}

//EQUIPOS
document.getElementById('btn-add-equipo').addEventListener('click', async function () {
  const idEquipo = document.querySelector('#id_equipo');
  const nameTeam = document.querySelector('#nameTeam').value;
  const deporte = document.querySelector('#deporte').value;
  
  //manejo de archivos
  const bannerFileInput = document.querySelector('#banner-form');
  const banner = bannerFileInput.files[0];

  const formData = new FormData();
  formData.append('nombre', nameTeam);
  formData.append('logo', banner);
  formData.append('deporte', deporte);
  let result = null;
  if (idEquipo.value !== "") {
    result = await fetchDataWithFile(`${API_SERVER}/api/update_equipo/${idEquipo.value}/`, 'PUT', formData);
  } else {
    result = await fetchDataWithFile(`${API_SERVER}/api/create_equipo/`, 'POST', formData);
  }
  const formEquipo = document.querySelector('#form-equipo');
  idEquipo.value = ''
  formEquipo.reset();
  alert(result.message);

  showEquiposTable();
});

/**
 * Funcion que permite crear un elemento <tr> para la tabla de equipos
 * por medio del uso de template string de JS.
 */
async function showEquiposTable() {
  let equipos = await fetchData(API_SERVER + '/api/equipos/', 'GET');
  console.log(equipos)
  const tableEquipos = document.querySelector('#list-table-equipos tbody');
  tableEquipos.innerHTML = '';
  equipos.forEach((equipo, index) => {
    
    let deporte;

    switch (equipo.deporte) {
      case 1:
        deporte = "PADDEL";
        break;
      case 2:
        deporte = "TENIS";
        break;
      case 3:
        deporte = "FUTBOL";
        break;
      default:
        deporte = "Desconocido";
    }

    let tr = `<tr>
                    <td>${equipo.nombre}</td>
                    <td>${deporte}</td>
                    <td>
                         <img src="${API_SERVER + equipo.logo}" width="30px">
                    </td>
                    <td>
                        <button class="btn-cac" onclick='updateEquipo(${equipo.id})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-cac" onclick='deleteEquipo(${equipo.id})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
    tableEquipos.insertAdjacentHTML("beforeend", tr);
  });
}

/**
 * Function que permite eliminar un equipo del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
async function deleteEquipo(id) {
  let response = await fetchData(`${API_SERVER}/api/delete_equipo/${id}/`, 'DELETE');
  console.log(response);
  showEquiposTable();
}

/**
 * Function que permite eliminar un equipo del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 *
 */

async function updateEquipo(id) {
  let response = await fetchData(`${API_SERVER}/api/update_equipo/${id}/`, 'GET');


  const idEquipo = document.querySelector('#id_equipo');
  const nameTeam = document.querySelector('#nameTeam');
  const deporte = document.querySelector('#deporte');


  idEquipo.value = response.id;
  nameTeam.value = response.nameTeam;
  deporte.value = response.deporte;
}

showEquiposTable();


/**
  //JUGADORES

  document.getElementById('btn-add-jugador').addEventListener('click', async function () {
    const idJugador = document.querySelector('#id_jugador');
    const namePlayer = document.querySelector('#namePlayer').value;
    const dni= document.querySelector('#dni').value;
    const date= document.querySelector('#date').value;


    const formData = new FormData();
    formData.append('namePlayer', namePlayer);
    formData.append('dni', dni);
    formData.append('date', date);
    let result = null;
    if(idJugador.value!==""){
      result = await fetchDataWithFile(`${API_SERVER}/api/update_jugador/${idJugador.value}/`, 'PUT', formData);
    }else{
      result = await fetchDataWithFile(`${API_SERVER}/api/create_jugador/`, 'POST', formData);
    }
    const formJugador = document.querySelector('#form-jugador');
    idJugador.value=''
    formJugador.reset();
    alert(result.message);

    showJugadoresTable();
});

  /**
   * Funcion que permite crear un elemento <tr> para la tabla de jugadores
   * por medio del uso de template string de JS.*/
/**
async function showJugadoresTable(){
 let jugadores =  await fetchData(API_SERVER+'/api/jugador/', 'GET');
 const tableJugadores = document.querySelector('#list-table-jugadores tbody');
 tableJugadores.innerHTML='';
 jugadores.forEach((jugador, index) => {
   let tr = `<tr>
                 <td>${jugador.namePlayer}</td>
                 <td>${jugador.dni}</td>
                 <td>${jugador.date}</td>
                 <td>
                     <button class="btn-cac" onclick='updateJugador(${jugador.id})'><i class="fa fa-pencil" ></button></i>
                     <button class="btn-cac" onclick='deleteJugador(${jugador.id})'><i class="fa fa-trash" ></button></i>
                 </td>
               </tr>`;
   tableJugadores.insertAdjacentHTML("beforeend",tr);
 });
}
 
/**
* Function que permite eliminar un jugador del array del localstorage
* de acuedo al indice del mismo
* @param {number} id posición del array que se va a eliminar
 
async function deleteJugador(id){
 let response = await fetchData(`${API_SERVER}/api/delete_jugador/${id}/`, 'DELETE');
 console.log(response);
 showJugadoresTable();
}
*/
/**
 * Function que permite eliminar un jugador del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
/**
async function updateJugador(id){
  let response = await fetchData(`${API_SERVER}/api/jugadores/${id}/`, 'GET');
  const idJugador = document.querySelector('#id_jugador');
  const namePlayer = document.querySelector('#namePlayer');
  const dni = document.querySelector('#dni');
  const date = document.querySelector('#date');
  
  idJugador.value = response.id;
  namePlayer.value = response.namePlayer;
  dni.value = response.dni;
  date.value = response.date;
}

showJugadoresTable();*/