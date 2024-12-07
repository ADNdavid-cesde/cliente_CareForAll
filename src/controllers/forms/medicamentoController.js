import { registrarMedicamento } from "../../services/medicamentoService.js"

let nombreMedicamento = document.getElementById("nombreMedicamento")
let presentacionMedicamento = document.getElementById("presentacionMedicamento")
let dosisMedicamento = document.getElementById("dosisMedicamento")
let laboratorioMedicamento = document.getElementById("laboratorioMedicamento")
let fechaCaducidadMedicamento = document.getElementById("fechaCaducidadMedicamento")
let contraIndicacionesMedicamento = document.getElementById("contraindicacionesMedicamento")
console.log(contraIndicacionesMedicamento)
let registroMedicamento = document.getElementById("registroMedicamento")
let tieneCopago = document.getElementById("tieneCopago")

let botonRegistroMedicamento = document.getElementById("botonRegistroMedicamento")

botonRegistroMedicamento.addEventListener("click", function(evento) {
    evento.preventDefault()

    let datosFormularioMedicamento = {
        nombre: nombreMedicamento.value,
        presentacion: presentacionMedicamento.value,
        dosis: dosisMedicamento.value,
        laboratorio: laboratorioMedicamento.value,
        fechaCaducidad: fechaCaducidadMedicamento.value,
        contraIndicaciones: contraIndicacionesMedicamento.value,
        registroInvima: registroMedicamento.value,
        copago: true
    }

    console.log(datosFormularioMedicamento)
    registrarMedicamento(datosFormularioMedicamento)
    .then(function(respuestaBack){
        console.log(respuestaBack)
        Swal.fire({
            title: "Registro exitoso",
            text: "Ya eres parte de nuestra gran familia",
            icon: "success"
        })
    })
})