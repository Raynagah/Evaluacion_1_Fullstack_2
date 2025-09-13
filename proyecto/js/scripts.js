// -------------------------------------------------
//          SCRIPT PRINCIPAL DE LA APLICACIÓN
// -------------------------------------------------

// Función de utilidad para guardar en LocalStorage
function guardarEnLocalStorage(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}

// Función principal que se ejecuta cuando el DOM está listo
function inicializarAplicacion() {
    console.log("Aplicación DuocFragancias inicializada.");
    
    // Inicia el módulo de productos (cargará datos, mostrará tablas, etc.)
    if (typeof inicializarProductos === 'function') {
        inicializarProductos();
    }
    
    // Inicia el módulo de usuarios (cargará datos, mostrará tablas, etc.)
    if (typeof inicializarUsuarios === 'function') {
        inicializarUsuarios();
    }
}

// Event listener para iniciar la aplicación
document.addEventListener('DOMContentLoaded', inicializarAplicacion);