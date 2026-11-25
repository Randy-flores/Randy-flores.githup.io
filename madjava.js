
// =====================================
// MAD - TIENDA FARMACÉUTICA
// =====================================

// CATÁLOGO DE PRODUCTOS

const productos = [
    {
        id: 1,
        nombre: "Paracetamol",
        precio: 85,
        imagen: "💊"
    },
    {
        id: 2,
        nombre: "Vitamina C",
        precio: 150,
        imagen: "🍊"
    },
    {
        id: 3,
        nombre: "Alcohol antiséptico",
        precio: 95,
        imagen: "🧴"
    },
    {
        id: 4,
        nombre: "Mascarillas",
        precio: 75,
        imagen: "😷"
    },
    {
        id: 5,
        nombre: "Termómetro digital",
        precio: 250,
        imagen: "🌡️"
    },
    {
        id: 6,
        nombre: "Gel antibacterial",
        precio: 120,
        imagen: "🧼"
    },
    {
        id: 7,
        nombre: "Curitas",
        precio: 65,
        imagen: "🩹"
    },
    {
        id: 8,
        nombre: "Suero oral",
        precio: 55,
        imagen: "🥤"
    }
];

// CARRITO DE COMPRAS

let carrito = [];

// MOSTRAR PRODUCTOS

function mostrarProductos(lista = productos) {

    const contenedor = document.getElementById("lista-productos");

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    lista.forEach(producto => {

        contenedor.innerHTML += `
            <div class="producto">

                <div class="imagen">${producto.imagen}</div>

                <h3>${producto.nombre}</h3>

                <p>RD$ ${producto.precio.toFixed(2)}</p>

                <button class="boton"
                    onclick="agregarCarrito(${producto.id})">
                    Agregar al carrito
                </button>

            </div>
        `;

    });

}

// AGREGAR PRODUCTOS AL CARRITO

function agregarCarrito(id) {

    const producto = productos.find(p => p.id === id);

    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    mostrarCarrito();

    alert(producto.nombre + " agregado al carrito.");
}

// MOSTRAR CARRITO

function mostrarCarrito() {

    const lista = document.getElementById("lista-carrito");

    const totalTexto = document.getElementById("total");

    const contador = document.getElementById("contador");

    lista.innerHTML = "";

    let total = 0;

    let cantidadTotal = 0;

    if (carrito.length === 0) {

        lista.innerHTML = "<p>Tu carrito está vacío.</p>";

    }

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        cantidadTotal += producto.cantidad;

        lista.innerHTML += `

            <div class="item-carrito">

                <div>
                    <strong>${producto.nombre}</strong>
                    <br>
                    RD$ ${producto.precio.toFixed(2)}
                </div>

                <div class="controles">

                    <button onclick="cambiarCantidad(${producto.id}, -1)">
                        -
                    </button>

                    ${producto.cantidad}

                    <button onclick="cambiarCantidad(${producto.id}, 1)">
                        +
                    </button>

                    <button class="eliminar"
                        onclick="eliminarProducto(${producto.id})">
                        Eliminar
                    </button>

                </div>

                <strong>
                    RD$ ${subtotal.toFixed(2)}
                </strong>

            </div>

        `;

    });

    totalTexto.textContent = "Total: RD$ " + total.toFixed(2);

    contador.textContent = cantidadTotal;

}

// MODIFICAR CANTIDAD

function cambiarCantidad(id, cambio) {

    const producto = carrito.find(p => p.id === id);

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {

        eliminarProducto(id);

    } else {

        mostrarCarrito();

    }

}

// ELIMINAR PRODUCTO

function eliminarProducto(id) {

    carrito = carrito.filter(p => p.id !== id);

    mostrarCarrito();

}

// VACIAR CARRITO

document.getElementById("vaciar-carrito").addEventListener("click", function() {

    carrito = [];

    mostrarCarrito();

});

// BUSCADOR

document.getElementById("buscador").addEventListener("input", function() {

    const texto = this.value.toLowerCase();

    const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(resultados);

});

// REALIZAR PEDIDO

document.getElementById("formulario-pedido")
.addEventListener("submit", function(event) {

    event.preventDefault();

    if (carrito.length === 0) {

        alert("Debes agregar productos al carrito antes de realizar el pedido.");

        return;

    }

    const nombre = document.getElementById("nombre").value.trim();

    const telefono = document.getElementById("telefono").value.trim();

    const direccion = document.getElementById("direccion").value.trim();

    const comentario = document.getElementById("comentario").value.trim();

    const total = carrito.reduce(
        (suma, producto) => suma + producto.precio * producto.cantidad,
        0
    );

    let detalle = carrito.map(producto =>
        `${producto.nombre} x ${producto.cantidad}`
    ).join(", ");

    const mensaje = document.getElementById("mensaje-pedido");

    mensaje.innerHTML = `

        <h3>¡Pedido preparado correctamente!</h3>

        <p>Cliente: ${nombre}</p>

        <p>Teléfono: ${telefono}</p>

        <p>Dirección: ${direccion}</p>

        <p>Productos: ${detalle}</p>

        <p>Total: RD$ ${total.toFixed(2)}</p>

        <p>Comentario: ${comentario || "Ninguno"}</p>

        <p>Gracias por elegir MAD.</p>

    `;

    alert("Tu pedido ha sido registrado en esta demostración.");

    carrito = [];

    mostrarCarrito();

    this.reset();

});

// INICIAR LA PÁGINA

mostrarProductos();

mostrarCarrito();
