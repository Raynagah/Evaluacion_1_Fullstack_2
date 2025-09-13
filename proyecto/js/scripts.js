// Variables globales
let listaProductos = [];
let listaUsuarios = [];

// Claves para LocalStorage
const CLAVE_PRODUCTOS = 'tiendaDuoc_productos';
const CLAVE_USUARIOS = 'tiendaDuoc_usuarios';

// Función para inicializar la aplicación
function inicializarAplicacion() {
    cargarDatosAlmacenados();
    configurarEventListeners();
    
    // Cargar regiones si estamos en la página de usuarios
    if (document.getElementById('regionUsuario')) {
        // Esperar a que el DOM esté completamente listo
        setTimeout(cargarRegiones, 100);
    }
}

// Función para cargar datos desde LocalStorage
function cargarDatosAlmacenados() {
    // Cargar productos
    const productosAlmacenados = localStorage.getItem(CLAVE_PRODUCTOS);
    if (productosAlmacenados) {
        listaProductos = JSON.parse(productosAlmacenados);
    } else {
        // Datos de ejemplo si no hay nada almacenado
        listaProductos = [
            {
                codigo: 'AZZ001',
                nombre: 'Azzaro The Most Wanted',
                descripcion: 'Fragancia intensa y seductora para hombre',
                precio: 59990,
                stock: 15,
                stockCritico: 5,
                categoria: 'hombre',
                imagen: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxZjBmNiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2YjM3ODAiPlBlcmZ1bWUgSW1hZ2VuPC90ZXh0Pjwvc3ZnPg=='
            },
            {
                codigo: 'CHN002',
                nombre: 'Chanel N°5',
                descripcion: 'Clásico y elegante perfume para mujer',
                precio: 89990,
                stock: 8,
                stockCritico: 3,
                categoria: 'mujer',
                imagen: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxZjBmNiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2YjM3ODAiPlBlcmZ1bWUgSW1hZ2VuPC90ZXh0Pjwvc3ZnPg=='
            }
        ];
        guardarEnLocalStorage(CLAVE_PRODUCTOS, listaProductos);
    }
    
    // Cargar usuarios
    // Los RUTs deben ser válidos, de lo contrario no dejará guardarlos ni editarlos, ojito con eso o.O
    const usuariosAlmacenados = localStorage.getItem(CLAVE_USUARIOS);
    if (usuariosAlmacenados) {
        listaUsuarios = JSON.parse(usuariosAlmacenados);
    } else {
        // Datos de ejemplo si no hay nada almacenado
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
    
    // Mostrar productos en la página principal
    if (document.getElementById('listaProductos')) {
        mostrarProductosEnHome();
    }
    
    // Mostrar productos en la página de gestión
    if (document.getElementById('tablaProductos')) {
        mostrarProductosEnTabla();
    }
    
    // Mostrar usuarios en la tabla de gestión
    if (document.getElementById('tablaUsuarios')) {
        mostrarUsuariosEnTabla();
    }
}

// Función para guardar datos en LocalStorage
function guardarEnLocalStorage(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}

// Función para cargar regiones
function cargarRegiones() {
    const selectRegion = document.getElementById('regionUsuario');
    
    // Verificar si el elemento existe
    if (!selectRegion) {
        console.error('No se encontró el elemento regionUsuario');
        return;
    }
    
    // Limpiar opciones existentes (excepto la primera)
    while (selectRegion.options.length > 1) {
        selectRegion.remove(1);
    }
    
    // Verificar si regionesChile está definido
    if (typeof regionesChile === 'undefined') {
        console.error('regionesChile no está definido - Verifique que el archivo regiones-comunas.js esté cargado');
        return;
    }
    
    // Agregar regiones desde el archivo regiones-comunas.js
    regionesChile.forEach(region => {
        const option = document.createElement('option');
        option.value = region.id;
        option.textContent = region.nombre;
        selectRegion.appendChild(option);
    });
    
    console.log('Regiones cargadas correctamente');
}

// Función para cargar comunas según la región seleccionada
function cargarComunas(idRegion) {
    const selectComuna = document.getElementById('comunaUsuario');
    
    if (!selectComuna) {
        console.error('No se encontró el elemento comunaUsuario');
        return;
    }
    
    // Limpiar opciones existentes (excepto la primera)
    while (selectComuna.options.length > 1) {
        selectComuna.remove(1);
    }
    
    // Si no hay región seleccionada, deshabilitar comunas
    if (!idRegion) {
        selectComuna.disabled = true;
        return;
    }
    
    const region = regionesChile.find(r => r.id == idRegion);
    
    if (region) {
        // Habilitar el select de comunas
        selectComuna.disabled = false;
        
        // Agregar comunas de la región seleccionada
        region.comunas.forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna;
            option.textContent = comuna;
            selectComuna.appendChild(option);
        });
    } else {
        // Deshabilitar el select de comunas si no hay región seleccionada
        selectComuna.disabled = true;
    }
}

