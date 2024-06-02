import { config } from "../config/config.js"

export const auth = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect(`http://localhost:${config.PORT}/`)
    }
    next()
}

export const admin = (req, res, next) => {
    if (req.session.usuario.rol !== 'admin') {
        return res.redirect(`http://localhost:${config.PORT}/products`)
    } 
    next()
}

export const users = (req, res, next) => {
    if (req.session.usuario.rol === 'admin') {
        return res.redirect(`http://localhost:${config.PORT}/realTimeProducts`)
    }
    next()
}