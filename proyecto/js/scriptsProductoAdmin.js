// Variables y constantes específicas para productos
let listaProductos = [];
const CLAVE_PRODUCTOS = 'tiendaDuoc_productos';

// Función para cargar y mostrar los productos
function inicializarProductos() {
    // Cargar desde LocalStorage o usar datos de ejemplo
    const productosAlmacenados = localStorage.getItem(CLAVE_PRODUCTOS);
    if (productosAlmacenados) {
        listaProductos = JSON.parse(productosAlmacenados);
    } else {
        listaProductos = [
            {
                codigo: 'AZZ001',
                nombre: 'Azzaro The Most Wanted',
                descripcion: 'Fragancia intensa y seductora para hombre',
                precio: 59990,
                stock: 15,
                stockCritico: 5,
                categoria: 'hombre',
                imagen: '../img/perfume_azzaro.png'
            },
            {
                codigo: 'CHN002',
                nombre: 'Chanel N°5',
                descripcion: 'Clásico y elegante perfume para mujer',
                precio: 89990,
                stock: 8,
                stockCritico: 3,
                categoria: 'mujer',
                imagen: '../img/CHPerfumesMujer.webp' 
            }
        ];
        guardarEnLocalStorage(CLAVE_PRODUCTOS, listaProductos);
    }

    // Mostrar productos si estamos en la página correcta
    if (document.getElementById('tablaProductos')) {
        mostrarProductosEnTabla();
    }
    if (document.getElementById('listaProductos')) {
        mostrarProductosEnHome();
    }
    
    // Configurar listeners del formulario de productos
    configurarListenersProducto();
}

// Función para mostrar productos en la tabla de administración
function mostrarProductosEnTabla() {
    const tabla = document.getElementById('tablaProductos');
    if (!tabla) return;
    
    tabla.innerHTML = '';
    listaProductos.forEach(producto => {
        const fila = document.createElement('tr');
        let claseFila = '';
        if (producto.stockCritico && producto.stock <= producto.stockCritico) {
            claseFila = 'table-warning';
        } else if (producto.stock === 0) {
            claseFila = 'table-danger';
        }
        fila.className = claseFila;
        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toLocaleString('es-CL')}</td>
            <td>${producto.stock}</td>
            <td>${producto.categoria}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editarProducto('${producto.codigo}')">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto('${producto.codigo}')">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// Función para mostrar productos en la página de inicio
function mostrarProductosEnHome() {
    console.log('Mostrando productos en la página de inicio...');
}

// Función para guardar (crear o actualizar) un producto
function guardarProducto() {
    const codigo = document.getElementById('codigoProducto').value;
    const nombre = document.getElementById('nombreProducto').value;
    const descripcion = document.getElementById('descripcionProducto').value;
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const stock = parseInt(document.getElementById('stockProducto').value);
    const stockCritico = document.getElementById('stockCriticoProducto').value ? parseInt(document.getElementById('stockCriticoProducto').value) : null;
    const categoria = document.getElementById('categoriaProducto').value;
    const imagen = 'data:image/svg+xml;base64,...';
    const productoExistente = listaProductos.find(p => p.codigo === codigo);

    if (productoExistente) {
        Object.assign(productoExistente, { nombre, descripcion, precio, stock, stockCritico, categoria });
    } else {
        listaProductos.push({ codigo, nombre, descripcion, precio, stock, stockCritico, categoria, imagen });
    }

    guardarEnLocalStorage(CLAVE_PRODUCTOS, listaProductos);
    mostrarProductosEnTabla();
    alert('Producto guardado correctamente');

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalProducto'));
    modal.hide();
}

// Función para rellenar el formulario y abrir el modal de edición
function editarProducto(codigo) {
    const producto = listaProductos.find(p => p.codigo === codigo);
    if (!producto) return;

    document.getElementById('codigoProducto').value = producto.codigo;
    document.getElementById('nombreProducto').value = producto.nombre;
    document.getElementById('descripcionProducto').value = producto.descripcion || '';
    document.getElementById('precioProducto').value = producto.precio;
    document.getElementById('stockProducto').value = producto.stock;
    document.getElementById('stockCriticoProducto').value = producto.stockCritico || '';
    document.getElementById('categoriaProducto').value = producto.categoria;
    document.getElementById('modalProductoLabel').textContent = 'Editar Producto';
    
    const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
    modal.show();
}

// Función para eliminar un producto
function eliminarProducto(codigo) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
        listaProductos = listaProductos.filter(p => p.codigo !== codigo);
        guardarEnLocalStorage(CLAVE_PRODUCTOS, listaProductos);
        mostrarProductosEnTabla();
        alert('Producto eliminado correctamente');
    }
}

// Función para configurar los event listeners del formulario de producto
function configurarListenersProducto() {
    const formProducto = document.getElementById('formProducto');
    if (!formProducto) return;
    
    const modalProducto = document.getElementById('modalProducto');
    const guardarProductoBtn = document.getElementById('guardarProducto');

    modalProducto.addEventListener('hidden.bs.modal', function () {
        document.getElementById('modalProductoLabel').textContent = 'Nuevo Producto';
        formProducto.reset();
        formProducto.classList.remove('was-validated');
    });

    guardarProductoBtn.addEventListener('click', function() {
        if (formProducto.checkValidity()) {
            guardarProducto();
        } else {
            formProducto.classList.add('was-validated');
        }
    });
}

// Exponer funciones al objeto global (window) para que los `onclick` funcionen
window.editarProducto = editarProducto;
window.eliminarProducto = eliminarProducto;