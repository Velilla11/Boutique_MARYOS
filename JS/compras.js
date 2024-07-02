const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito2 = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos(){
    document.addEventListener('DOMContentLoaded', () => {
        compra.leerLocalStorageCompra();
        agregarRutaEnlaces();
    });
    carrito2.addEventListener('click', (e)=>{compra.eliminarProducto(e)});
    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click', procesarCompra);
}

function agregarRutaEnlaces() {
    const enlaces = document.querySelectorAll('a');
    enlaces.forEach(enlace => {
        if (!enlace.href.includes('/Boutique_MARYOS/')) {
            enlace.href = '/Boutique_MARYOS/' + enlace.getAttribute('href');
        }
    });
}

function procesarCompra(e) {
    //e.preventDefault();
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            timer: 2500,
            showConfirmButton: false
        });
    } else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            timer: 2500,
            showConfirmButton: false
        });
    } else {
        // Si se cumplen todas las condiciones, muestra el alert de éxito
        Swal.fire({
            icon: 'success',
            title: 'Compra realizada',
            text: 'La compra se realizó con éxito',
            timer: 2500,
            showConfirmButton: false
        }).then(function() {
            // Vaciar el LocalStorage después de mostrar el mensaje de éxito
            compra.vaciarLocalStorage();
            // Aquí puedes añadir cualquier otra lógica que necesites después de la compra
        });
    }
}

// Asigna el evento al botón de procesar compra
document.getElementById('procesar-compra').addEventListener('click', procesarCompra);
