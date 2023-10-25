document.addEventListener("DOMContentLoaded", function () {
    // Simula la carga de datos desde un archivo JSON
    fetch("../assets/estadisticas.json")
        .then(response => response.json())
        .then(data => {
            mostrarEstadisticas(data);
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
    
    function mostrarEstadisticas(data) {
        const estadisticasContainer = document.getElementById("estadisticas-container");
        
        const torneoTitle = document.createElement("h2");
        torneoTitle.textContent = `Torneo: ${data.torneo}`;
        
        estadisticasContainer.appendChild(torneoTitle);

        const tabla = document.createElement("table");
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>Equipo</th>
                    <th>Partidos Jugados</th>
                    <th>Victorias</th>
                    <th>Empates</th>
                    <th>Derrotas</th>
                    <th>Goles a Favor</th>
                    <th>Goles en Contra</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        estadisticasContainer.appendChild(tabla);
        const tbody = tabla.querySelector("tbody");

        data.equipos.forEach(equipo => {
            const filaEquipo = document.createElement("tr");
            filaEquipo.innerHTML = `
                <td>${equipo.nombre}</td>
                <td>${equipo.partidosJugados}</td>
                <td>${equipo.victorias}</td>
                <td>${equipo.empates}</td>
                <td>${equipo.derrotas}</td>
                <td>${equipo.golesFavor}</td>
                <td>${equipo.golesContra}</td>
            `;
            tbody.appendChild(filaEquipo);
        });
    }
});

