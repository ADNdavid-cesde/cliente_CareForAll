import{guardarSignoVital} from '../../services/signoVitalService.js';
import{traerPacientes} from '../../services/pacienteService.js';

let inputNombreSignoVital = document.getElementById("nombreSignoVital");
let inputFechaToma = document.getElementById("fechaTomaSignoVital");
let inputValor = document.getElementById("valorSignoVital");
let inputPaciente = document.getElementById("nombrePacienteSignoVital");

let botonRegistrarMedico = document.getElementById("botonRegistroSignoVital");

botonRegistrarMedico.addEventListener("click", (evento) => {
  evento.preventDefault();

    let signoVital = {
        nombre: inputNombreSignoVital.value,
        valor: inputValor.value,
        fechaMedida: inputFechaToma.value,
        fk_paciente: inputPaciente.value
    };

    console.dir(signoVital);
    console.error(validarDatos())
    if (validarDatos()) {
        guardarSignoVital(signoVital)
    .then((respuesta) => {
      console.log(respuesta);
      Swal.fire({
        title: "Registro exitoso",
        text: "Vuelve pronto",
        icon: "success",
      });
      //limpiarFormulario();
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
});

function validarDatos(){
    if (inputNombreSignoVital.value != "" && inputPaciente.value != "" && inputValor.value != "" && inputFechaToma.value != "") {
        return true
    }else{
        Swal.fire({
            title: "Necesitas ingresar datos",
            text: "Ingresa correctamente los campos",
            icon: "error",
          });
        return false
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    traerPacientes()
    .then((respuesta)=>{
        respuesta.forEach((paciente)=>{
            let optionPaciente = document.createElement("option");
            optionPaciente.textContent = paciente.nombre;
            optionPaciente.value = paciente.id;

            inputPaciente.appendChild(optionPaciente);
        });
    })
    .catch((error) => {
        console.log(error);
      });
});