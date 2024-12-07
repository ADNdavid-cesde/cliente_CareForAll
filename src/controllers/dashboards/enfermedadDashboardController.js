import { traerEnfermedades } from "../../services/enfermedadService.js"

document.addEventListener("DOMContentLoaded", () => {
    traerEnfermedades()
        .then(function (respuestaBack) {
            console.log(respuestaBack)
            mostrarTabla(respuestaBack);
        })
        .catch(function (error) {
            console.error(error);
        })
})

function mostrarTabla(enfermedades) {
    let cuerpoTabla = document.querySelector("table tbody");
    cuerpoTabla.innerHTML = "";

    enfermedades.forEach((enfermedad) => {
        let fila = document.createElement("tr");
        fila.setAttribute("data-bs-toggle", "modal");
        fila.setAttribute("data-bs-target", "#ventanaModal");
        fila.setAttribute("id", `enf-${enfermedad.id}`);
        fila.innerHTML = `
            <td> ${enfermedad.nombre} </td>
            <td> ${enfermedad.sintomas} </td>
            <td> ${enfermedad.clasificacion} </td>
            <td> ${enfermedad.grado} </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

let cuerpoTabla = document.querySelector("table tbody");
cuerpoTabla.addEventListener("click", (event) => {
    console.log(event.target.parentElement.id)
    if (event.target.parentElement.id.startsWith("enf-")) {
        mostrarEnfermedadModal(event.target.parentElement.id.slice(4));
    }
})

function mostrarEnfermedadModal(id) {
    let nombreEnfermedad = document.getElementById("nombreEnfermedad")
    let sintomasEnfermedad = document.getElementById("sintomasEnfermedad")
    let clasificacionEnfermedad = document.getElementById("clasificacionEnfermedasd")
    let gradoEnfermdad = document.getElementById("gradoEnfermedad")
    let probabilidadVida = document.getElementById("probabilidadDeVida")


    traerEnfermedades()
        .then(function (respuestaBack) {
            console.log(respuestaBack);
            let enfermedad = respuestaBack.find((enfermedad) => enfermedad.id == id);
            nombreEnfermedad.textContent = enfermedad.nombre;
            sintomasEnfermedad.value = enfermedad.sintomas;
            clasificacionEnfermedad.value = enfermedad.clasificacion;
            gradoEnfermdad.value = enfermedad.grado;
            probabilidadVida.value = enfermedad.probabilidadVida;
        })
        .catch(function (error) {
            console.error(error);
        })
}