
// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'pack 500',
        precio: 4.99,
        imagen: 'img/500.png'
    },
    {
        id: 2,
        nombre: 'pack 1100',
        precio: 7.99,
        imagen: 'img/1100.png'
    },
    {
        id: 3,
        nombre: 'pack 2350',
        precio: 15.99,
        imagen: 'img/2350.png'
    },
    {
        id: 4,
        nombre: 'pack 6100',
        precio: 29.99,
        imagen: 'img/6100.png'
    }

];


let carrito = [];
let total = 0;
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

function renderizarProductos() {
    baseDeDatos.forEach((info) => {

        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4', 'bg-dark')

        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body',);

        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;

        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);

        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = info.precio + 'usd';

        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);

        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}


function anyadirProductoAlCarrito(evento) {

    carrito.push(evento.target.getAttribute('marcador'))

    calcularTotal();

    renderizarCarrito();

}

function renderizarCarrito() {

    DOMcarrito.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {

        const miItem = baseDeDatos.filter((itemBaseDatos) => {

            return itemBaseDatos.id === parseInt(item);
        });

        const numeroUnidadesItem = carrito.reduce((total, itemId) => {

            return itemId === item ? total += 1 : total;
        }, 0);

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'text-light', 'mx-2', 'bg-dark');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}usd`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
}



function borrarItemCarrito(evento) {

    const id = evento.target.dataset.item;

    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });

    renderizarCarrito();

    calcularTotal();
}


function calcularTotal() {

    total = 0;

    carrito.forEach((item) => {

        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });

    DOMtotal.textContent = total.toFixed(2);
}


function vaciarCarrito() {

    carrito = [];

    renderizarCarrito();
    calcularTotal();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();

//jquery

$("#boton-vaciar").on("click", () => {
    console.log("boton jquery")
})


$("#theme").on("click", () => {
    if (localStorage.getItem("theme") == "dark") {
        lightTheme()
    } else {
        darkTheme()
    }
})




const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"

$.get(url, (respuesta, estado) => {

    console.log(respuesta);
    if (estado === "success") {


        respuesta.forEach(e => {
            $("body").append(`
        <div id="divDolar" class="col-sm-2 d-inline-block p-2 p-3 mb-2 bg-dark text-white fs-6  " >
        <h3 class="text-center">${e.casa.nombre}</h3>
        <p class="text-center">${e.casa.compra}</p>
        <p class="text-center">${e.casa.venta}</p>
        </div>
        `)

        })
    }
})

