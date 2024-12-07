const URL = "http://localhost:8080/api/paciente";

export async function traerPacientes() {
  let peticionGET = {
    method: "GET",
  };

  let respuestaServidor = await fetch(URL, peticionGET);
  let pacientes = await respuestaServidor.json();
  return pacientes;
}

export async function guardarPaciente(nuevoPaciente) {
  let peticionPOST = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoPaciente),
  };

  let respuestaServidor = await fetch(URL, peticionPOST);
  let paciente = await respuestaServidor.json();
  return paciente;
}

// export async function actualizarPaciente(paciente, id) {
//   let peticionPUT = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(paciente),
//   };

//   let respuestaServidor = await fetch(URL + "/" + id, peticionPUT);
//   let pacienteActualizado = await respuestaServidor.json();
//   return pacienteActualizado;
// }

// export async function eliminarPaciente(id) {
//   let peticionDELETE = {
//     method: "DELETE",
//   };

//   let respuestaServidor = await fetch(URL + "/" + id, peticionDELETE);
//   let respuesta = await respuestaServidor.text();
//   return respuesta;
// }

// export async function traerPaciente(id) {
//   let peticionGET = {
//     method: "GET",
//   };

//   let respuestaServidor = await fetch(URL + "/" + id, peticionGET);
//   let paciente = await respuestaServidor.json();
//   return paciente;
// }