// ../js/login.js

document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de que tu login.html tenga un form con id="form-login".
    const formLogin = document.getElementById('form-login');

    formLogin.addEventListener('submit', (event) => {
        event.preventDefault();

        const correo = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // CORRECCIÓN 1: Buscamos en 'tiendaDuoc_usuarios'.
        const claveUsuarios = 'tiendaDuoc_usuarios';
        const usuarios = JSON.parse(localStorage.getItem(claveUsuarios)) || [];
        
        // CORRECCIÓN 2: Comparamos con 'usuario.contrasena'.
        const usuarioValido = usuarios.find(usuario => usuario.correo === correo && usuario.contrasena === password);

        if (usuarioValido) {
            alert('¡Inicio de sesión exitoso!');
            
            // Guardamos toda la info del usuario en la sesión.
            localStorage.setItem('sesionActiva', JSON.stringify(usuarioValido));
            
            // Decidimos a dónde redirigir según el tipo de usuario.
            if (usuarioValido.tipoUsuario === 'administrador') {
                window.location.href = '../paginasAdmin/indexAdmin.html'; // O la página principal del admin.
            } else {
                window.location.href = '../html/index.html'; // Página principal para clientes.
            }

        } else {
            alert('Correo o contraseña incorrectos.');
        }
    });
});