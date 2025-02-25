fetch("datos.json")
    .then(response => response.json())
    .then(data => {
        let listaApps = document.getElementById("listaApps");
        listaApps.innerHTML = "";
        data.forEach((app, index) => {
            let appHTML = `
                <div class="app-card">
                    <h3>${app.nombre} (v${app.version})</h3>
                    <p>${app.descripcion}</p>
                    <button onclick="verApp(${index})">Ver</button>
                    <button onclick="cambiarEstado(${index}, 'aceptado')">Aceptar</button>
                    <button onclick="cambiarEstado(${index}, 'rechazado')">Rechazar</button>
                    <button onclick="eliminarApp(${index})">Eliminar</button>
                </div>
            `;
            listaApps.innerHTML += appHTML;
        });
    });

function verApp(index) {
    fetch("datos.json")
        .then(response => response.json())
        .then(data => {
            let app = data[index];
            alert(`Nombre: ${app.nombre}\nDescripción: ${app.descripcion}\nAPK: ${app.apk}`);
        });
}

function cambiarEstado(index, estado) {
    fetch("datos.json")
        .then(response => response.json())
        .then(data => {
            data[index].estado = estado;
            return fetch("datos.json", {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });
        })
        .then(() => alert(`Aplicación ${estado}`));
}

function eliminarApp(index) {
    fetch("datos.json")
        .then(response => response.json())
        .then(data => {
            data.splice(index, 1);
            return fetch("datos.json", {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });
        })
        .then(() => alert("Aplicación eliminada"));
}
