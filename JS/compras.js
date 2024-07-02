const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito2 = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos(){
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    carrito2.addEventListener('click', (e)=>{compra.eliminarProducto(e)});
    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click', procesarCompra);
}

function procesarCompra(e){
    //e.preventDefault();
    if(compra.obtenerProductosLocalStorage().length === 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            timer: 2500,
            showConfirmButton: false
        }).then(function(){
            window.location = "/Boutique_MARYOSproductos.html";
        });
    }
    else if(cliente.value === '' || correo.value === ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            timer: 2500,
            showConfirmButton: false
        });
    }
    else{
        // Si se cumplen todas las condiciones, muestra el alert de éxito
        alert('La compra se realizó con éxito');
        
        // Vaciar el LocalStorage y redirigir a la página de productos
        compra.vaciarLocalStorage();
        window.location = "/Boutique_MARYOS/productos.html";
    }
}

// Asigna el evento al botón de procesar compra
document.getElementById('procesar-compra').addEventListener('click', procesarCompra);

