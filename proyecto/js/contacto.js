// Se añade un "escuchador" al formulario para que se active al intentar enviarlo.
document.querySelector('form').addEventListener('submit', function(e) {
    // Previene que la página se recargue, que es el comportamiento por defecto.
    e.preventDefault();

    // 1. Obtener los valores de los campos del formulario, quitando espacios en blanco.
    let nombre = document.getElementById('nombre').value.trim();
    let correo = document.getElementById('email').value.trim(); // Corregido a 'email' para que coincida con tu HTML
    let mensaje = document.getElementById('mensaje').value.trim(); // Corregido a 'mensaje'

    // 2. Realizar las validaciones
    if (nombre === "" || nombre.length > 100) {
        alert("El nombre es requerido y debe tener un máximo de 100 caracteres.");
        return; // Detiene la ejecución si hay un error.
    }

    if (correo === "") {
        alert("El correo es requerido.");
        return;
    }
    
    if (correo.length > 100) {
        alert("El correo no debe superar los 100 caracteres.");
        return;
    }

    // Validación de dominio del correo
    if (
        !correo.endsWith("@duoc.cl") &&
        !correo.endsWith("@profesor.duoc.cl") &&
        !correo.endsWith("@gmail.com")
    ) {
        alert("El correo debe pertenecer a uno de los siguientes dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com");
        return;
    }

    if (mensaje === "" || mensaje.length > 500) {
        alert("El mensaje es requerido y debe tener un máximo de 500 caracteres.");
        return;
    }

    // 3. Si todas las validaciones pasan, se ejecuta esto:

    // Crear un objeto con los datos del contacto.
    let contacto = {
        nombre: nombre,
        correo: correo,
        mensaje: mensaje
    };

    // Obtener la lista de contactos guardada previamente en el almacenamiento local.
    // Si no existe, se crea una lista vacía.
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    // Agregar el nuevo contacto a la lista.
    contactos.push(contacto);
    // Guardar la lista actualizada en el almacenamiento local.
    localStorage.setItem("contactos", JSON.stringify(contactos));

    // Mostrar mensaje de éxito.
    alert("Mensaje enviado correctamente ✅");

    // Limpiar (resetear) todos los campos del formulario.
    e.target.reset();
});