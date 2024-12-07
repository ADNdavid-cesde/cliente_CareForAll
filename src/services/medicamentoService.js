export async function buscarMedicamentos() {

    const URL = "http://localhost:8080/api/medicamento"
    let peticion = {
        method: "GET"
    }

    let respuestaServidor = await fetch(URL,peticion)
    let medicamentos = await respuestaServidor.json()
    console.log(medicamentos)
    return medicamentos
}

export async function registrarMedicamento(datosMedicamento) {
    const URL = "http://localhost:8080/api/medicamento"
    let peticion = {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(datosMedicamento)
    }
    let respuestaInicial = await fetch(URL, peticion)
    let respuestaFinal = await respuestaInicial.json()
}