// Función para guardar producto
function guardarProducto() {
    // Obtener valores del formulario
    const codigo = document.getElementById('codigoProducto').value;
    const nombre = document.getElementById('nombreProducto').value;
    const descripcion = document.getElementById('descripcionProducto').value;
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const stock = parseInt(document.getElementById('stockProducto').value);
    const stockCritico = document.getElementById('stockCriticoProducto').value ? 
        parseInt(document.getElementById('stockCriticoProducto').value) : null;
    const categoria = document.getElementById('categoriaProducto').value;
    
    // Manejar la imagen (en una implementación real, se necesitaría procesar el archivo)
    const imagenInput = document.getElementById('imagenProducto');
    let imagen = '';
    if (imagenInput.files && imagenInput.files[0]) {
        // En una implementación real, aquí se procesaría la imagen
        // Por ahora, usaremos una imagen placeholder
        imagen = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxZjBmNiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2YjM3ODAiPlBlcmZ1bWUgSW1hZ2VuPC90ZXh0Pjwvc3ZnPg==';
    }
    
    // Verificar si es un nuevo producto o una edición
    const productoExistente = listaProductos.find(p => p.codigo === codigo);
    
    if (productoExistente) {
        // Actualizar producto existente
        Object.assign(productoExistente, {
            nombre,
            descripcion,
            precio,
            stock,
            stockCritico,
            categoria,
            imagen: imagen || productoExistente.imagen
        });
    } else {
        // Agregar nuevo producto
        listaProductos.push({
            codigo,
            nombre,
            descripcion,
            precio,
            stock,
            stockCritico,
            categoria,
            imagen: imagen || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxZjBmNiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2YjM3ODAiPlBlcmZ1bWUgSW1hZ2VuPC90ZXh0Pjwvc3ZnPg=='
        });
    }
    
    // Guardar en LocalStorage
    guardarEnLocalStorage(CLAVE_PRODUCTOS, listaProductos);
    
    // Actualizar la visualización
    if (document.getElementById('listaProductos')) {
        mostrarProductosEnHome();
    }
    if (document.getElementById('tablaProductos')) {
        mostrarProductosEnTabla();
    }
    
    // Mostrar mensaje de éxito
    alert('Producto guardado correctamente');
    
    // Cerrar el modal y limpiar el formulario
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalProducto'));
    modal.hide();
    document.getElementById('formProducto').reset();
    document.getElementById('formProducto').classList.remove('was-validated');
}

// Función para guardar usuario
function guardarUsuario() {
    // Obtener valores del formulario
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
    
    // Verificar si es un nuevo usuario o una edición
    const usuarioExistente = listaUsuarios.find(u => u.run === run);
    
    if (usuarioExistente) {
        // Actualizar usuario existente
        Object.assign(usuarioExistente, {
            nombre,
            apellidos,
            correo,
            contrasena: contrasena || usuarioExistente.contrasena,
            fechaNacimiento,
            tipoUsuario,
            region,
            comuna,
            direccion
        });
    } else {
        // Agregar nuevo usuario
        listaUsuarios.push({
            run,
            nombre,
            apellidos,
            correo,
            contrasena,
            fechaNacimiento,
            tipoUsuario,
            region,
            comuna,
            direccion
        });
    }
    
    // Guardar en LocalStorage
    guardarEnLocalStorage(CLAVE_USUARIOS, listaUsuarios);
    
    // Actualizar la visualización
    if (document.getElementById('tablaUsuarios')) {
        mostrarUsuariosEnTabla();
    }
    
    // Mostrar mensaje de éxito
    alert('Usuario guardado correctamente');
    
    // Cerrar el modal y limpiar el formulario
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalUsuario'));
    modal.hide();
    document.getElementById('formUsuario').reset();
    document.getElementById('formUsuario').classList.remove('was-validated');
    
    // Restablecer el select de comunas
    document.getElementById('comunaUsuario').disabled = true;
}

// Función para eliminar producto
function eliminarProducto(codigo) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
        listaProductos = listaProductos.filter(p => p.codigo !== codigo);
        guardarEnLocalStorage(CLAVE_PRODUCTOS, listaProductos);
        
        // Actualizar la visualización
        if (document.getElementById('listaProductos')) {
            mostrarProductosEnHome();
        }
        if (document.getElementById('tablaProductos')) {
            mostrarProductosEnTabla();
        }
        
        alert('Producto eliminado correctamente');
    }
}

