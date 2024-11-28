//variables globales
const d = document;
let imgN1 = [
    {nombre:"jean", url: "imagenes/jean.jpg"},
    {nombre: "ciclope", url: "imagenes/ciclope.jpg"},
    {nombre: "tormenta", url: "imagenes/tormenta.jpg"},
    {nombre: "gambito", url: "imagenes/gambito.avif"},
    {nombre: "rogue", url: "imagenes/rogue.jpg"},
    {nombre: "wolverine", url: "imagenes/wolverine.jpg"},
    {nombre: "jean", url: "imagenes/jean.jpg"},
    {nombre: "ciclope", url: "imagenes/ciclope.jpg"},
    {nombre: "tormenta", url: "imagenes/tormenta.jpg"},
    {nombre: "gambito", url: "imagenes/gambito.avif"},
    {nombre: "rogue", url: "imagenes/rogue.jpg"},
    {nombre: "wolverine", url: "imagenes/wolverine.jpg"}
];
let imgN2 = [
    {nombre:"jean", url: "imagenes/jean.jpg"},
    {nombre: "ciclope", url: "imagenes/ciclope.jpg"},
    {nombre: "tormenta", url: "imagenes/tormenta.jpg"},
    {nombre: "gambito", url: "imagenes/gambito.avif"},
    {nombre: "rogue", url: "imagenes/rogue.jpg"},
    {nombre: "wolverine", url: "imagenes/wolverine.jpg"},
    {nombre: "jean", url: "imagenes/jean.jpg"},
    {nombre: "ciclope", url: "imagenes/ciclope.jpg"},
    {nombre: "tormenta", url: "imagenes/tormenta.jpg"},
    {nombre: "gambito", url: "imagenes/gambito.avif"},
    {nombre: "rogue", url: "imagenes/rogue.jpg"},
    {nombre: "wolverine", url: "imagenes/wolverine.jpg"},
    {nombre: "bestia", url: "imagenes/bestia.webp"},
    {nombre: "bestia", url: "imagenes/bestia.webp"},
    {nombre: "javier", url: "imagenes/javier.jpg"},
    {nombre: "javier", url: "imagenes/javier.jpg"}
];
let imgN3 = [
    {nombre:"jean", url: "imagenes/jean.jpg"},
    {nombre: "ciclope", url: "imagenes/ciclope.jpg"},
    {nombre: "tormenta", url: "imagenes/tormenta.jpg"},
    {nombre: "gambito", url: "imagenes/gambito.avif"},
    {nombre: "rogue", url: "imagenes/rogue.jpg"},
    {nombre: "wolverine", url: "imagenes/wolverine.jpg"},
    {nombre: "jean", url: "imagenes/jean.jpg"},
    {nombre: "ciclope", url: "imagenes/ciclope.jpg"},
    {nombre: "tormenta", url: "imagenes/tormenta.jpg"},
    {nombre: "gambito", url: "imagenes/gambito.avif"},
    {nombre: "rogue", url: "imagenes/rogue.jpg"},
    {nombre: "wolverine", url: "imagenes/wolverine.jpg"},
    {nombre: "bestia", url: "imagenes/bestia.webp"},
    {nombre: "bestia", url: "imagenes/bestia.webp"},
    {nombre: "javier", url: "imagenes/javier.jpg"},
    {nombre: "javier", url: "imagenes/javier.jpg"},
    {nombre: "magneto", url: "imagenes/magneto.jpg"},
    {nombre: "magneto", url: "imagenes/magneto.jpg"},
    {nombre: "mystique", url: "imagenes/mystique.webp"},
    {nombre: "mystique", url: "imagenes/mystique.webp"}
];

let tablero = d.querySelector(".tablero");
let imagenNombre = []; //guardar nombres de imagen
let imagenID = [];   //guardar posiciones de imagen
let aciertos = 0;
let totalIntentos = 0;
let totalTiempo = 0;
let tiempoSobrante = 0;
let intentos = 0;
let tiempo = 60;
let nivel = 1;
let mostrarNivel = d.querySelector(".nivel");
let mostrarIntentos = d.querySelector(".intentos");
let mostrarAciertos = d.querySelector(".aciertos");
let mostrarTiempo = d.querySelector(".tiempo");
let tiempoTranscurrido;
let btn_iniciar = d.querySelector(".btn-iniciar");
let imagenNivel;
let estoyJugando = false;
let sonidoFondo = new Audio("./sonidos/f1.mp3");
    sonidoFondo.loop = true;
