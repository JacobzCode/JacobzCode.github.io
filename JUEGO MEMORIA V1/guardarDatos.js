// variables globales
let nombreJugador = d.querySelector(".jugador");
let listaJugadores = "jugadores";

// funcion para obtener los datos
function obtenerDatos(datos) {
    // crear objetos para los datos del jugador
    let datosJugador = {
        "nombre" : nombreJugador.textContent,
        "intentos" : totalIntentos,
        "tiempoTotal" : totalTiempo,
        "tiempoSobrante" : tiempoSobrante,
    }

    // mostrar los datos en consola
    console.log(datosJugador);
    // pasar los datos del jugador
    guardarDatos(datosJugador);
}

// funcion para guardar los datos en local store
function guardarDatos(datos) {
    // array para los datos antiguos y nuevos
    let jugadores = [];
    // tomar los datos en localstore previa/ guardados
    let datosPrevios = JSON.parse(localStorage.getItem(listaJugadores));
    if (datosPrevios != null ) {
        jugadores = datosPrevios;
    }
    // guardar el nuevo jugador en el array
    jugadores.push(datos);
    // guardar todos los datos en localstorage
    localStorage.setItem(listaJugadores, JSON.stringify(jugadores));
}
function mostrarDatos(datos) {
    // array para los datos antiguos y nuevos
    let jugadores = [];
    // tomar los datos en local store previa/ guardados
    let datosPrevios = JSON.parse(localStorage.getItem(listaJugadores));
    if (datosPrevios != null ) {
        jugadores = datosPrevios;
    }

    // organizar los jugadores 
    jugadores.sort((a, b)=>{
        if (a.tiempoTotal < b.tiempoTotal) {
            return -1;
        }
        if(a.intentos < b.intentos) {
            
        }
    });
    
    // mostrar los datos en la tabla
    jugadores.forEach((jugador, i)=>{
        // crear fila
        let fila = d.createElement("tr");
        fila.innerHTML = `
        <td> ${i+1} </td>
        <td> ${jugador.nombre} </td>
        <td> ${jugador.tiempoTotal} </td>
        <td> ${jugador.intentos} </td>
        <td> ${jugador.tiempoSobrante} </td>
        `;
        tabla.appendChild(fila);
    });

}