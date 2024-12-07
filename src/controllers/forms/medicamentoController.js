import { guardarMedicamento } from "../../services/medicamentoService.js"

let nombreMedicamento = document.getElementById("nombreMedicamento")
let presentacionMedicamento = document.getElementById("presentacionMedicamento")
let dosisMedicamento = document.getElementById("dosisMedicamento")
let laboratorioMedicamento = document.getElementById("laboratorioMedicamento")
let fechaCaducidadMedicamento = document.getElementById("fechaCaducidadMedicamento")
let contraIndicacionesMedicamento = document.getElementById("contraindicacionesMedicamento")
let registroMedicamento = document.getElementById("registroMedicamento")
let tieneCopago = document.getElementById("tieneCopago")

let botonRegistroMedicamento = document.getElementById("botonRegistroMedicamento")

botonRegistroMedicamento.addEventListener("click", function (evento) {
    evento.preventDefault()

    let datosFormularioMedicamento = {
        nombre: nombreMedicamento.value,
        presentacion: presentacionMedicamento.value,
        dosis: dosisMedicamento.value,
        laboratorio: laboratorioMedicamento.value,
        fechaCaducidad: fechaCaducidadMedicamento.value,
        contraIndicaciones: contraIndicacionesMedicamento.value,
        registroInvima: registroMedicamento.value,
        copago: tieneCopago.checked
    }

    console.dir(datosFormularioMedicamento);
    console.error(validarDatos())
    if (validarDatos(datosFormularioMedicamento)) {
        guardarMedicamento(datosFormularioMedicamento)
            .then((respuesta) => {
                console.log(respuesta);
                Swal.fire({
                    title: "Registro exitoso",
                    text: "Ya eres parte de nuestra gran familia",
                    icon: "success",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
})

function validarDatos() {
    if (nombreMedicamento.value != "" && dosisMedicamento.value != "") {
        return true
    } else {
        Swal.fire({
            title: "Necesitas ingresar datos",
            text: "Ingresa correctamente los campos",
            icon: "error",
        });
        return false
    }
}