let sonidoSeleccion = new Audio("./sonidos/seleccion.mp3");
let sonidoAdivino = new Audio("./sonidos/adivino.mp3");
let sonidoFallo = new Audio("./sonidos/fallo.mp3");
let sonidoPerdio = new Audio("./sonidos/perdio.mp3");
let sonidoGano = new Audio("./sonidos/gano.mp3");
let mostrarJugador = d.querySelector(".jugador");
let tabla = d.querySelector(".records tbody");
let fondoBody = d.querySelector("body");

d.addEventListener("DOMContentLoaded", ()=>{
    fondoBody.classList.add("fondo1");
    mostrarDatos();
});

// agregar el evento al BOTON para iniciar el juego
btn_iniciar.addEventListener("click", function(){

    // alert("Juego iniciado");
    
    // comprobar que el juego este activo
    if (estoyJugando == false && nivel == 1) {
        sonidoFondo.play(); // Inicia el sonido de fondo
        VentanaModal();
        
    }else if (estoyJugando == false && nivel == 2) {
        sonidoFondo.play(); // Asegura que el sonido esté activo al cambiar de nivel
        estoyJugando = true;
        nivel2();
    }else if (estoyJugando == false && nivel == 3) {
        sonidoFondo.play();
        estoyJugando = true;
        nivel3();
    }
});


//funcion para agregar las imagenes al tablero
function agregarImagenes(){
    
    //agregar imagenes dependiendo del nivel
    if(nivel == 1){
        imagenNivel = imgN1;
    }else if(nivel == 2){
        imagenNivel = imgN2;
    }else if(nivel == 3){
        imagenNivel = imgN3;
    }

//colocar imagenes aleatorias
imagenNivel.sort(()=>Math.random() -0.5);

    //recorrer con un FOREACH las imagenes del ARRAY
    imagenNivel.forEach((imagen, i)=>{
        let div = d.createElement("div"); //crear el div
        div.className = "col-3";          //agregar la clase col-3 al div
        let img = d.createElement("img"); //crear la etiqueta img
        img.className = "img-fluid altura-img";      //agregar la clase img-fluid a la img
        img.id = i; //enumerar las imagenes por medio de un id
        img.src = "imagenes/oculto.png";             //agregar la ubicacion de la imagen
        img.addEventListener("click", mostrarImg); //agregar evento click a la imagen
        div.appendChild(img);             //agregar la imagen al div
        tablero.appendChild(div);         //agregar los div al tablero 
    });
}

//funcion para mostrar las imagenes ocultas
function mostrarImg(){

    sonidoSeleccion.play();

    //obtener posicion de la imagen
    let imgID = this.getAttribute("id");
    //alert("# de imagen: "+imgId);
    this.src = imagenNivel[imgID].url; //modificar la url de la imagen
    imagenNombre.push(imagenNivel[imgID].nombre); //guardar los nombres de la imagen
    imagenID.push(imgID);   //guardar la posicion de la imagen
    
    if (imagenNombre.length == 2) {
        setTimeout(compararImg, 200);
    }
}

