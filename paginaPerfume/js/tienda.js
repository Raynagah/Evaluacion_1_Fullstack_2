function aplicarFiltros() {
  const minInput = document.getElementById("precio-min").value.trim();
  const maxInput = document.getElementById("precio-max").value.trim();

  const min = isNaN(parseInt(minInput)) ? 0 : parseInt(minInput);
  const max = isNaN(parseInt(maxInput)) ? Infinity : parseInt(maxInput);

  const marcasSeleccionadas = [...document.querySelectorAll(".filtro-marca:checked")].map(e => e.value);
  const generosSeleccionados = [...document.querySelectorAll(".filtro-genero:checked")].map(e => e.value);

  const productos = document.querySelectorAll(".producto");

  let hayFiltros =
    min !== 0 || max !== Infinity || marcasSeleccionadas.length > 0 || generosSeleccionados.length > 0;

  let productosMostrados = 0;

  productos.forEach(p => {
    const precio = parseInt(p.dataset.precio);
    const marca = p.dataset.marca;
    const genero = p.dataset.genero;

    let mostrar = true;

    if (precio < min || precio > max) mostrar = false;
    if (marcasSeleccionadas.length > 0 && !marcasSeleccionadas.includes(marca)) mostrar = false;
    if (generosSeleccionados.length > 0 && !generosSeleccionados.includes(genero)) mostrar = false;

    if (mostrar) {
      p.style.display = "";
      productosMostrados++;
    } else {
      p.style.display = "none";
    }
  });

  // Mostrar mensaje si no se encontró nada
  document.getElementById("mensaje-sin-resultados").style.display =
    productosMostrados === 0 ? "block" : "none";
}

function limpiarFiltros() {
  document.getElementById("precio-min").value = "";
  document.getElementById("precio-max").value = "";

  document.querySelectorAll(".filtro-marca, .filtro-genero").forEach(cb => (cb.checked = false));

  document.getElementById("mensaje-sin-resultados").style.display = "none";

  aplicarFiltros();
}
