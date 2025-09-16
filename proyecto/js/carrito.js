// Espera a que el contenido del HTML se cargue.
document.addEventListener('DOMContentLoaded', () => {
    // --- GUARDIÁN DE SESIÓN ---
    // Verificamos si hay una sesión activa al cargar la página.
    const sesionActiva = JSON.parse(localStorage.getItem('sesionActiva'));

    if (!sesionActiva) {
        // Si no hay sesión, mostramos una alerta y redirigimos al login.
        alert('Debes iniciar sesión para ver tu carrito.');
        window.location.href = 'login.html';
        return; // Detenemos la ejecución del resto del script.
    }
    // --- FIN DEL GUARDIÁN ---
    // Seleccionamos los elementos clave del HTML del carrito.
    const tbody = document.querySelector('tbody');
    const resumenSubtotal = document.getElementById('resumen-subtotal');
    const resumenTotal = document.getElementById('resumen-total');
    const contadorCarrito = document.getElementById('contador-carrito');
    const botonVaciar = document.getElementById('boton-vaciar');

    // Carga el carrito desde localStorage o lo inicializa como un arreglo vacío.
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para guardar el carrito en localStorage.
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para dibujar los productos en la tabla.
    function renderizarCarrito() {
        tbody.innerHTML = ''; // Limpia la tabla antes de volver a dibujarla.

        if (carrito.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">Tu carrito está vacío</td></tr>';
        } else {
            carrito.forEach(producto => {
                const subtotalProducto = producto.precio * producto.cantidad;
                const tr = document.createElement('tr');
                // CAMBIO CLAVE: Usamos 'producto.codigo' para el data-id.
                tr.innerHTML = `
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${producto.imagen || '../img/default-perfume.png'}" alt="${producto.nombre}" class="img-thumbnail me-3" width="80">
                            <div><h6 class="mb-0">${producto.nombre}</h6></div>
                        </div>
                    </td>
                    <td>$${producto.precio.toLocaleString('es-CL')}</td>
                    <td>
                        <div class="input-group" style="width: 120px;">
                            <button class="btn btn-outline-secondary btn-restar" data-id="${producto.codigo}">-</button>
                            <input type="text" class="form-control text-center" value="${producto.cantidad}" readonly>
                            <button class="btn btn-outline-secondary btn-sumar" data-id="${producto.codigo}">+</button>
                        </div>
                    </td>
                    <td>$${subtotalProducto.toLocaleString('es-CL')}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${producto.codigo}">&times;</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
        actualizarResumen();
    }

    // Función para calcular y mostrar los totales.
    function actualizarResumen() {
        let subtotalGeneral = 0;
        let totalItems = 0;
        carrito.forEach(producto => {
            subtotalGeneral += producto.precio * producto.cantidad;
            totalItems += producto.cantidad;
        });

        resumenSubtotal.textContent = `$${subtotalGeneral.toLocaleString('es-CL')}`;
        resumenTotal.textContent = `$${subtotalGeneral.toLocaleString('es-CL')}`;
        if (contadorCarrito) {
            contadorCarrito.textContent = `(${totalItems})`;
        }
    }

    // Manejador de eventos para los botones (+, -, eliminar).
    tbody.addEventListener('click', (e) => {
        // CAMBIO CLAVE: Obtenemos el código (que puede ser texto, como 'AZZ001').
        const codigo = e.target.dataset.id;
        if (!codigo) return; // Si no hay código, no hacemos nada.

        // CAMBIO CLAVE: Buscamos y filtramos usando 'p.codigo' en lugar de 'p.id'.
        const producto = carrito.find(p => p.codigo == codigo);

        if (e.target.classList.contains('btn-sumar')) {
            if (producto) producto.cantidad++;
        }
        if (e.target.classList.contains('btn-restar')) {
            if (producto && producto.cantidad > 1) producto.cantidad--;
        }
        if (e.target.classList.contains('btn-eliminar')) {
            carrito = carrito.filter(p => p.codigo != codigo);
        }

        guardarCarrito();
        renderizarCarrito();
    });

    // Evento para el botón de vaciar carrito.
    botonVaciar.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            carrito = [];
            guardarCarrito();
            renderizarCarrito();
        }
    });

    // Dibuja el carrito al cargar la página.
    renderizarCarrito();
});