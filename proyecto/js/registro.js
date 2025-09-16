// Esperamos a que todo el HTML se haya cargado para ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos el formulario de registro por su ID.
    const formRegistro = document.getElementById('form-registro');

    formRegistro.addEventListener('submit', (event) => {
        // Prevenimos que el formulario se envíe de la forma tradicional.
        event.preventDefault();

        // Obtenemos los valores de los campos del formulario.
        const correo = document.getElementById('correo').value;
        
        // ===== CAMBIO: SE CORRIGIERON LOS ID DE LAS CONTRASEÑAS =====
        const password = document.getElementById('password').value;
        const confirmarPassword = document.getElementById('confirmarPassword').value;

        // Validación 1: Las contraseñas deben coincidir.
        if (password !== confirmarPassword) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return; // Detenemos la ejecución si no coinciden.
        }

        // Obtenemos la lista de usuarios de localStorage.
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Validación 2: El correo no debe estar ya registrado.
        const usuarioExistente = usuarios.find(usuario => usuario.correo === correo);
        if (usuarioExistente) {
            alert('Este correo electrónico ya está registrado.');
            return;
        }

        // Si todas las validaciones pasan, creamos el nuevo usuario.
        const nuevoUsuario = {
            correo: correo,
            password: password
        };

        // Añadimos el nuevo usuario al arreglo.
        usuarios.push(nuevoUsuario);

        // Guardamos el arreglo actualizado de vuelta en localStorage.
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Damos un mensaje de éxito y redirigimos al login.
        alert('¡Registro exitoso! Ahora serás redirigido para iniciar sesión.');
        window.location.href = 'login.html';
    });
});