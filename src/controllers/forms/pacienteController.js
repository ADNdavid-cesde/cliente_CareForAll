import{guardarPaciente} from '../../services/pacienteService.js';
import{traerMedicos} from '../../services/medicoService.js';

let nombrePaciente = document.getElementById("nombrepaciente");
let nacimientoPaciente = document.getElementById("nacimientopaciente");
let ciudadPaciente = document.getElementById("ciudadpaciente");
let correoPaciente = document.getElementById("correopaciente");
let telefonoPaciente = document.getElementById("telefonopaciente");
let ipsPaciente = document.getElementById("ipspaciente");
let grupoIngresosPaciente = document.getElementById("grupoingresospaciente");
let afiliacionPaciente = document.getElementById("afiliacionpaciente");
let polizaPaciente = document.getElementById("polizapaciente");
let selectMedicoResponsable = document.getElementById("nombreMedicoResponsable");

let botonRegistrarPaciente = document.getElementById("botonregistropaciente");

botonRegistrarPaciente.addEventListener("click", (evento) => {
  evento.preventDefault(); 

  let paciente = {
    nombre: nombrePaciente.value, 
    anioNacimiento: nacimientoPaciente.value,
    ciudad: ciudadPaciente.value,
    correo: correoPaciente.value,
    telefono: telefonoPaciente.value,
    ips: ipsPaciente.value,
    poliza: polizaPaciente.checked,
    grupoIngresos: grupoIngresosPaciente.value,
    fechaAfiliacion: afiliacionPaciente.value,
    medico:{
      id: selectMedicoResponsable.value,
    }
  };

  
  console.dir(paciente);
  console.error(validarDatos())
  if (validarDatos()) {
        guardarPaciente(paciente)
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
  
});

function validarDatos(){
    if (nombrePaciente.value != "" && correoPaciente.value != "" && telefonoPaciente.value != "" && selectMedicoResponsable.value != "") {
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
  traerMedicos()
  .then((respuesta)=>{
      respuesta.forEach((medico)=>{
          let optionMedico = document.createElement("option");
          optionMedico.textContent = medico.nombre;
          optionMedico.value = medico.id;

          selectMedicoResponsable.appendChild(optionMedico);
      });
  })
  .catch((error) => {
      console.log(error);
    });
});

nacimientoPaciente.type = "text";
nacimientoPaciente.addEventListener("focus", ()=>{
  nacimientoPaciente.type = "date";
});
nacimientoPaciente.addEventListener("blur", ()=>{
  if (nacimientoPaciente.value == "") {
    nacimientoPaciente.type = "text";    
  }
});

afiliacionPaciente.type = "text";
afiliacionPaciente.addEventListener("focus", ()=>{
  afiliacionPaciente.type = "date";
});
afiliacionPaciente.addEventListener("blur", ()=>{
  if (afiliacionPaciente.value == "") {
    afiliacionPaciente.type = "text";    
  }
});