// Función para eliminar usuario
function eliminarUsuario(run) {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        listaUsuarios = listaUsuarios.filter(u => u.run !== run);
        guardarEnLocalStorage(CLAVE_USUARIOS, listaUsuarios);
        
        // Actualizar la visualización
        if (document.getElementById('tablaUsuarios')) {
            mostrarUsuariosEnTabla();
        }
        
        alert('Usuario eliminado correctamente');
    }
}

// Función para editar producto
function editarProducto(codigo) {
    const producto = listaProductos.find(p => p.codigo === codigo);
    if (!producto) return;
    
    // Llenar el formulario con los datos del producto
    document.getElementById('codigoProducto').value = producto.codigo;
    document.getElementById('nombreProducto').value = producto.nombre;
    document.getElementById('descripcionProducto').value = producto.descripcion || '';
    document.getElementById('precioProducto').value = producto.precio;
    document.getElementById('stockProducto').value = producto.stock;
    document.getElementById('stockCriticoProducto').value = producto.stockCritico || '';
    document.getElementById('categoriaProducto').value = producto.categoria;
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
    modal.show();
    
    // Cambiar el título del modal
    document.getElementById('modalProductoLabel').textContent = 'Editar Producto';
}

// Función para editar usuario
function editarUsuario(run) {
    const usuario = listaUsuarios.find(u => u.run === run);
    if (!usuario) return;
    
    // Llenar el formulario con los datos del usuario
    document.getElementById('runUsuario').value = usuario.run;
    document.getElementById('nombreUsuario').value = usuario.nombre;
    document.getElementById('apellidosUsuario').value = usuario.apellidos;
    document.getElementById('correoUsuario').value = usuario.correo;
    document.getElementById('contrasenaUsuario').value = usuario.contrasena;
    document.getElementById('fechaNacimientoUsuario').value = usuario.fechaNacimiento || '';
    document.getElementById('tipoUsuario').value = usuario.tipoUsuario;
    document.getElementById('direccionUsuario').value = usuario.direccion;
    
    // Seleccionar región y comuna
    const regionSelect = document.getElementById('regionUsuario');
    for (let i = 0; i < regionSelect.options.length; i++) {
        if (regionSelect.options[i].text === usuario.region) {
            regionSelect.selectedIndex = i;
            break;
        }
    }
    
    // Disparar el evento change para cargar las comunas
    const event = new Event('change');
    regionSelect.dispatchEvent(event);
    
    // Esperar a que se carguen las comunas
    setTimeout(() => {
        const comunaSelect = document.getElementById('comunaUsuario');
        for (let i = 0; i < comunaSelect.options.length; i++) {
            if (comunaSelect.options[i].text === usuario.comuna) {
                comunaSelect.selectedIndex = i;
                break;
            }
        }
    }, 100);
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('modalUsuario'));
    modal.show();
    
    // Cambiar el título del modal
    document.getElementById('modalUsuarioLabel').textContent = 'Editar Usuario';
}