//funcion para comparar imagenes
function compararImg(){
    let imagenesTablero = d.querySelectorAll(".tablero div img");
    if ( imagenNombre[0] == imagenNombre[1] ) {
        if (imagenID[0] != imagenID[1]){
            //alert("Genial!! adivinaste una imagen");
            sonidoAdivino.play();
            imagenesTablero[imagenID[0]].src = "imagenes/ok.png";
            imagenesTablero[imagenID[1]].src = "imagenes/ok.png";
            imagenesTablero[imagenID[0]].removeEventListener("click", mostrarImg);
            imagenesTablero[imagenID[1]].removeEventListener("click", mostrarImg);
            aciertos++;
            mostrarAciertos.textContent = aciertos;
        }else{
            alert("Debes escoger otra imagen");
            imagenesTablero[imagenID[0]].src = "imagenes/oculto.png";
            intentos++;
            mostrarIntentos.textContent = intentos;
        }
            
    }else{
        //alert("Fallaste las imagenes son diferentes")
        sonidoFallo.play();
        imagenesTablero[imagenID[0]].src = "imagenes/oculto.png";
        imagenesTablero[imagenID[1]].src = "imagenes/oculto.png";
        intentos++;
        mostrarIntentos.textContent = intentos;
    }
    imagenNombre = [];
    imagenID = [];

    //compara si se adivinaron todas las imagenes NIVEL 1
    //if (aciertos == 6) {
        //alert("🎉🎉Felicitaciones pasaste al siguiente nivel🥇🥇");
        //recargar la pagina
        //location.reload();
    //}

    //compara si se adivinaron todas las imagenes NIVEL 2
    if (nivel == 1 && aciertos == 6) {
        alert("🎉🎉Felicitaciones pasaste al siguiente nivel🥇🥇");
        fondoBody.classList.replace("fondo1", "fondo2");
        totalIntentos += intentos;
        totalTiempo += tiempo;
        tiempoSobrante += (60-tiempo);
        sonidoGano.play();
        nivel++;
        mostrarNivel.textContent = nivel;
        intentos = 0;
        mostrarIntentos.textContent = intentos;
        aciertos = 0;
        mostrarAciertos.textContent = aciertos;
        clearInterval(tiempoTranscurrido);
        tiempo = 50;
        mostrarTiempo.textContent = tiempo;
        estoyJugando = false;
        quitarImg();
        
    }else if (nivel == 2 && aciertos == 8 ) {
        alert("🎉🎉Felicitaciones pasaste al siguiente nivel🥇🥇");
        fondoBody.classList.replace("fondo2", "fondo3");
        obtenerDatos();
        sonidoGano.play();
        nivel++;
        mostrarNivel.textContent = nivel;
        intentos = 0;
        mostrarIntentos.textContent = intentos;
        aciertos = 0;
        mostrarAciertos.textContent = aciertos;
        clearInterval(tiempoTranscurrido);
        tiempo = 45;
        mostrarTiempo.textContent = tiempo;
        estoyJugando = false;
        quitarImg();
    }else if (nivel == 3 && aciertos == 10 ) {
        alert("🎉🎉Felicitaciones ganaste el juego🥇🥇");
        sonidoGano.play();
        detenerSonidoFondo(); // Detén la música de fondo
        location.reload();
    }
}
function nivel1() {
     // agregar las imagenes al tablero
     agregarImagenes();
     mostrarNivel.textContent = nivel;
     tiempoDeJuego();
}

function nivel2() {
    // agregar las imagenes al tablero
    agregarImagenes();
    
    tiempoDeJuego();
}
function nivel3() {
    // agregar las imagenes al tablero
    agregarImagenes();
   
    tiempoDeJuego();
}

// CONTROLAR EL TIEMPO DE JUEGO
// setTimeout() // se ejecuta una vez cuando pasa determinado tiempo 
// setInterval() // se ejecuta en determinado tiempo infinitamente
function tiempoDeJuego(param){
    // CONTROLAR EL TIEMPO DE JUEGO
    tiempoTranscurrido = setInterval( ()=>{
        tiempo--;
        mostrarTiempo.textContent = tiempo;
        if (tiempo == 10) {
            alert("Rapido!! el tiempo se esta agotando 😱😱");
            // mostrarTiempo.style.color = "red";
            // mostrarTiempo.style.fontSize = "25px";
            mostrarTiempo.classList.add("tiempo-agotado");

        }else if (tiempo == 0) {
            alert("El tiempo se agoto perdiste");
            sonidoPerdio.play();
            detenerSonidoFondo(); // Detén la música de fondo
            clearInterval(tiempoTranscurrido);
            setTimeout(()=>{
            location.reload();
            }, 3000)
        
        }
    }, 1000);
}

// Función para detener la música de fondo
function detenerSonidoFondo() {
    sonidoFondo.pause();
    sonidoFondo.currentTime = 0; // Reinicia el audio al inicio
}

function quitarImg(){
    let imagenQuitar = d.querySelectorAll(".tablero div");
    imagenQuitar.forEach((img)=>{
        img.remove();
    });
}

//mostar ventana MODAL
function VentanaModal(){
    let mostarModal = d.querySelector("#exampleModal");
    let cerrarModal = d.querySelectorAll(".cerrar");
    let inputJugador = d.querySelector(".nombre-jugador");
    let btnJugador = d.querySelector(".registrar-jugador");
    
    // botones para cerra r ventana modal
    cerrarModal.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            mostarModal.classList.remove("show");
            mostarModal.style.display = "none";
        });
    });

    // mostrar ventana modal
    mostarModal.classList.add("show");
    mostarModal.style.display = "block";
    // evento click al boton azul del modal
    btnJugador.addEventListener("click",()=>{
        // mostrar el nombre en el tablero
        mostrarJugador.textContent = inputJugador.value;
        // cerrar ventana modal
        mostarModal.classList.remove("show");
        mostarModal.style.display = "none";
        // iniciar nivel 1
        estoyJugando = true;
        nivel1();
    });
}



