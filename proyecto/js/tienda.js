document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');


    // 1. Leemos los productos de la "bodega" (localStorage)
    const productos = JSON.parse(localStorage.getItem('tiendaDuoc_productos')) || []; // <-- Clave correcta
    // ...

    // 2. Verificamos si hay productos para mostrar
    if (productos.length === 0) {
        productosContainer.innerHTML = '<h4 class="text-center text-secondary">Aún no se han agregado productos a la tienda.</h4>';
        return; // Detenemos la ejecución si no hay nada que mostrar
    }

    // 3. Si hay productos, creamos el HTML para cada uno
    productos.forEach(producto => {
        // Usamos los datos del producto (nombre, precio, etc.) para crear la tarjeta
        const cardProducto = `
            <div class="col-md-3">
              <div class="card card-producto h-100">
                <img src="${producto.imagen || '../img/default-perfume.png'}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="precio-internet">$${producto.precio.toLocaleString('es-CL')}</p>
                  <a href="detallesProducto.html?id=${producto.codigo}" class="btn btn-purple mt-auto">Ver más</a>
                </div>
              </div>
            </div>
        `;
        // Agregamos la nueva tarjeta al contenedor
        productosContainer.innerHTML += cardProducto;
    });
});