// Función para mostrar productos en tabla
function mostrarProductosEnTabla() {
    const tabla = document.getElementById('tablaProductos');
    if (!tabla) return;
    
    tabla.innerHTML = '';
    
    listaProductos.forEach(producto => {
        const fila = document.createElement('tr');
        
        // Determinar clase según stock crítico
        let claseFila = '';
        if (producto.stockCritico && producto.stock <= producto.stockCritico) {
            claseFila = 'table-warning';
        } else if (producto.stock === 0) {
            claseFila = 'table-danger';
        }
        
        fila.className = claseFila;
        
        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toLocaleString('es-CL')}</td>
            <td>${producto.stock}</td>
            <td>${producto.categoria}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editarProducto('${producto.codigo}')">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto('${producto.codigo}')">Eliminar</button>
            </td>
        `;
        
        tabla.appendChild(fila);
    });
}

// Función para mostrar usuarios en tabla
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

// Función para mostrar productos en home (placeholder)
function mostrarProductosEnHome() {
    // Esta función debe implementarse según tu necesidad específica
    console.log('Mostrando productos en home');
}

// Funciones de validación
function validarRun(run) {
    // Validación básica de RUN chileno
    if (!/^[0-9]+[0-9kK]{1}$/.test(run)) {
        return false;
    }
    
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1).toLowerCase();
    
    let suma = 0;
    let multiplo = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    
    const dvEsperado = 11 - (suma % 11);
    let dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'k' : dvEsperado.toString();
    
    return dv === dvFinal;
}

function validarCorreo(correo) {
    // Validar que el correo sea de dominios permitidos
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
}

// Función para configurar event listeners
function configurarEventListeners() {
    // Event listener para cambio de región
    const regionSelect = document.getElementById('regionUsuario');
    if (regionSelect) {
        regionSelect.addEventListener('change', function() {
            const idRegion = this.value;
            cargarComunas(idRegion);
        });
    }
    
    // Validación de formulario de producto
    if (document.getElementById('formProducto')) {
        const formProducto = document.getElementById('formProducto');
        const guardarProductoBtn = document.getElementById('guardarProducto');
        
        // Restablecer el título del modal cuando se cierra
        document.getElementById('modalProducto').addEventListener('hidden.bs.modal', function () {
            document.getElementById('modalProductoLabel').textContent = 'Nuevo Producto';
            formProducto.reset();
            formProducto.classList.remove('was-validated');
        });
        
        if (guardarProductoBtn) {
            guardarProductoBtn.addEventListener('click', function() {
                if (formProducto.checkValidity()) {
                    guardarProducto();
                } else {
                    formProducto.classList.add('was-validated');
                }
            });
        }
    }
    
    // Validación de formulario de usuario
    if (document.getElementById('formUsuario')) {
        const formUsuario = document.getElementById('formUsuario');
        const guardarUsuarioBtn = document.getElementById('guardarUsuario');
        const runInput = document.getElementById('runUsuario');
        const correoInput = document.getElementById('correoUsuario');
        const contrasenaInput = document.getElementById('contrasenaUsuario');
        
        // Restablecer el título del modal cuando se cierra
        document.getElementById('modalUsuario').addEventListener('hidden.bs.modal', function () {
            document.getElementById('modalUsuarioLabel').textContent = 'Nuevo Usuario';
            formUsuario.reset();
            formUsuario.classList.remove('was-validated');
            const comunaSelect = document.getElementById('comunaUsuario');
            if (comunaSelect) {
                comunaSelect.disabled = true;
            }
            // Limpiar la variable de edición y habilitar el campo RUN
            usuarioEnEdicion = null;
            const runInput = document.getElementById('runUsuario');
            if (runInput) {
                runInput.disabled = false;
            }
        });
        
        // Validar RUT en tiempo real
        if (runInput) {
            runInput.addEventListener('blur', function() {
                if (this.value && !validarRun(this.value)) {
                    this.setCustomValidity('RUN inválido. Debe ser un RUN chileno válido sin puntos ni guion.');
                } else {
                    this.setCustomValidity('');
                }
            });
        }
        
        // Validar correo en tiempo real
        if (correoInput) {
            correoInput.addEventListener('blur', function() {
                if (this.value && !validarCorreo(this.value)) {
                    this.setCustomValidity('Solo se permiten correos de @duoc.cl, @profesor.duoc.cl o @gmail.com');
                } else {
                    this.setCustomValidity('');
                }
            });
        }
        
        // Validar contraseña en tiempo real
        if (contrasenaInput) {
            contrasenaInput.addEventListener('blur', function() {
                if (this.value && (this.value.length < 4 || this.value.length > 10)) {
                    this.setCustomValidity('La contraseña debe tener entre 4 y 10 caracteres.');
                } else {
                    this.setCustomValidity('');
                }
            });
        }
        
        if (guardarUsuarioBtn) {
            guardarUsuarioBtn.addEventListener('click', function() {
                // Validaciones personalizadas
                if (runInput && runInput.value && !validarRun(runInput.value)) {
                    runInput.setCustomValidity('RUN inválido. Debe ser un RUN chileno válido sin puntos ni guion.');
                    runInput.reportValidity();
                    return;
                }
                
                if (correoInput && correoInput.value && !validarCorreo(correoInput.value)) {
                    correoInput.setCustomValidity('Solo se permiten correos de @duoc.cl, @profesor.duoc.cl o @gmail.com');
                    correoInput.reportValidity();
                    return;
                }
                
                if (contrasenaInput && contrasenaInput.value && (contrasenaInput.value.length < 4 || contrasenaInput.value.length > 10)) {
                    contrasenaInput.setCustomValidity('La contraseña debe tener entre 4 y 10 caracteres.');
                    contrasenaInput.reportValidity();
                    return;
                }
                
                if (formUsuario.checkValidity()) {
                    guardarUsuario();
                } else {
                    formUsuario.classList.add('was-validated');
                }
            });
        }
    }
}

// Asegurarse de que las funciones estén disponibles globalmente
window.editarProducto = editarProducto;
window.eliminarProducto = eliminarProducto;
window.editarUsuario = editarUsuario;
window.eliminarUsuario = eliminarUsuario;
window.cargarRegiones = cargarRegiones;
window.cargarComunas = cargarComunas;

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', inicializarAplicacion);

// Por favor no te caigaasssssssssssssssssssssssssssssss D: