const posibilidades = ["piedra", "papel", "tijera"];

const nombreInput = document.querySelector("input[name='nombre']");
const partidasInput = document.querySelector("input[name='partidas']");
const opciones = document.getElementsByTagName("img");
const historial = document.getElementById("historial"); 
const actual = document.getElementById("actual"); 
const total = document.getElementById("total"); 

// Configuración de la aplicación: Botones
document.getElementsByTagName("button")[0].addEventListener("click", introducirUsuario, false);
document.getElementsByTagName("button")[1].addEventListener("click", generarTirada, false);
document.getElementsByTagName("button")[2].addEventListener("click", reset, false);

// Configuración de la aplicación: Opciones del jugador
for (let i = 0; i < opciones.length - 1; i++) {
    opciones[i].id = posibilidades[i];
    opciones[i].src = crearRutaImagen(opciones[i].id, "Jugador");
    opciones[i].addEventListener("click", seleccionaTirada, false);
}


let nombre = "";

function comprobarNombre(nombreAComprobar) {
    // Comprueba si el nombre tiene más de 3 caracteres y no comienza con un número
    return nombreAComprobar.length > 3 && isNaN(nombreAComprobar[0]);
}

function introducirUsuario() {
    if (!comprobarNombre(nombreInput.value)) {
        nombreInput.classList.add("fondoRojo");
    } else if (partidasInput.value <= 0) {
        nombreInput.classList.remove("fondoRojo");
        partidasInput.classList.add("fondoRojo");
    } else {
        nombreInput.classList.remove("fondoRojo");
        partidasInput.classList.remove("fondoRojo");

        nombre = nombreInput.value;
        total.textContent = partidasInput.value;
        nombreInput.disabled = true;
        partidasInput.disabled = true;
    }
}

// Elección y tirada
const maquina = opciones[opciones.length - 1];

function valorAleatorio(listaPosibilidades) {
    // Genera un valor aleatorio basado en la longitud de la lista de posibilidades
    const aleatorio = Math.floor(Math.random() * listaPosibilidades.length);
    return listaPosibilidades[aleatorio];
}

function crearRutaImagen(valor, tipo) {
    // Verifica que valor tenga un valor antes de construir la ruta
    valor = valor || "";
    // Crea la ruta de la imagen basada en el valor y el tipo especificados
    return "img/" + valor + tipo + ".png";
}

function generarTirada() {
    if (actual.innerHTML < total.innerHTML) {
        const tiradaMaquina = valorAleatorio(posibilidades);
        maquina.src = crearRutaImagen(tiradaMaquina, "Ordenador");
        maquina.id = tiradaMaquina;
        actual.innerHTML = Number(actual.innerHTML) + 1;
        calcularResultado(tiradaMaquina);
    }
}

function seleccionaTirada() {
    // Realiza la selección de la tirada del jugador y actualiza la apariencia de los elementos
    this.classList.add("seleccionado");
    this.classList.remove("noSeleccionado");

    for (let j = 0; j < opciones.length - 1; j++) {
        if (opciones[j] !== this) {
            opciones[j].classList.remove("seleccionado");
            opciones[j].classList.add("noSeleccionado");
        }
    }
}

// Historial de partidas
function calcularResultado(tirada) {
    const seleccionado = document.querySelector(".seleccionado").id;
    const resultado = document.createElement("li");

    const indexMaquina = posibilidades.indexOf(maquina.id);
    const indexSeleccionado = posibilidades.indexOf(seleccionado);

    if (indexMaquina === indexSeleccionado - 1 || (indexMaquina === posibilidades.length - 1 && indexSeleccionado === 0)) {
        resultado.textContent = `Gana ${nombre}`;
    } else if (indexMaquina === indexSeleccionado) {
        resultado.textContent = "Empate";
    } else {
        resultado.textContent = "Gana la máquina";
    }

    historial.appendChild(resultado);
}

function reset() {
    // Habilita los campos de entrada y reinicia los valores
    nombreInput.disabled = false;
    partidasInput.disabled = false;
    partidasInput.value = 0;
    total.textContent = "0";
    actual.textContent = "0";

    for (let j = 0; j < opciones.length - 1; j++) {
        opciones[j].classList.remove("seleccionado");
        opciones[j].classList.remove("noSeleccionado");
    }

    opciones[0].classList.add("seleccionado");
    opciones[opciones.length - 1].src = crearRutaImagen("", "defecto");

    const nuevaPartida = document.createElement("li");
    nuevaPartida.textContent = "Nueva partida";
    historial.appendChild(nuevaPartida);
}