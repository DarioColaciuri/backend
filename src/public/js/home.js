function agregarAlCarrito(productoId) {

    fetch('http://localhost:8080/api/carts/6606e44a2a9123e93bac004f/product/' + productoId + '/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Producto agregado al carrito correctamente');
        } else {
            alert('Hubo un error al agregar el producto al carrito');
        }
    })
    .catch(error => {
        console.error('Error al agregar producto al carrito:', error);
        alert('Hubo un error al agregar el producto al carrito');
    });
}


