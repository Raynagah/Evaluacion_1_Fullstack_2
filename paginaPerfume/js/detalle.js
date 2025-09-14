const productos = [
  { id: 1, nombre: "Le Parfait Pour Homme Armaf 200 ML (H)", genero: "Hombre", tipo: "Eau de Parfum", precioNormal: 49990, precioInternet: 38990, descuento: "22%", imagen: "img/Le Parfait Pour Homme Armaf.webp" },
  { id: 2, nombre: "Dior Homme Intense 2025 100 ML (H)", genero: "Hombre", tipo: "Eau de Parfum", precioNormal: 185900, precioInternet: 179990, descuento: "3%", imagen: "img/Dior Homme Intense Edp 100ml Hombre.webp" },
  { id: 3, nombre: "Aventus Creed 100 ML (H/M)", genero: "Unisex", tipo: "Eau de Parfum", precioNormal: 489990, precioInternet: 459990, descuento: "6%", imagen: "img/Creed Aventus.webp" },
  { id: 4, nombre: "Coco Mademoiselle Intense Chanel 100 ML (M)", genero: "Mujer", tipo: "Eau de Parfum", precioNormal: 198900, precioInternet: 189990, descuento: "4%", imagen: "img/Coco Mademoiselle Intense Chanel.webp" },
  { id: 5, nombre: "1 Million Rabanne 100 ML (H)", genero: "Hombre", tipo: "Eau de Toilette", precioNormal: 96900, precioInternet: 74990, descuento: "23%", imagen: "img/1 Million Rabanne.webp" },
  { id: 6, nombre: "Good Girl Carolina Herrera 80 ML (M)", genero: "Mujer", tipo: "Eau de Parfum", precioNormal: 114900, precioInternet: 99990, descuento: "13%", imagen: "img/Good Girl Carolina Herrera.jpg" },
  { id: 7, nombre: "Eros Versace 100 ML (H)", genero: "Hombre", tipo: "Eau de Toilette", precioNormal: 89900, precioInternet: 69990, descuento: "22%", imagen: "img/Eros Versace.webp" },
  { id: 8, nombre: "La Vie Est Belle Lancôme 100 ML (M)", genero: "Mujer", tipo: "Eau de Parfum", precioNormal: 124900, precioInternet: 109990, descuento: "12%", imagen: "img/La Vie Est Belle Lancôme.webp" },
  { id: 9, nombre: "Black Orchid Tom Ford 100 ML (H/M)", genero: "Unisex", tipo: "Eau de Parfum", precioNormal: 210000, precioInternet: 195900, descuento: "7%", imagen: "img/Black Orchid Tom Ford.jpg" },
  { id: 10, nombre: "Burberry Brit Eau de Toilette Burberry 100 ML (M)", genero: "Mujer", tipo: "Eau de Toilette", precioNormal: 92900, precioInternet: 79990, descuento: "14%", imagen: "img/Burberry Brit Eau de Toilette Burberry.jpg" },
  { id: 11, nombre: "La Nuit de l'Homme Yves Saint Laurent 100 ML (H)", genero: "Hombre", tipo: "Eau de Toilette", precioNormal: 119900, precioInternet: 99990, descuento: "17%", imagen: "img/La Nuit de l'Homme Yves Saint Laurent.webp" },
  { id: 12, nombre: "Valentino Uomo Born In Roma Intense Valentino 100 ML (H)", genero: "Hombre", tipo: "Eau de Parfum", precioNormal: 129900, precioInternet: 114990, descuento: "11%", imagen: "img/Valentino Uomo Born In Roma Intense Valentino.jpg" }
];

// Leer el ID desde la URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const producto = productos.find(p => p.id === id);

if (producto) {
  document.getElementById("imagen").src = producto.imagen;
  document.getElementById("imagen").alt = producto.nombre;
  document.getElementById("nombre").innerText = producto.nombre;
  document.getElementById("genero").innerText = producto.genero;
  document.getElementById("tipo").innerText = producto.tipo;
  document.getElementById("precio-normal").innerText =
    "$" + producto.precioNormal.toLocaleString("es-CL");
  document.getElementById("precio-internet").innerText =
    "$" + producto.precioInternet.toLocaleString("es-CL");
} else {
  document.querySelector(".detalle").innerHTML = "<p>Producto no encontrado.</p>";
}

// Función agregar al carrito
document.getElementById("agregarCarroBtn").addEventListener("click", () => {
  if (!producto) return;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push({
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precioInternet,
    imagen: producto.imagen
  });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
});
