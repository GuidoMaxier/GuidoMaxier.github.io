
const { createApp } = Vue;
createApp({
  data() {
    return {
        equipos : [],
        api_server:"http://127.0.0.1:8000",
        id_equipo:'',
        nombre:'',
        deporte: '',
        logo:''
    };
  },
  methods: {

    sendFormData(url, formData,method) {
        fetch(url, {
          method: method,
          body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            Swal.fire({
                icon: 'success',
                title: '¡Registro creado exitosamente!',
                text: '¡Bien hecho!',
              });

            this.getEquipos(`${this.api_server}/api/equipos`);
        })
        .catch((error) => {
            console.error("Error al enviar el formulario:", error);
        });
    },
    onFileChange(event) {
        // Manejar el cambio en el input de tipo file
        this.logo = event.target.files[0];
    },

    getEquipos() {
      fetch(`${this.api_server}/api/equipos`)
        .then((response) => response.json())
        .then((data) => {
          this.equipos = data;
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },

    getEquipo(id_equipo) {
        fetch(`${this.api_server}/api/equipo/${id_equipo}/`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            this.id_equipo = data.id;
            this.nombre = data.nombre;
            this.deporte = data.deporte,
            console.log(data);
        })
        .catch((error) => {
            console.error("Error al enviar el formulario:", error);
        });
    },
   
    saveEquipo() {
        const formData = new FormData();
        formData.append('nombre', this.nombre);
        formData.append('deporte', this.deporte);
        formData.append('logo', this.logo);
        if(this.id_equipo){
            this.sendFormData(`${this.api_server}/api/update_equipo/${this.id_equipo}/`, formData,'PUT');
        }else{
            this.sendFormData(`${this.api_server}/api/create_equipo/`, formData,'POST');
        }
    },

    deleteEquipo(id_equipo) {
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'Esta acción eliminará el registro de forma permanente.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminarlo',
          cancelButtonText: 'Cancelar',
          customClass: {
            container: 'custom-swal-modal'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            // eliminar el registro
            fetch(`${this.api_server}/api/delete_equipo/${id_equipo}/`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((data) => {
                
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro eliminado!',
                    text: 'El registro ha sido eliminado exitosamente.',
                  });
    
    
                this.getEquipos(`${this.api_server}/api/equipos`);
            })
            .catch((error) => {
                console.error("Error al eliminar", error);
            });
    
          }
        });
      },

  },
  created() {
    this.getEquipos();
  },
}).mount("#app");



