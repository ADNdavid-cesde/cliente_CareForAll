import { registrarEnfermedad } from "../../services/enfermedadService.js"

let nombreEnfermedad = document.getElementById("nombreEnfermedad")
let sintomasEnfermedad = document.getElementById("sintomasEnfermedad")
let clasificacionEnfermedad = document.getElementById("clasificacionEnfermedasd")
let gradoEnfermdad = document.getElementById("gradoEnfermedad")
let probabilidadVida = document.getElementById("probabilidadDeVida")

let botonRegistroEnfermedad = document.getElementById("botonRegistroEnfermedad")

botonRegistroEnfermedad.addEventListener("click", function(evento) {
    evento.preventDefault()

    let datosFormularioEnfermedad = {
        nombre: nombreEnfermedad.value,
        sintomas: sintomasEnfermedad.value,
        clasificacion: clasificacionEnfermedad.value,
        grado: gradoEnfermdad.value,
        probavilidadVida: probabilidadVida.value
    }

    console.log(datosFormularioEnfermedad)
    registrarEnfermedad(datosFormularioEnfermedad)
    .then(function(respuestaBack){
        console.log(respuestaBack)
        Swal.fire({
            title: "Registro exitoso",
            text: "Ya eres parte de nuestra gran familia",
            icon: "success"
        })
    });
})
