// -------------------------------------------------
//          MÓDULO DE GESTIÓN DE USUARIOS
// -------------------------------------------------

// Variables y constantes específicas para usuarios
let listaUsuarios = [];
const CLAVE_USUARIOS = 'tiendaDuoc_usuarios';

// Función para cargar y mostrar los usuarios
function inicializarUsuarios() {
    // Cargar desde LocalStorage o usar datos de ejemplo
    const usuariosAlmacenados = localStorage.getItem(CLAVE_USUARIOS);
    if (usuariosAlmacenados) {
        listaUsuarios = JSON.parse(usuariosAlmacenados);
    } else {
        listaUsuarios = [
            {
                run: '12345678K',
                nombre: 'Juan',
                apellidos: 'Pérez González',
                correo: 'juan.perez@duoc.cl',
                contrasena: 'admin123',
                fechaNacimiento: '1985-05-15',
                tipoUsuario: 'administrador',
                region: 'Región Metropolitana',
                comuna: 'Santiago',
                direccion: 'Av. Principal 123'
            },
            {
                run: '187654321',
                nombre: 'María',
                apellidos: 'Gómez López',
                correo: 'maria.gomez@gmail.com',
                contrasena: 'vende123',
                fechaNacimiento: '1990-08-22',
                tipoUsuario: 'vendedor',
                region: 'Valparaíso',
                comuna: 'Viña del Mar',
                direccion: 'Calle Secundaria 456'
            }
        ];
        guardarEnLocalStorage(CLAVE_USUARIOS, listaUsuarios);
    }
    
    // Mostrar usuarios si estamos en la página correcta
    if (document.getElementById('tablaUsuarios')) {
        mostrarUsuariosEnTabla();
    }

    // Cargar regiones y configurar listeners si está el formulario
    if (document.getElementById('formUsuario')) {
        setTimeout(cargarRegiones, 100);
        configurarListenersUsuario();
    }
}

// Función para mostrar usuarios en la tabla
function mostrarUsuariosEnTabla() {
    const tabla = document.getElementById('tablaUsuarios');
    if (!tabla) return;
    
    tabla.innerHTML = '';
    listaUsuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.run}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.tipoUsuario}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editarUsuario('${usuario.run}')">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarUsuario('${usuario.run}')">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// Función para guardar (crear o actualizar) un usuario
function guardarUsuario() {
    const run = document.getElementById('runUsuario').value;
    const nombre = document.getElementById('nombreUsuario').value;
    const apellidos = document.getElementById('apellidosUsuario').value;
    const correo = document.getElementById('correoUsuario').value;
    const contrasena = document.getElementById('contrasenaUsuario').value;
    const fechaNacimiento = document.getElementById('fechaNacimientoUsuario').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;
    const regionSelect = document.getElementById('regionUsuario');
    const region = regionSelect.options[regionSelect.selectedIndex].text;
    const comunaSelect = document.getElementById('comunaUsuario');
    const comuna = comunaSelect.options[comunaSelect.selectedIndex].text;
    const direccion = document.getElementById('direccionUsuario').value;

    const usuarioExistente = listaUsuarios.find(u => u.run === run);

    if (usuarioExistente) {
        Object.assign(usuarioExistente, { nombre, apellidos, correo, contrasena: contrasena || usuarioExistente.contrasena, fechaNacimiento, tipoUsuario, region, comuna, direccion });
    } else {
        listaUsuarios.push({ run, nombre, apellidos, correo, contrasena, fechaNacimiento, tipoUsuario, region, comuna, direccion });
    }

    guardarEnLocalStorage(CLAVE_USUARIOS, listaUsuarios);
    mostrarUsuariosEnTabla();
    alert('Usuario guardado correctamente');
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalUsuario'));
    modal.hide();
}

