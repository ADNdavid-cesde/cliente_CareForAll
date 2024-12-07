import{traerPacientes,guardarPaciente} from '../../services/pacienteService.js'

let nombrePaciente = document.getElementById("nombrepaciente");
let nacimietoPaciente = document.getElementById("nacimientopaciente");
let ciudadPaciente = document.getElementById("ciudadpaciente");
let correoPaciente = document.getElementById("correopaciente");
let telefonoPaciente = document.getElementById("telefonopaciente");
let ipsPaciente = document.getElementById("ipspaciente");
let grupoIngresosPaciente = document.getElementById("grupoingresospaciente");
let afiliacionPaciente = document.getElementById("afiiacionpaciente");
let polizaPaciente = document.getElementById("polizapaciente");

let botonRegistrarPaciente = document.getElementById("botonregistropaciente");

botonRegistrarPaciente.addEventListener("click", (evento) => {
  evento.preventDefault(); 

  let paciente = {
    nombre: nombrePaciente.value, 
    anioNacimiento: nacimietoPaciente.value,
    ciudad: ciudadPaciente.value,
    correo: correoPaciente.value,
    telefono: telefonoPaciente.value,
    ips: ipsPaciente.value,
    poliza: polizaPaciente.checked,
    grupoIngresos: grupoIngresosPaciente.value,
    fechaAfiliacion: afiliacionPaciente.value,
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
    if (nombrePaciente.value != "" && correoPaciente.value != "" && telefonoPaciente.value != "") {
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