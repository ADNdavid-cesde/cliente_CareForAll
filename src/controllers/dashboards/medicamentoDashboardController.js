import { traerMedicamentos } from "../../services/medicamentoService.js"

document.addEventListener("DOMContentLoaded", () => {
    traerMedicamentos()
        .then(function (respuestaBack) {
            console.log(respuestaBack)
            mostrarTabla(respuestaBack);
        })
        .catch(function (error) {
            console.error(error);
        })
})

function mostrarTabla(medicamentos) {
    let cuerpoTabla = document.querySelector("table tbody");
    cuerpoTabla.innerHTML = "";

    medicamentos.forEach((medicamento) => {
        let fila = document.createElement("tr");
        fila.setAttribute("data-bs-toggle", "modal");
        fila.setAttribute("data-bs-target", "#ventanaModal");
        fila.setAttribute("id", `med-${medicamento.id}`);
        fila.innerHTML = `
            <td> ${medicamento.nombre} </td>
            <td> ${medicamento.laboratorio} </td>
            <td> ${medicamento.dosis} </td>
            <td> ${medicamento.fechaCaducidad} </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

let cuerpoTabla = document.querySelector("table tbody");
cuerpoTabla.addEventListener("click", (event) => {
    console.log(event.target.parentElement.id)
    if (event.target.parentElement.id.startsWith("med-")) {
        mostrarMedicamentoModal(event.target.parentElement.id.slice(4));
    }
})

function mostrarMedicamentoModal(id) {
    let nombreMedicamento = document.getElementById("nombremedicamento");
    let presentacion = document.getElementById("presentacionmedicamento");
    let dosis = document.getElementById("dosismedicamento");
    let laboratorio = document.getElementById("laboratoriomedicamento");
    let fechaCaducidad = document.getElementById("caducidadmedicamanto");
    let contraindicaciones = document.getElementById("contraindicacionesmedicamento");
    let regInvima = document.getElementById("invimamedicamento");
    let copago = document.getElementById("copagomedicamento");

    traerMedicamentos()
        .then(function (respuestaBack) {
            console.log(respuestaBack);
            let medicamento = respuestaBack.find((medicamento) => medicamento.id == id);
            nombreMedicamento.textContent = medicamento.nombre;
            presentacion.src = medicamento.presentacion;
            dosis.value = medicamento.dosis;
            laboratorio.value = medicamento.laboratorio;
            fechaCaducidad.value = medicamento.fechaCaducidad;
            contraindicaciones.value = medicamento.contraIndicaciones;
            regInvima.value = medicamento.registroInvima;
            copago.checked = medicamento.copago;
        })
        .catch(function (error) {
            console.error(error);
        })
}