// Función para rellenar el formulario y abrir el modal de edición
function editarUsuario(run) {
    const usuario = listaUsuarios.find(u => u.run === run);
    if (!usuario) return;

    document.getElementById('runUsuario').value = usuario.run;
    document.getElementById('nombreUsuario').value = usuario.nombre;
    document.getElementById('apellidosUsuario').value = usuario.apellidos;
    document.getElementById('correoUsuario').value = usuario.correo;
    document.getElementById('contrasenaUsuario').value = usuario.contrasena;
    document.getElementById('fechaNacimientoUsuario').value = usuario.fechaNacimiento || '';
    document.getElementById('tipoUsuario').value = usuario.tipoUsuario;
    document.getElementById('direccionUsuario').value = usuario.direccion;

    const regionSelect = document.getElementById('regionUsuario');
    for (let i = 0; i < regionSelect.options.length; i++) {
        if (regionSelect.options[i].text === usuario.region) {
            regionSelect.selectedIndex = i;
            break;
        }
    }
    regionSelect.dispatchEvent(new Event('change'));

    setTimeout(() => {
        const comunaSelect = document.getElementById('comunaUsuario');
        for (let i = 0; i < comunaSelect.options.length; i++) {
            if (comunaSelect.options[i].text === usuario.comuna) {
                comunaSelect.selectedIndex = i;
                break;
            }
        }
    }, 100);

    document.getElementById('modalUsuarioLabel').textContent = 'Editar Usuario';
    const modal = new bootstrap.Modal(document.getElementById('modalUsuario'));
    modal.show();
}

// Función para eliminar un usuario
function eliminarUsuario(run) {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        listaUsuarios = listaUsuarios.filter(u => u.run !== run);
        guardarEnLocalStorage(CLAVE_USUARIOS, listaUsuarios);
        mostrarUsuariosEnTabla();
        alert('Usuario eliminado correctamente');
    }
}

// --- Funciones de Regiones y Comunas ---
function cargarRegiones() {
    const selectRegion = document.getElementById('regionUsuario');
    if (!selectRegion || typeof regionesChile === 'undefined') return;
    while (selectRegion.options.length > 1) selectRegion.remove(1);
    regionesChile.forEach(region => {
        const option = document.createElement('option');
        option.value = region.id;
        option.textContent = region.nombre;
        selectRegion.appendChild(option);
    });
}

function cargarComunas(idRegion) {
    const selectComuna = document.getElementById('comunaUsuario');
    if (!selectComuna) return;
    while (selectComuna.options.length > 1) selectComuna.remove(1);

    if (!idRegion) {
        selectComuna.disabled = true;
        return;
    }
    const region = regionesChile.find(r => r.id == idRegion);
    if (region) {
        selectComuna.disabled = false;
        region.comunas.forEach(comuna => {
            const option = new Option(comuna, comuna);
            selectComuna.appendChild(option);
        });
    }
}

// --- Funciones de Validación ---
function validarRun(run) {
    if (!/^[0-9]+[0-9kK]{1}$/.test(run)) return false;
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1).toLowerCase();
    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const dvEsperado = 11 - (suma % 11);
    let dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'k' : dvEsperado.toString();
    return dv === dvFinal;
}

function validarCorreo(correo) {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
}

// --- Configuración de Event Listeners ---
function configurarListenersUsuario() {
    const formUsuario = document.getElementById('formUsuario');
    if (!formUsuario) return;

    document.getElementById('regionUsuario').addEventListener('change', e => cargarComunas(e.target.value));

    const modalUsuario = document.getElementById('modalUsuario');
    modalUsuario.addEventListener('hidden.bs.modal', () => {
        document.getElementById('modalUsuarioLabel').textContent = 'Nuevo Usuario';
        formUsuario.reset();
        formUsuario.classList.remove('was-validated');
        document.getElementById('comunaUsuario').disabled = true;
    });

    document.getElementById('guardarUsuario').addEventListener('click', () => {
        // Realizar validaciones personalizadas aquí antes de guardar...
        if (formUsuario.checkValidity() && validarRun(formUsuario.runUsuario.value) && validarCorreo(formUsuario.correoUsuario.value)) {
            guardarUsuario();
        } else {
            formUsuario.classList.add('was-validated');
        }
    });
}


// Exponer funciones al objeto global
window.editarUsuario = editarUsuario;
window.eliminarUsuario = eliminarUsuario;