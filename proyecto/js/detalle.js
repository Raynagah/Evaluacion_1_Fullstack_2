document.addEventListener("DOMContentLoaded", () => {
    const productos = [
      { id: 1, nombre: "Le Parfait Pour Homme Armaf 200 ML (H)", genero: "Hombre", tipo: "Eau de Parfum", precioNormal: 49990, precioInternet: 38990, descuento: "22%", imagen: "../img/Le Parfait Pour Homme Armaf.webp" },
      { id: 2, nombre: "Dior Homme Intense 2025 100 ML (H)", genero: "Hombre", tipo: "Eau de Parfum", precioNormal: 185900, precioInternet: 179990, descuento: "3%", imagen: "../img/Dior Homme Intense Edp 100ml Hombre.webp" },
      { id: 3, nombre: "Aventus Creed 100 ML (H/M)", genero: "Unisex", tipo: "Eau de Parfum", precioNormal: 489990, precioInternet: 459990, descuento: "6%", imagen: "../img/Creed Aventus.webp" },
      { id: 4, nombre: "Coco Mademoiselle Intense Chanel 100 ML (M)", genero: "Mujer", tipo: "Eau de Parfum", precioNormal: 198900, precioInternet: 189990, descuento: "4%", imagen: "../img/Coco Mademoiselle Intense Chanel.webp" },
      { id: 5, nombre: "1 Million Rabanne 100 ML (H)", genero: "Hombre", tipo: "Eau de Toilette", precioNormal: 96900, precioInternet: 89990, descuento: "7%", imagen: "../img/1 Million Rabanne.webp" },
      { id: 6, nombre: "Sauvage Dior 100 ML (H)", genero: "Hombre", tipo: "Eau de Parfum", precioNormal: 124900, precioInternet: 119990, descuento: "4%", imagen: "../img/Sauvage Dior.webp" },
      { id: 7, nombre: "Good Girl Carolina Herrera 80 ML (M)", genero: "Mujer", tipo: "Eau de Parfum", precioNormal: 119990, precioInternet: 109990, descuento: "8%", imagen: "../img/Good Girl Carolina Herrera.webp" },
      { id: 8, nombre: "Invictus Victory Elixir Paco Rabanne 100 ML (H)", genero: "Hombre", tipo: "Eau de Parfum", precioNormal: 121900, precioInternet: 115990, descuento: "5%", imagen: "../img/Invictus Victory Elixir Paco Rabanne.webp" },
      { id: 9, nombre: "Toy 2 Moschino 100 ML (M)", genero: "Mujer", tipo: "Eau de Parfum", precioNormal: 89990, precioInternet: 79990, descuento: "11%", imagen: "../img/Toy 2 Moschino.webp" },
      { id: 10, nombre: "Bad Boy Cobalt Carolina Herrera 100 ML (H)", genero: "Hombre", tipo: "Eau de Parfum", precioNormal: 116900, precioInternet: 109990, descuento: "6%", imagen: "../img/Bad Boy Cobalt Carolina Herrera.webp" },
      { id: 11, nombre: "Versace Eros 100 ML (H)", genero: "Hombre", tipo: "Eau de Toilette", precioNormal: 94900, precioInternet: 88990, descuento: "6%", imagen: "../img/Versace Eros.webp" },
      { id: 12, nombre: "Valentino Uomo Born In Roma Intense 100 ML (H)", genero: "Hombre", tipo: "Eau de Parfum", precioNormal: 129900, precioInternet: 114990, descuento: "11%", imagen: "../img/Valentino Uomo Born In Roma Intense Valentino.jpg" }
    ];

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const producto = productos.find(p => p.id === id);

    if (producto) {
        document.getElementById("imagen").src = producto.imagen;
        document.getElementById("imagen").alt = producto.nombre;
        document.getElementById("nombre").innerText = producto.nombre;
        document.getElementById("genero").innerText = producto.genero;
        document.getElementById("tipo").innerText = producto.tipo;
        document.getElementById("precio-normal").innerText = "Precio Normal: $" + producto.precioNormal.toLocaleString("es-CL");
        document.getElementById("precio-internet").innerText = "Precio Internet: $" + producto.precioInternet.toLocaleString("es-CL");
    } else {
        document.querySelector(".detalle").innerHTML = "<p>Producto no encontrado.</p>";
    }

    // ===== LÓGICA MODIFICADA PARA AGREGAR AL CARRITO =====
    document.getElementById("agregarCarroBtn").addEventListener("click", () => {
        // 1. Revisamos si existe una sesión activa.
        const sesionActiva = JSON.parse(localStorage.getItem('sesionActiva'));

        // 2. Si NO hay sesión...
        if (!sesionActiva) {
            alert("Debes iniciar sesión para agregar productos al carrito.");
            window.location.href = 'login.html'; // Redirigimos al login.
            return; // Detenemos la función aquí.
        }

        // 3. Si SÍ hay sesión, el código continúa como antes.
        if (!producto) return;

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precioInternet,
                imagen: producto.imagen,
                cantidad: 1
            });
        }
        
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Producto agregado al carrito correctamente.");
    });
});