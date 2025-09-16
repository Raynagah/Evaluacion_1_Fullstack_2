// ../js/detalle.js

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

    // --- LÓGICA DEL CARRITO MEJORADA ---
    const agregarBtn = document.getElementById('agregarCarroBtn');
    agregarBtn.addEventListener('click', () => {
        // 1. Obtener el carrito actual de localStorage o crear uno nuevo si no existe.
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // 2. Revisar si el producto ya está en el carrito.
        const productoEnCarrito = carrito.find(item => item.codigo == productoEncontrado.codigo);

        if (productoEnCarrito) {
            // Si ya está, incrementamos la cantidad.
            productoEnCarrito.cantidad++;
        } else {
            // Si es nuevo, lo agregamos con cantidad 1.
            carrito.push({ ...productoEncontrado, cantidad: 1 });
        }

        // 3. Guardar el carrito actualizado de vuelta en localStorage.
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        // 4. Notificar al usuario.
        alert(`"${productoEncontrado.nombre}" ha sido agregado al carrito.`);
    });
});