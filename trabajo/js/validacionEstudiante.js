const inputCarnet = document.getElementById("idCarnet");
const inputNombre = document.getElementById("idNombre");
const inputDui = document.getElementById("idDui");
const inputNit = document.getElementById("idNit");
const inputFecha = document.getElementById("idFecha");
const inputCorreo = document.getElementById("idCorreo");
const inputEdad = document.getElementById("idEdad");

const buttonValidar = document.getElementById("idBtnValidar");
const resultado = document.getElementById("idResultado");

function validarEstudiante() {
    let carnet = inputCarnet.value;
    let nombre = inputNombre.value;
    let dui = inputDui.value;
    let nit = inputNit.value;
    let fecha = inputFecha.value;
    let correo = inputCorreo.value;
    let edad = inputEdad.value;

    let errores = "";

    if (!/^[A-Za-z]{2}[0-9]{3}$/.test(carnet)) {
        errores += "Carnet inválido. Ejemplo: AB001\n";
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre)) {
        errores += "Nombre inválido. Solo letras y espacios.\n";
    }

    if (!/^[0-9]{7}-[0-9]$/.test(dui)) {
        errores += "DUI inválido. Formato: #######-#\n";
    }

    if (!/^[0-9]{4}-[0-9]{4}-[0-9]{3}-[0-9]$/.test(nit)) {
        errores += "NIT inválido. Formato: ####-####-###-#\n";
    }

    if (!/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(fecha)) {
        errores += "Fecha inválida. Formato: DD/MM/AAAA\n";
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
        errores += "Correo electrónico inválido.\n";
    }

    if (!/^[0-9]+$/.test(edad)) {
        errores += "Edad inválida. Solo números.\n";
    }

    if (errores != "") {
        alert(errores);
        resultado.innerHTML = "Hay datos inválidos";
    } else {
        alert("Todos los datos son válidos");
        resultado.innerHTML = "Todos los datos son válidos";
    }
}

buttonValidar.addEventListener("click", validarEstudiante);