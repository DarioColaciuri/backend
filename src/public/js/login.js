//login

let btnSubmit = document.getElementById("submit")
let inputEmail = document.getElementById("email")
let inputPassword = document.getElementById("password")
const port = window.location.port || 8080

btnSubmit.addEventListener("click", async (e) => {
    e.preventDefault()

    let body = {
        email: inputEmail.value,
        password: inputPassword.value
    }

    let resultado = await fetch("/api/sessions/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    let status = resultado.status
    let datos = await resultado.json()

    if (status == 200) {
        Toastify({
            text: 'Sesión iniciada correctamente',
            duration: 1500,
            className: "toast",
            style: {
                background: "linear-gradient(to right, #93e77e, #38943b)",
                color: "#000000",
            },
            close: true
        }).showToast();

        setTimeout(function () {
            window.location.href = `http://localhost:${port}/products`;
        }, 1500);

    } else {
        Toastify({
            text: datos.error,
            duration: 1500,
            className: "toast",
            style: {
                background: "linear-gradient(to right, #e36f6f, #c42626)",
                color: "#000000",
            },
            close: true
        }).showToast();
    }
})

// logout

function logout() {
    fetch(`http://localhost:${port}/api/sessions/logout`)
        .then(response => {
            if (response.ok) {
                Toastify({
                    text: 'Sesión finalizada correctamente, se le redirigira a la pagina principal.',
                    duration: 1500,
                    className: "toast",
                    style: {
                        background: "linear-gradient(to right, #93e77e, #38943b)",
                        color: "#000000",
                    },
                    close: true
                }).showToast();
                setTimeout(function () {
                    window.location.href = `http://localhost:${port}/`;
                }, 1500);
            } else {
                Toastify({
                    text: "Error al cerrar sesion",
                    duration: 1500,
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
            Toastify({
                text: "Error al cerrar sesion",
                duration: 1500,
                className: "toast",
                style: {
                    background: "linear-gradient(to right, #e36f6f, #c42626)",
                    color: "#000000",
                },
                close: true
            }).showToast();
        });
}

