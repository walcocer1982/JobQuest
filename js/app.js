// Seleccionamos los elementos del DOM
const formularioEmpresa = document.getElementById('formulario-empresa');
const listaEmpresas = document.getElementById('lista-empresas');
const formularioEvento = document.getElementById('formulario-evento');
const listaEventos = document.getElementById('lista-eventos');
const selectEmpresaEvento = document.getElementById('empresa-evento');

// Array para almacenar las empresas y eventos
let empresas = JSON.parse(localStorage.getItem('empresas')) || [];
let eventos = JSON.parse(localStorage.getItem('eventos')) || [];

// Función para agregar una nueva empresa
formularioEmpresa.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Obtener los valores del formulario de empresas
    const nombre = document.getElementById('nombre').value;
    const industria = document.getElementById('industria').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const enlace = document.getElementById('enlace').value;
    const oportunidad = document.getElementById('oportunidad').value;
    const tamano = document.getElementById('tamano').value;
    const prioridad = document.getElementById('prioridad').value;

    // Crear un objeto empresa
    const empresa = {
        nombre,
        industria,
        ubicacion,
        enlace,
        oportunidad,
        tamano,
        prioridad
    };

    // Agregar la empresa al array
    empresas.push(empresa);

    // Guardar en localStorage
    localStorage.setItem('empresas', JSON.stringify(empresas));

    // Actualizar la tabla de empresas y el select de eventos
    actualizarTablaEmpresas();
    actualizarSelectEmpresas();

    // Limpiar el formulario
    formularioEmpresa.reset();
});

// Función para actualizar la tabla de empresas
function actualizarTablaEmpresas() {
    // Limpiar la tabla
    listaEmpresas.innerHTML = '';

    // Recorrer el array de empresas
    empresas.forEach((empresa, index) => {
        // Crear una nueva fila
        const fila = document.createElement('tr');

        // Crear las celdas con la información de la empresa
        fila.innerHTML = `
            <td>${empresa.nombre}</td>
            <td>${empresa.industria}</td>
            <td>${empresa.ubicacion}</td>
            <td>${empresa.oportunidad}</td>
            <td>${empresa.tamano}</td>
            <td>${empresa.prioridad}</td>
            <td>
                <button class="editar" onclick="editarEmpresa(${index})">Editar</button>
                <button class="eliminar" onclick="eliminarEmpresa(${index})">Eliminar</button>
            </td>
        `;

        // Agregar la fila a la tabla
        listaEmpresas.appendChild(fila);
    });
}

// Función para actualizar el select de empresas en la sección de eventos
function actualizarSelectEmpresas() {
    // Limpiar el select
    selectEmpresaEvento.innerHTML = '';

    // Recorrer el array de empresas y agregar opciones al select
    empresas.forEach((empresa, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = empresa.nombre;
        selectEmpresaEvento.appendChild(option);
    });
}

// Función para eliminar una empresa
function eliminarEmpresa(index) {
    // Eliminar la empresa del array
    empresas.splice(index, 1);

    // Guardar en localStorage
    localStorage.setItem('empresas', JSON.stringify(empresas));

    // Actualizar la tabla de empresas y el select de eventos
    actualizarTablaEmpresas();
    actualizarSelectEmpresas();
}

// Función para editar una empresa
function editarEmpresa(index) {
    // Obtener los datos de la empresa seleccionada
    const empresa = empresas[index];

    // Rellenar el formulario con los datos de la empresa
    document.getElementById('nombre').value = empresa.nombre;
    document.getElementById('industria').value = empresa.industria;
    document.getElementById('ubicacion').value = empresa.ubicacion;
    document.getElementById('enlace').value = empresa.enlace;
    document.getElementById('oportunidad').value = empresa.oportunidad;
    document.getElementById('tamano').value = empresa.tamano;
    document.getElementById('prioridad').value = empresa.prioridad;

    // Eliminar la empresa editada del array
    eliminarEmpresa(index);
}

// Función para agregar un nuevo evento
formularioEvento.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores del formulario de eventos
    const empresaSeleccionada = selectEmpresaEvento.value;
    const descripcionEvento = document.getElementById('descripcion-evento').value;
    const ubicacionEvento = document.getElementById('ubicacion-evento').value;
    const fechaEvento = document.getElementById('fecha-evento').value;
    const horaEvento = document.getElementById('hora-evento').value;

    // Crear un objeto evento
    const evento = {
        empresa: empresas[empresaSeleccionada].nombre,
        descripcion: descripcionEvento,
        ubicacion: ubicacionEvento,
        fecha: fechaEvento,
        hora: horaEvento
    };

    // Agregar el evento al array
    eventos.push(evento);

    // Guardar en localStorage
    localStorage.setItem('eventos', JSON.stringify(eventos));

    // Actualizar la tabla de eventos
    actualizarTablaEventos();

    // Limpiar el formulario
    formularioEvento.reset();
});

// Función para actualizar la tabla de eventos
function actualizarTablaEventos() {
    // Limpiar la tabla
    listaEventos.innerHTML = '';

    // Recorrer el array de eventos
    eventos.forEach((evento, index) => {
        // Crear una nueva fila
        const fila = document.createElement('tr');

        // Crear las celdas con la información del evento
        fila.innerHTML = `
            <td>${evento.empresa}</td>
            <td>${evento.descripcion}</td>
            <td>${evento.ubicacion}</td>
            <td>${evento.fecha}</td>
            <td>${evento.hora}</td>
            <td>
                <button class="editar" onclick="editarEvento(${index})">Editar</button>
                <button class="eliminar" onclick="eliminarEvento(${index})">Eliminar</button>
            </td>
        `;

        // Agregar la fila a la tabla
        listaEventos.appendChild(fila);
    });
}

// Función para eliminar un evento
function eliminarEvento(index) {
    // Eliminar el evento del array
    eventos.splice(index, 1);

    // Guardar en localStorage
    localStorage.setItem('eventos', JSON.stringify(eventos));

    // Actualizar la tabla de eventos
    actualizarTablaEventos();
}

// Función para editar un evento
function editarEvento(index) {
    // Obtener los datos del evento seleccionado
    const evento = eventos[index];

    // Rellenar el formulario con los datos del evento
    selectEmpresaEvento.value = empresas.findIndex(e => e.nombre === evento.empresa);
    document.getElementById('descripcion-evento').value = evento.descripcion;
    document.getElementById('ubicacion-evento').value = evento.ubicacion;
    document.getElementById('fecha-evento').value = evento.fecha;
    document.getElementById('hora-evento').value = evento.hora;

    // Eliminar el evento editado del array
    eliminarEvento(index);
}

// Inicializar la aplicación cargando los datos del localStorage
document.addEventListener('DOMContentLoaded', function () {
    actualizarTablaEmpresas();
    actualizarSelectEmpresas();
    actualizarTablaEventos();
});
