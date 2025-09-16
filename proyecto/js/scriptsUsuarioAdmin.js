let listaUsuarios = [];
const CLAVE_USUARIOS = 'tiendaDuoc_usuarios';

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    inicializarUsuarios();
    configurarListenersUsuario();
    

    // Llamamos a la función de regiones-comunas.js para que prepare el modal.
    // Le pasamos los IDs de los 'select' que están en nuestro modal de usuario.
    if (typeof cargarRegiones === 'function') {
        cargarRegiones('regionUsuario', 'comunaUsuario');
    }
});

function inicializarUsuarios() {
    const usuariosAlmacenados = localStorage.getItem(CLAVE_USUARIOS);
    if (usuariosAlmacenados) {
        listaUsuarios = JSON.parse(usuariosAlmacenados);
    } else {
        // ... (datos de ejemplo)
    }
    mostrarUsuariosEnTabla();
}

// --- RENDERIZADO EN LA TABLA ---
function mostrarUsuariosEnTabla() {
    const tbody = document.getElementById('tablaUsuarios');
    tbody.innerHTML = ''; // Limpiar la tabla

    listaUsuarios.forEach(usuario => {
        const tr = document.createElement('tr');
    
        tr.innerHTML = `
            <td>${usuario.run}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.tipoUsuario}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarUsuario('${usuario.run}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${usuario.run}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

let runUsuarioEditando = null;

function editarUsuario(run) {
    runUsuarioEditando = run;
    const usuario = listaUsuarios.find(u => u.run === run);
    if (!usuario) return;

    // Llenar datos del formulario
    document.getElementById('runUsuario').value = usuario.run;
    document.getElementById('nombreUsuario').value = usuario.nombre;
    document.getElementById('apellidosUsuario').value = usuario.apellidos;
    document.getElementById('correoUsuario').value = usuario.correo;
    document.getElementById('contrasenaUsuario').value = usuario.contrasena;
    document.getElementById('fechaNacimientoUsuario').value = usuario.fechaNacimiento;
    document.getElementById('tipoUsuario').value = usuario.tipoUsuario;
    document.getElementById('direccionUsuario').value = usuario.direccion;
    
    const regionSelect = document.getElementById('regionUsuario');
    const comunaSelect = document.getElementById('comunaUsuario');

    // Seleccionar y cargar región/comuna
    regionSelect.value = usuario.region;
    regionSelect.dispatchEvent(new Event('change')); // Cargar comunas
    comunaSelect.value = usuario.comuna; // Seleccionar comuna

    // Mostrar modal
    document.getElementById('modalUsuarioLabel').textContent = 'Editar Usuario';
    document.getElementById('runUsuario').disabled = true;
    new bootstrap.Modal(document.getElementById('modalUsuario')).show();
}

function guardarUsuario() {
    const datosUsuario = {
        run: document.getElementById('runUsuario').value,
        nombre: document.getElementById('nombreUsuario').value,
        apellidos: document.getElementById('apellidosUsuario').value,
        correo: document.getElementById('correoUsuario').value,
        contrasena: document.getElementById('contrasenaUsuario').value,
        fechaNacimiento: document.getElementById('fechaNacimientoUsuario').value,
        tipoUsuario: document.getElementById('tipoUsuario').value,
        region: document.getElementById('regionUsuario').value,
        comuna: document.getElementById('comunaUsuario').value,
        direccion: document.getElementById('direccionUsuario').value,
    };

    if (runUsuarioEditando) {
        const index = listaUsuarios.findIndex(u => u.run === runUsuarioEditando);
        if (index !== -1) listaUsuarios[index] = datosUsuario;
    } else {
        if (listaUsuarios.some(u => u.run === datosUsuario.run)) {
            alert('El RUN ya existe.');
            return;
        }
        listaUsuarios.push(datosUsuario);
    }

    guardarEnLocalStorage(CLAVE_USUARIOS, listaUsuarios);
    mostrarUsuariosEnTabla();
    bootstrap.Modal.getInstance(document.getElementById('modalUsuario')).hide();
}

function eliminarUsuario(run) {
    if (confirm('¿Seguro que deseas eliminar a este usuario?')) {
        listaUsuarios = listaUsuarios.filter(u => u.run !== run);
        guardarEnLocalStorage(CLAVE_USUARIOS, listaUsuarios);
        mostrarUsuariosEnTabla();
    }
}

function configurarListenersUsuario() {
    const formUsuario = document.getElementById('formUsuario');
    const modalUsuario = document.getElementById('modalUsuario');

    modalUsuario.addEventListener('hidden.bs.modal', () => {
        formUsuario.reset();
        document.getElementById('modalUsuarioLabel').textContent = 'Nuevo Usuario';
        document.getElementById('runUsuario').disabled = false;
        runUsuarioEditando = null;
        document.getElementById('comunaUsuario').innerHTML = '<option value="" selected disabled>Primero seleccione una región</option>';
        document.getElementById('comunaUsuario').disabled = true;
    });

    document.getElementById('guardarUsuario').addEventListener('click', () => {
        if (formUsuario.checkValidity()) {
            guardarUsuario();
        } else {
            formUsuario.classList.add('was-validated');
        }
    });
}

function guardarEnLocalStorage(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}

window.editarUsuario = editarUsuario;
window.eliminarUsuario = eliminarUsuario;