document.addEventListener('DOMContentLoaded', () => {
    // CORRECCIÓN 1: Apuntamos al ID correcto de tu formulario: 'form-registro'.
    const form = document.getElementById('form-registro');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenimos el envío automático.

        // Recolectamos los campos del formulario.
        const correoInput = document.getElementById('correo');
        const confirmarCorreoInput = document.getElementById('confirmarCorreo');
        const passInput = document.getElementById('password'); // ID de tu HTML
        const confirmPassInput = document.getElementById('confirmarPassword'); // ID de tu HTML

        // --- Validaciones Personalizadas ---
        let esValido = true;

        // 1. Validar que los correos coincidan.
        if (correoInput.value !== confirmarCorreoInput.value) {
            alert('Los correos electrónicos no coinciden.');
            esValido = false;
        }

        // 2. Validar que las contraseñas coincidan.
        if (passInput.value !== confirmPassInput.value) {
            alert('Las contraseñas no coinciden.');
            esValido = false;
        }
        
        // Si alguna validación falló, nos detenemos aquí.
        if (!esValido) {
            return; 
        }

        // Si las validaciones pasan, intentamos registrar al usuario.
        registrarUsuario();
    });

    function registrarUsuario() {
        // Usamos la misma clave que el panel de administrador.
        const claveUsuarios = 'tiendaDuoc_usuarios';
        let usuarios = JSON.parse(localStorage.getItem(claveUsuarios)) || [];

        // CORRECCIÓN 2: Leemos desde 'rut', no 'run'.
        const run = document.getElementById('rut').value;
        const correo = document.getElementById('correo').value;

        // Verificamos si el usuario ya existe.
        const usuarioExistente = usuarios.find(user => user.run === run || user.correo === correo);
        if (usuarioExistente) {
            alert('El RUT o el correo electrónico ya se encuentran registrados.');
            return;
        }

        // Creamos el objeto de usuario completo con todos los datos del formulario.
        const nuevoUsuario = {
            // Se usa 'run' para ser compatible con la vista de admin.
            run: run, 
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value,
            correo: correo,
            // Se usa 'contrasena' para ser compatible con la vista de admin.
            contrasena: document.getElementById('password').value,
            tipoUsuario: document.getElementById('tipoUsuario').value,
            fechaNacimiento: document.getElementById('fechaNacimiento').value,
            region: document.getElementById('region').value,
            comuna: document.getElementById('comuna').value,
            direccion: document.getElementById('direccion').value
        };

        // Guardamos el nuevo usuario.
        usuarios.push(nuevoUsuario);
        localStorage.setItem(claveUsuarios, JSON.stringify(usuarios));

        alert('¡Registro completado con éxito! Serás redirigido para iniciar sesión.');
        window.location.href = 'login.html';
    }
    cargarRegiones('region', 'comuna');
});