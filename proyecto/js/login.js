// Esperamos a que todo el HTML se haya cargado.
document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');

    formLogin.addEventListener('submit', (event) => {
        event.preventDefault();

        const correo = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioValido = usuarios.find(usuario => usuario.correo === correo && usuario.password === password);

        if (usuarioValido) {
            alert('¡Inicio de sesión exitoso!');
            
            // ===== LÍNEA AÑADIDA =====
            // Se crea la 'sesionActiva' para indicar que el usuario está conectado.
            localStorage.setItem('sesionActiva', JSON.stringify(usuarioValido));
            
            window.location.href = 'index.html';
        } else {
            alert('Correo o contraseña incorrectos.');
        }
    });
});