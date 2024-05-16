export const auth = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect("http://localhost:8080/")
    }
    next()
}

export const admin = (req, res, next) => {
    if (req.session.usuario.rol !== 'admin') {
        return res.redirect("http://localhost:8080/products")
    } 
    next()
}

export const users = (req, res, next) => {
    if (req.session.usuario.rol === 'admin') {
        return res.redirect("http://localhost:8080/realTimeProducts")
    }
    next()
}