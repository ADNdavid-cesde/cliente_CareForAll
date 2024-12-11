import { traerPacientes } from "../../services/pacienteService.js";

document.addEventListener("DOMContentLoaded", () => {
  let captionTabla = document.querySelector("caption");
  traerPacientes()
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

function mostrarTabla(pacientes) {
  let cuerpoTabla = document.querySelector("table tbody");
  cuerpoTabla.innerHTML = "";

  pacientes.forEach((paciente) => {
    let fila = document.createElement("tr");
    fila.setAttribute("data-bs-toggle", "modal");
    fila.setAttribute("data-bs-target", "#ventanaModal");
    fila.setAttribute("id", `pac-${paciente.id}`);
    fila.innerHTML = `
            <td> ${paciente.nombre} </td>
            <td> ${paciente.ips} </td>
            <td> ${paciente.grupoIngresos} </td>
            <td> ${paciente.fechaAfiliacion} </td>
        `;
    cuerpoTabla.appendChild(fila);
  });
}

let cuerpoTabla = document.querySelector("table tbody");
cuerpoTabla.addEventListener("click", (event) => {
  console.log(event.target.parentElement.id);
  if (event.target.parentElement.id.startsWith("pac-")) {
    mostrarPacienteModal(event.target.parentElement.id.slice(4));
  }
});

function mostrarPacienteModal(id) {
  let nombrePacienteH1 = document.getElementById("nombrePaciente");
  let ciudadPacienteInput = document.getElementById("ciudadPaciente");
  let telefonoPacienteInput = document.getElementById("telefonoPaciente");
  let correoPacienteInput = document.getElementById("correoPaciente");
  let grupoIngresosPacienteInput = document.getElementById(
    "grupoIngresosPaciente"
  );
  let ipsPacienteInput = document.getElementById("ipsPaciente");
  let nacimientoPacienteInput = document.getElementById("nacimientoPaciente");
  let afiliacionPacienteInput = document.getElementById("afiliacionPaciente");
  let polizaPacienteInput = document.getElementById("polizaPaciente");
  let listadoSignosVitales = document.getElementById("listaSignosVitales");

  listadoSignosVitales.innerHTML = "";

  traerPacientes()
    .then(function (respuestaBack) {
      console.log(respuestaBack);
      let paciente = respuestaBack.find((paciente) => paciente.id == id);
      nombrePacienteH1.textContent = paciente.nombre;
      ciudadPacienteInput.value = paciente.ciudad;
      telefonoPacienteInput.value = paciente.telefono;
      correoPacienteInput.value = paciente.correo;
      grupoIngresosPacienteInput.value = paciente.grupoIngresos;
      ipsPacienteInput.value = paciente.ips;
      nacimientoPacienteInput.value = paciente.anioNacimiento;
      afiliacionPacienteInput.value = paciente.fechaAfiliacion;
      polizaPacienteInput.checked = paciente.poliza;

      if (paciente.signosVitales.length != 0) {
        paciente.signosVitales.forEach((signoVital) => {
          let item = document.createElement("li");
          item.classList.add("list-group-item");
          item.textContent = signoVital.nombre + " -> " + signoVital.valor;

          listadoSignosVitales.appendChild(item);
        });
      } else {
        let item = document.createElement("li");
        item.classList.add("list-group-item");
        item.textContent = "El paciente no ha registrado información.";

        listadoSignosVitales.appendChild(item);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}
