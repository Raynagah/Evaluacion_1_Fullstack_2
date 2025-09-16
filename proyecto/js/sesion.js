// Espera a que el contenido del HTML se cargue.
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos los elementos de la navegación que vamos a mostrar u ocultar.
    const linkLogin = document.getElementById('link-login');
    const linkLogout = document.getElementById('link-logout');
    const linkCarrito = document.getElementById('link-carrito');
    // Revisamos si existe la variable 'sesionActiva' en localStorage.
    const sesionActiva = JSON.parse(localStorage.getItem('sesionActiva'));

    if (sesionActiva) {
        // Si hay una sesión activa:
        // 1. Ocultamos el botón de "Iniciar Sesión".
        if (linkLogin) linkLogin.style.display = 'none';
        // 2. Mostramos el botón de "Cerrar Sesión".
        if (linkLogout) linkLogout.style.display = 'block';
        // 3. Mostramos el botón de "Carrito" (si existe).
        if (linkCarrito) linkCarrito.style.display = 'block';
    } else {
        // Si NO hay una sesión activa:
        // 1. Mostramos el botón de "Iniciar Sesión".
        if (linkLogin) linkLogin.style.display = 'block';
        // 2. Ocultamos el botón de "Cerrar Sesión".
        if (linkLogout) linkLogout.style.display = 'none';
        // 3. Ocultamos el botón de "Carrito" (si existe).
        if (linkCarrito) linkCarrito.style.display = 'none';
    }

    // Añadimos el evento al botón de "Cerrar Sesión".
    if (linkLogout) {
        linkLogout.addEventListener('click', (event) => {
            // Prevenimos que el enlace haga su acción por defecto.
            event.preventDefault(); 
            
            // Eliminamos la variable 'sesionActiva' de localStorage.
            localStorage.removeItem('sesionActiva');
            
            // Damos un mensaje de confirmación.
            alert('Has cerrado la sesión.');
            
            // Redirigimos al usuario a la página de inicio.
            window.location.href = 'index.html';
        });
    }
});