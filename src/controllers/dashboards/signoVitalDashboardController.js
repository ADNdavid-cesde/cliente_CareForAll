import { traerSignosVitales } from "../../services/signoVitalService.js";

document.addEventListener("DOMContentLoaded", () => {
  let captionTabla = document.querySelector("caption");
  traerSignosVitales()
    .then(function (respuestaBack) {
      console.log(respuestaBack);
      mostrarTabla(respuestaBack);
      if (respuestaBack.length != 0) {
        captionTabla.innerHTML = "Da click en la fila para ver detalles";
        buscarInput.removeAttribute("disabled");
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

function mostrarTabla(signosVitales) {
  let cuerpoTabla = document.querySelector("table tbody");
  cuerpoTabla.innerHTML = "";

  signosVitales.forEach((signoVital) => {
    let fila = document.createElement("tr");
    fila.setAttribute("data-bs-toggle", "modal");
    fila.setAttribute("data-bs-target", "#ventanaModal");
    fila.setAttribute("id", `sig-${signoVital.id}`);
    fila.innerHTML = `
            <td> ${signoVital.nombre} </td>
            <td> ${signoVital.valor} </td>
            <td> ${signoVital.fechaMedida} </td>
        `;
    cuerpoTabla.appendChild(fila);
  });
}

let cuerpoTabla = document.querySelector("table tbody");
cuerpoTabla.addEventListener("click", (event) => {
  console.log(event.target.parentElement.id);
  if (event.target.parentElement.id.startsWith("sig-")) {
    mostrarSignoVitalModal(event.target.parentElement.id.slice(4));
  }
});

function mostrarSignoVitalModal(id) {
  let nombreSignoVitalH1 = document.getElementById("nombreSignoVital");
  let valorSignoVitalInput = document.getElementById("valorSignoVital");
  let fechaMedidaSignoVitalInput = document.getElementById("fechaMedidaSignoVital");
  //let pacienteSignoVitalInput = document.getElementById("pacienteSignoVital");


  traerSignosVitales()
    .then(function (respuestaBack) {
      console.log(respuestaBack);
      let signoVital = respuestaBack.find((signoVital) => signoVital.id == id);
      nombreSignoVitalH1.textContent = signoVital.nombre;
      valorSignoVitalInput.value = signoVital.valor;
      fechaMedidaSignoVitalInput.value = signoVital.fechaMedida;
      //pacienteSignoVitalInput.value = signoVital.correo;
    })
    .catch(function (error) {
      console.error(error);
    });
}

let buscarInput = document.querySelector("#buscar");

buscarInput.addEventListener("keyup", () => {
  filtrarTabla(buscarInput.value);
});

async function filtrarTabla(filtro) {
  try {
    let datosPrevios = await traerSignosVitales();

    if (datosPrevios != null) {
      let signosVitalesCoincidencia = datosPrevios.filter((signoVital) => {
        return (
          signoVital.nombre.toLowerCase().includes(filtro.toLowerCase()) == true
        );
      });
      console.log(signosVitalesCoincidencia);
      mostrarTabla(signosVitalesCoincidencia);
    }
  } catch (error) {
    console.error(error);
  }
}