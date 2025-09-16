document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('id');

    if (!productoId) {
        window.location.href = 'tienda.html';
        return;
    }
    // Tener cuidado acá con los nombres del localStorage, en este caso es tiendaDuoc_productos
    const productos = JSON.parse(localStorage.getItem('tiendaDuoc_productos')) || [];
    const productoEncontrado = productos.find(producto => producto.codigo == productoId);

    if (!productoEncontrado) {
        const detalleContainer = document.querySelector('.detalle');
        if (detalleContainer) {
            detalleContainer.innerHTML = '<h4 class="text-center text-danger my-5">Producto no encontrado.</h4>';
        }
        return;
    }

    document.getElementById('imagen').src = productoEncontrado.imagen || '../img/default-perfume.png';
    document.getElementById('nombre').textContent = productoEncontrado.nombre;
    document.getElementById('genero').textContent = productoEncontrado.categoria;
    document.getElementById('tipo').textContent = productoEncontrado.descripcion;
    document.getElementById('precio-internet').textContent = `$${productoEncontrado.precio.toLocaleString('es-CL')}`;

const agregarBtn = document.getElementById('agregarCarroBtn');
agregarBtn.addEventListener('click', () => {
    // Verificamos si hay una sesión activa ANTES de agregar al carrito.
    const sesionActiva = JSON.parse(localStorage.getItem('sesionActiva'));

    if (sesionActiva) {
        // --- Si hay sesión, la lógica del carrito funciona normal ---
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoEnCarrito = carrito.find(item => item.codigo == productoEncontrado.codigo);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ ...productoEncontrado, cantidad: 1 });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`"${productoEncontrado.nombre}" ha sido agregado al carrito.`);

    } else {
        // --- Si NO hay sesión, redirigimos al login ---
        alert('Debes iniciar sesión para agregar productos al carrito.');
        window.location.href = 'login.html';
    }
});
});