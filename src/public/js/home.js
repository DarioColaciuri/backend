function agregarAlCarrito(productoId, userCart) {
    const port = window.location.port || 8080;

    fetch(`http://localhost:${port}/api/carts/${userCart}/product/${productoId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.totalQuantity !== undefined) {
                document.querySelector('.numerito').textContent = data.totalQuantity;
                Toastify({
                    text: 'Producto agregado al carrito correctamente',
                    duration: 3000,
                    className: "toast",
                    style: {
                        background: "linear-gradient(to right, #93e77e, #38943b)",
                        color: "#000000",
                    },
                    close: true
                }).showToast();
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        })
        .catch(error => {
            console.error('Error al agregar producto al carrito:', error);
            Toastify({
                text: 'Hubo un error al agregar el producto al carrito',
                duration: 3000,
                className: "toast",
                style: {
                    background: "linear-gradient(to right, #e36f6f, #c42626)",
                    color: "#000000",
                },
                close: true
            }).showToast();
        });
}

function deleteProductFromCart(cartId, productId) {
    fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Error al eliminar el producto del carrito');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar el producto del carrito');
        });
}


