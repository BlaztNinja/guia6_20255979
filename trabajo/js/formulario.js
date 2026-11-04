//Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

//Arreglo global de pacientes
let arrayPaciente = [];

// Indica qué paciente se está editando. -1 significa que no se edita ninguno
let indiceEdicion = -1;

/*
 Guarda los pacientes en localStorage
*/
function guardarPacientes() {
    localStorage.setItem("pacientes", JSON.stringify(arrayPaciente));
}

/*
 Carga los pacientes guardados en localStorage
*/
function cargarPacientes() {
    let datos = localStorage.getItem("pacientes");

    if (datos != null) {
        arrayPaciente = JSON.parse(datos);
    }
}

/*
 Creando una función para que limpie el formulario
 siempre que se cargue la página o cuando se presione
 el botón limpiar del formulario
*/

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    indiceEdicion = -1;

    // Regresar el texto del botón a "Guardar Datos"
    buttonAgregarPaciente.innerHTML =
        '<i class="bi bi-person-plus-fill"></i> Guardar Datos';

    inputNombre.focus();
};

/*
 Función para validar el ingreso del paciente
 */

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked === true
            ? "Hombre"
            : inputRdFemenino.checked === true
                ? "Mujer"
                : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        let nuevoPaciente = new Array(
            nombre,
            apellido,
            fechaNacimiento,
            sexo,
            labelPais,
            direccion
        );

        // Si no se está editando, se agrega uno nuevo
        if (indiceEdicion == -1) {
            arrayPaciente.push(nuevoPaciente);
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        } else {
            // Si se está editando, se actualiza el paciente
            arrayPaciente[indiceEdicion] = nuevoPaciente;
            indiceEdicion = -1;
            mensaje.innerHTML = "Paciente actualizado correctamente";
        }

        // Guardando en localStorage
        guardarPacientes();

        //Llamando al componente de Bootstrap
        toast.show();

        //Limpiando formulario
        limpiarForm();

        // Refrescando la tabla para que se vea el cambio de inmediato
        if (arrayPaciente.length > 0) {
            imprimirPacientes();
        } else {
            document.getElementById("idTablaPacientes").innerHTML = "Ninguno";
        }
    } else {
        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

// Carga los datos del paciente en el formulario para editarlo
function editarPaciente(indice) {
    let paciente = arrayPaciente[indice];

    if (!paciente) {
        return;
    }

    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];

    inputRdMasculino.checked = paciente[3] == "Hombre";
    inputRdFemenino.checked = paciente[3] == "Mujer";

    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text == paciente[4]) {
            cmbPais.selectedIndex = i;
        }
    }

    inputDireccion.value = paciente[5];

    indiceEdicion = indice;

    // Cambiar el texto del botón para indicar que se está editando
    buttonAgregarPaciente.innerHTML =
        '<i class="bi bi-save"></i> Actualizar Datos';
}

// Elimina un paciente del arreglo
function eliminarPaciente(indice) {
    if (confirm("¿Desea eliminar este paciente?")) {
        arrayPaciente.splice(indice, 1);

        // Guardando en localStorage
        guardarPacientes();

        if (indiceEdicion == indice) {
            limpiarForm();
        }

        if (arrayPaciente.length > 0) {
            imprimirPacientes();
        } else {
            document.getElementById("idTablaPacientes").innerHTML = "Ninguno";
        }
    }
}

//Función que imprime la tabla de los pacientes registrados
function imprimirFilas() {
    let $filas = "";
    let contador = 1;

    arrayPaciente.forEach((element, indice) => {
        $filas += `<tr>
        <td scope="row" class="text-center fw-bold">${contador}</td>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>${element[2]}</td>
        <td>${element[3]}</td>
        <td>${element[4]}</td>
        <td>${element[5]}</td>
        <td>
        <button id="idBtnEditar${contador}" type="button" class="btn btn-primary" onclick="editarPaciente(${indice})">
            <i class="bi bi-pencil-square"></i>
        </button>
        <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger" onclick="eliminarPaciente(${indice})">
            <i class="bi bi-trash-fill"></i>
        </button>
        </td>
        </tr>`;
        contador++;
    });
    return $filas;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
        <tr>
            <th scope="col" class="text-center" style="width:5%;">#</th>
            <th scope="col" class="text-center" style="width:15%;">Nombre</th>
            <th scope="col" class="text-center" style="width:15%;">Apellido</th>
            <th scope="col" class="text-center" style="width:10%;">Fecha nacimiento</th>
            <th scope="col" class="text-center" style="width:10%;">Sexo</th>
            <th scope="col" class="text-center" style="width:10%;">Pais</th>
            <th scope="col" class="text-center" style="width:25%;">Dirección</th>
            <th scope="col" class="text-center" style="width:10%;">Opciones</th>
        </tr>
        ${imprimirFilas()}
    </table>
    </div>`;

    document.getElementById("idTablaPacientes").innerHTML = $table;
};

// Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "País agregado correctamente";
        //Llamando al componente de Bootstrap
        toast.show();
    } else {
        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Se agrega el focus en el campo nombre país del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

//Ejecutar función al momento de cargar la pagina HTML
cargarPacientes();
limpiarForm();

if (arrayPaciente.length > 0) {
    imprimirPacientes();
}