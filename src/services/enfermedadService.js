export async function buscarEnfermedades() {
    const URL = "http://localhost:8080/api/enfermedad"
    let peticion = {
        method: "GET"
    }

    let respuestaServidor = await fetch(URL,peticion)
    let enfermedades = await respuestaServidor.json()
    console.log(enfermedades)
    return enfermedades
}

export async function registrarEnfermedad(datosEnfermedad) {
    const URL = "http://localhost:8080/api/enfermedad"
    let peticion = {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(datosEnfermedad)
    }
    let respuestaInicial = await fetch(URL, peticion)
    let respuestaFinal = await respuestaInicial.json()
}