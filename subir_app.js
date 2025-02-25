document.getElementById("appForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let version = document.getElementById("version").value;
    let descripcion = document.getElementById("descripcion").value;
    let logo = document.getElementById("logo").files[0]?.name || "";
    let captura = document.getElementById("captura").files[0]?.name || "";
    let apk = document.getElementById("apk").files[0]?.name || "";

    let nuevaApp = { nombre, version, descripcion, logo, captura, apk, estado: "pendiente" };

    fetch("datos.json")
        .then(response => response.json())
        .then(data => {
            data.push(nuevaApp);
            return fetch("datos.json", {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });
        })
        .then(() => {
            document.getElementById("modal").style.display = "block";
            setTimeout(() => document.getElementById("modal").style.display = "none", 1000);
        })
        .catch(error => console.error("Error al guardar:", error));
});
