let totalHoy = 0;
let totalSemana = 0;
let servicios = {};
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

function guardarDatos() {
    localStorage.setItem("turnos", JSON.stringify(turnos));
}

function cargarDatos() {
    turnos.forEach(turno => {
        mostrarTurno(turno);
        totalHoy += turno.precio;
        totalSemana += turno.precio;

        if (servicios[turno.servicio]) {
            servicios[turno.servicio]++;
        } else {
            servicios[turno.servicio] = 1;
        }
    });

    actualizarTotales();
}

function actualizarTotales() {
    document.getElementById("total").textContent = totalHoy;
    document.getElementById("totalSemana").textContent = totalSemana;

    let masVendido = "";
    let max = 0;

    for (let s in servicios) {
        if (servicios[s] > max) {
            max = servicios[s];
            masVendido = s;
        }
    }

    document.getElementById("masVendido").textContent = masVendido || "Ninguno";
}

function mostrarTurno(turno) {
    let lista = document.getElementById("listaTurnos");
    let nuevoTurno = document.createElement("div");
    nuevoTurno.classList.add("turno");
    nuevoTurno.innerHTML = `
        <strong>${turno.nombre}</strong> - ${turno.servicio}<br>
        ${turno.fecha} - ${turno.hora}<br>
        $${turno.precio}
    `;
    lista.appendChild(nuevoTurno);
}

function agregarTurno(precio, servicio) {
    let nombre = document.getElementById("nombre").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;

    if (nombre === "" || fecha === "" || hora === "") {
        alert("Completá todos los campos");
        return;
    }

    let turno = { nombre, fecha, hora, servicio, precio };

    turnos.push(turno);
    guardarDatos();

    totalHoy += precio;
    totalSemana += precio;

    if (servicios[servicio]) {
        servicios[servicio]++;
    } else {
        servicios[servicio] = 1;
    }

    mostrarTurno(turno);
    actualizarTotales();

    document.getElementById("nombre").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
}

cargarDatos();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}