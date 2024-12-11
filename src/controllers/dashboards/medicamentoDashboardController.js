import { traerMedicamentos } from "../../services/medicamentoService.js"

document.addEventListener("DOMContentLoaded", () => {
    let captionTabla = document.querySelector("caption");
    traerMedicamentos()
        .then(function (respuestaBack) {
            console.log(respuestaBack)
            mostrarTabla(respuestaBack);
            if (respuestaBack.length != 0) {
                captionTabla.innerHTML = "Da click en la fila para ver detalles";
              } else {
                captionTabla.innerHTML = "La tabla no cuenta con registros";
              }
        })
        .catch(function (error) {
            console.error(error);
            captionTabla.innerHTML =
        "Hubo un error al traer la información desde el servidor 😕";
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