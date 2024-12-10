import{guardarMedico} from '../../services/medicoService.js';

let nombreMedico=document.getElementById("nombremedico");
let matriculaProfesionalMedico=document.getElementById("matriculamedico");
let especialidadMedico=document.getElementById("especialidadmedico");
let salarioMedico=document.getElementById("salariomedico");
let ipsMedico=document.getElementById("ipsmedico");
let correoMedico=document.getElementById("correomedico");
let telefonoMedico=document.getElementById("telefonomedico");
let direccionMedico=document.getElementById("direccionmedico");
let disponibleFinDeSemanaMedico=document.getElementById("disponibilidadmedico");

let botonRegistrarMedico = document.getElementById("botonregistromedico");

botonRegistrarMedico.addEventListener("click", (evento) => {
  evento.preventDefault();

    let medico = {
    nombre:nombreMedico.value,
    matriculaProfesional:matriculaProfesionalMedico.value,
    especialidad:especialidadMedico.value,
    salario:salarioMedico.value,
    ips:ipsMedico.value,
    correo:correoMedico.value,
    telefono:telefonoMedico.value,
    direccionConsultorio:direccionMedico.value,
    finDeSemanaDisponible: disponibleFinDeSemanaMedico.checked
    };

    console.dir(medico);
    console.error(validarDatos())
    if (validarDatos()) {
        guardarMedico(medico)
    .then((respuesta) => {
      console.log(respuesta);
      Swal.fire({
        title: "Registro exitoso",
        text: "Bienvenido",
        icon: "success",
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
});

function validarDatos(){
    if (nombreMedico.value != "" && correoMedico.value != "" && telefonoMedico.value != "") {
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
