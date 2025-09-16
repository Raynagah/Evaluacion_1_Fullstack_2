// Espera a que todo el contenido del HTML se cargue antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {

    // --- VARIABLES Y DATOS INICIALES ---

    // Este es un arreglo de productos de ejemplo. En un sitio real, estos datos
    // vendrían de una base de datos o de otra página al hacer clic en "Añadir al carrito".
    const productosDeEjemplo = [
        {
            id: 1,
            nombre: 'Fragancia Nocturna',
            precio: 34990,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR809Q4Aq9sAyaug7uoTFzyiVPUIvCllt76Vw&s',
            cantidad: 1
        },
        {
            id: 2,
            nombre: 'Esencia Fresca',
            precio: 29990,
            imagen: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3',
            cantidad: 2
        },
        {
            id: 3,
            nombre: 'Aroma Elegante',
            precio: 39990,
            imagen: 'https://i5.walmartimages.com/asr/2e062367-ebdc-47d9-a1d6-31593e838427.8f53dc1eb2ce05c9700d2e8f7a89f3b4.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
            cantidad: 1
        }
    ];

    // Intenta obtener el carrito de localStorage. Si no existe, usa los productos de ejemplo.
    let carrito = JSON.parse(localStorage.getItem('carrito')) || productosDeEjemplo;

    // Seleccionamos los elementos del HTML que vamos a necesitar manipular.
    const tbody = document.querySelector('tbody');
    const resumenSubtotal = document.getElementById('resumen-subtotal');
    const resumenTotal = document.getElementById('resumen-total');
    const contadorCarrito = document.getElementById('contador-carrito');
    const botonVaciar = document.getElementById('boton-vaciar');


    // --- FUNCIONES ---

    /**
     * Guarda el estado actual del carrito en localStorage.
     */
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    /**
     * Dibuja los productos del carrito en la tabla del HTML.
     */
    function renderizarCarrito() {
        // Limpia el contenido actual de la tabla para no duplicar productos.
        tbody.innerHTML = '';

        // Si el carrito está vacío, muestra un mensaje.
        if (carrito.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">Tu carrito está vacío</td></tr>';
            return;
        }
        
        // Recorre cada producto en el arreglo 'carrito'.
        carrito.forEach(producto => {
            // Crea una nueva fila (<tr>) en la tabla.
            const tr = document.createElement('tr');
            
            // Calcula el subtotal para este producto.
            const subtotalProducto = producto.precio * producto.cantidad;
            
            // Rellena la fila con la información del producto.
            // Usamos 'data-id' para saber a qué producto pertenecen los botones.
            tr.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-thumbnail me-3" width="80">
                        <div>
                            <h6 class="mb-0">${producto.nombre}</h6>
                        </div>
                    </div>
                </td>
                <td>$${producto.precio.toLocaleString('es-CL')}</td>
                <td>
                    <div class="input-group" style="width: 120px;">
                        <button class="btn btn-outline-secondary btn-restar" data-id="${producto.id}" type="button">-</button>
                        <input type="text" class="form-control text-center" value="${producto.cantidad}" readonly>
                        <button class="btn btn-outline-secondary btn-sumar" data-id="${producto.id}" type="button">+</button>
                    </div>
                </td>
                <td>$${subtotalProducto.toLocaleString('es-CL')}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${producto.id}">
                        &times; </button>
                </td>
            `;
            
            // Añade la fila completa a la tabla.
            tbody.appendChild(tr);
        });

        // Después de dibujar todo, actualiza los totales.
        actualizarResumen();
    }

    /**
     * Calcula y muestra los totales (subtotal, total y contador de ítems).
     */
    function actualizarResumen() {
        let subtotal = 0;
        let totalItems = 0;

        // Suma los precios y cantidades de cada producto en el carrito.
        carrito.forEach(producto => {
            subtotal += producto.precio * producto.cantidad;
            totalItems += producto.cantidad;
        });
        
        // Muestra los valores calculados en el HTML.
        resumenSubtotal.textContent = `$${subtotal.toLocaleString('es-CL')}`;
        resumenTotal.textContent = `$${subtotal.toLocaleString('es-CL')}`; // Asumimos que no hay descuentos por ahora.
        contadorCarrito.textContent = `(${totalItems})`;
    }

    /**
     * Vacía completamente el carrito.
     */
    function vaciarCarrito() {
        carrito = []; // El arreglo de productos ahora está vacío.
        guardarCarrito(); // Guarda el carrito vacío en localStorage.
        renderizarCarrito(); // Vuelve a dibujar el carrito (que ahora mostrará el mensaje de vacío).
    }


    // --- EVENTOS ---

    // Añadimos un único "escuchador" de clics a la tabla.
    // Esto es más eficiente que poner un escuchador en cada botón.
    tbody.addEventListener('click', (e) => {
        const productoId = parseInt(e.target.dataset.id);

        // Si se hizo clic en un botón de sumar...
        if (e.target.classList.contains('btn-sumar')) {
            const producto = carrito.find(p => p.id === productoId);
            if (producto) producto.cantidad++;
        }

        // Si se hizo clic en un botón de restar...
        if (e.target.classList.contains('btn-restar')) {
            const producto = carrito.find(p => p.id === productoId);
            // Solo resta si la cantidad es mayor que 1.
            if (producto && producto.cantidad > 1) {
                producto.cantidad--;
            }
        }
        
        // Si se hizo clic en un botón de eliminar...
        if (e.target.classList.contains('btn-eliminar')) {
            // Crea un nuevo carrito con todos los productos MENOS el que se quiere eliminar.
            carrito = carrito.filter(p => p.id !== productoId);
        }

        // Después de cualquier cambio, guarda y vuelve a dibujar todo.
        guardarCarrito();
        renderizarCarrito();
    });

    // Evento para el botón de "Vaciar Carrito".
    botonVaciar.addEventListener('click', vaciarCarrito);


    // --- INICIO ---
    // Al cargar la página, dibuja el carrito por primera vez.
    renderizarCarrito();
});