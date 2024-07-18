function buyCart(userCart) {
    const port = window.location.port || 8080;
    fetch(`http://localhost:${port}/api/carts/${userCart}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.ticket) {
            Toastify({
                text: 'Compra finalizada correctamente',
                duration: 3000,
                className: "toast",
                style: {
                    background: "linear-gradient(to right, #93e77e, #38943b)",
                    color: "#000000",
                },
                close: true
            }).showToast();

            window.location.href = `/details?ticketId=${result.ticket._id}`;
        } else {
            Toastify({
                text: result.message || 'Hubo un error al comprar',
                duration: 3000,
                className: "toast",
                style: {
                    background: "linear-gradient(to right, #e36f6f, #c42626)",
                    color: "#000000",
                },
                close: true
            }).showToast();
        }
    })
    .catch(error => {
        console.error('Error al comprar:', error);
        Toastify({
            text: 'Error al comprar',
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

