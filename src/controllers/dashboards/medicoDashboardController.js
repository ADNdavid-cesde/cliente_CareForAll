import { traerMedicos } from "../../services/medicoService.js";

document.addEventListener("DOMContentLoaded", () => {
  let captionTabla = document.querySelector("caption");
  traerMedicos()
    .then(function (respuestaBack) {
      console.log(respuestaBack);
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
    });
});

function mostrarTabla(medicos) {
  let cuerpoTabla = document.querySelector("table tbody");
  cuerpoTabla.innerHTML = "";

  medicos.forEach((medico) => {
    let fila = document.createElement("tr");
    fila.setAttribute("data-bs-toggle", "modal");
    fila.setAttribute("data-bs-target", "#ventanaModal");
    fila.setAttribute("id", `med-${medico.id}`);
    fila.innerHTML = `
            <td> ${medico.nombre} </td>
            <td> ${medico.especialidad} </td>
            <td> ${medico.ips} </td>
            <td> ${medico.telefono} </td>
        `;
    cuerpoTabla.appendChild(fila);
  });
}

let cuerpoTabla = document.querySelector("table tbody");
cuerpoTabla.addEventListener("click", (event) => {
  console.log(event.target.parentElement.id);
  if (event.target.parentElement.id.startsWith("med-")) {
    mostrarMedicoModal(event.target.parentElement.id.slice(4));
  }
});

function mostrarMedicoModal(id) {
  let nombreMedico = document.getElementById("nombremedico");
  let matriculaProfesionalMedico = document.getElementById("matriculamedico");
  let especialidadMedico = document.getElementById("especialidadmedico");
  let salarioMedico = document.getElementById("salariomedico");
  let ipsMedico = document.getElementById("ipsmedico");
  let correoMedico = document.getElementById("correomedico");
  let telefonoMedico = document.getElementById("telefonomedico");
  let direccionMedico = document.getElementById("direccionmedico");
  let disponibleFinDeSemanaMedico = document.getElementById(
    "disponibilidadmedico"
  );
  let listadoPacientes = document.getElementById("listaPacientes");

  listadoPacientes.innerHTML = "";

  traerMedicos()
    .then(function (respuestaBack) {
      console.log(respuestaBack);
      let medico = respuestaBack.find((medico) => medico.id == id);
      nombreMedico.textContent = medico.nombre;
      especialidadMedico.value = medico.especialidad;
      ipsMedico.value = medico.ips;
      matriculaProfesionalMedico.value = medico.matriculaProfesional;
      salarioMedico.value = medico.salario;
      correoMedico.value = medico.correo;
      telefonoMedico.value = medico.telefono;
      direccionMedico.value = medico.direccionConsultorio;
      disponibleFinDeSemanaMedico.checked = medico.finDeSemanaDisponible;

      if (medico.pacientes.length != 0) {
        medico.pacientes.forEach((paciente) => {
          let item = document.createElement("li");
          item.classList.add("list-group-item");
          item.textContent = paciente.nombre;

          listadoPacientes.appendChild(item);
        });
      } else {
        let item = document.createElement("li");
        item.classList.add("list-group-item");
        item.textContent = "El medico no tiene pacientes a su cargo.";

        listadoPacientes.appendChild(item);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}
