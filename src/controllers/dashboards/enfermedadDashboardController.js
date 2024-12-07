import { buscarEnfermedades } from "../../services/enfermedadService.js"
buscarEnfermedades()
.then(function(respuestaBack){
    console.log(respuestaBack)
    let fila = document.getElementById("fila")

    respuestaBack.forEach(function(enfermedad){
    console.log(enfermedad)
    let columna = document.createElement("div")
    columna.classList.add("col")

    let tarjeta = document.createElement("div")
    tarjeta.classList.add("card", "p-5", "h-100", "shadow")

    let nombre = document.createElement("h2")
    nombre.textContent = enfermedad.nombre

    tarjeta.appendChild(nombre)
    columna.appendChild(tarjeta)
    fila.appendChild(columna)
})
})