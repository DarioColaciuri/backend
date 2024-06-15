import { creaHash, validaPassword } from '../utils.js';
import { userRepository } from "../services/service.js";
import UserDTO from "../services/dto/users.dto.js"
import { usersModel } from '../dao/models/users.model.js';
import { config } from "../config/config.js"
import { loggerDev } from '../config/logger.js';
import jwt from "jsonwebtoken"
import { enviarMail } from '../config/mailer.js';
import bcrypt from 'bcrypt';



export const register = async (req, res) => {

    let { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.redirect("/register?error=Faltan datos")
    }

    try {
        res.setHeader('Content-Type', 'application/json');
        res.redirect(`http://localhost:${config.PORT}/`)
    } catch (error) {
        req.logger.error(error);
        return res.status(400).json({ error: `Error inseperado` })
    }
}

export const failedRegister = async (req, res) => {
    res.send("Registro fallido");
}

export const login = async (req, res) => {

    let { email, password } = req.body

    if (!email || !password) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Faltan datos` })
    }

    let usuario = await userRepository.getBy({ email })
    if (!usuario) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(401).json({ error: `Credenciales incorrectas` })
    }

    if (usuario.password !== creaHash(password)) {
        if (!validaPassword(usuario, password)) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(401).json({ error: `Credenciales incorrectas` })
        }
    }

    usuario = { ...usuario }
    delete usuario.password
    req.session.usuario = usuario

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({
        message: "Login correcto", usuario
    })
}

export const failLogin = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(401).json({ error: "Fallo login" });
}

export const logout = (req, res) => {
    req.session.destroy(e => {
        if (e) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json(
                {
                    error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle: `${e.message}`
                }
            )
        }
    })
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        message: "Logout exitoso"
    });
}

export const callBackGithub = (req, res) => {
    req.session.usuario = req.user
    return res.redirect(`http://localhost:${config.PORT}/products`)
}

export const errorGithub =(req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json(
        {
            error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle: `Fallo al autenticar con GitHub`
        }
    )
}

export const current = (req, res) => {
    if (req.session.usuario) {
        const userDTO = new UserDTO(req.session.usuario)
        res.setHeader("Content-Type", "application/json");
        return res.status(200).json(userDTO);
    } else {
        res.setHeader("Content-Type", "application/json");
        return res.status(401).json({ error: "No hay usuario logueado" });
    }
}

export const recoverPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await usersModel.findOne({ email })

        if (!user) {
            loggerDev.error(`No se encontro el usuario con el email ${email}`)
            return res.status(401).json({ error: `Credenciales incorrectas` })
        }

        loggerDev.info(`Se encontro el usuario con el email ${email}`)

        const token = jwt.sign({ email }, config.SECRET, { expiresIn: '1h' })
        const subject = 'Recuperar contraseña'
        const message = `<h1>Recupere su contraseña</h1>
        <p>Haga click en este enlace para recuperar su contraseña:</p> 
        <a href="http://localhost:${config.PORT}/resetpassword?token=${token}">Recuperar contraseña</a>`

        await enviarMail(user.email, subject, message)
        res.status(200).json({ message: 'Se envio un correo electronico para recuperar su contraseña' })
    } catch (error) {
        loggerDev.error("Error al recuperar la contraseña", error)
        return res.status(400).json({ error: `Error inesperado` })
    }
}

export const changePassword = async (req, res) => {
    try {
        const { password } = req.body
        const token = req.query.token

        if (!token) {
            loggerDev.error("Token invalido")
            return res.status(400).json({ error: `Token invalido` })
        }


        if (!password) {
            loggerDev.error("Contraseña invalida")
            return res.status(400).json({ error: `Contraseña invalida` })
        }

        try {
            const decoded = jwt.verify(token, config.SECRET)
            loggerDev.info("Token verificado", decoded)
            const { email } = decoded
            const user = await usersModel.findOne({ email })

            if (!user) {
                loggerDev.error(`No se encontro el usuario`)
                return res.status(401).json({ error: `Credenciales incorrectas` })
            }

            const passwordMatch = bcrypt.compareSync(password, user.password)
            if (passwordMatch) {
                loggerDev.error(`La nueva contraseña no puede ser igual a la anterior`)
                return res.status(400).json({ error: `La nueva contraseña no puede ser igual a la anterior` })
            }

            const hashedPassword = creaHash(password)
            await usersModel.updateOne({ email }, { password: hashedPassword })
            loggerDev.info("Contraseña actualizada")
            return res.status(200).json({ message: 'Contraseña actualizada' })
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                loggerDev.error("Token expirado")
                return res.render('forgotPassword', { error: 'Token expirado' })
            }
            loggerDev.error("Error al cambiar la contraseña", error)
            return res.status(400).json({ error: `Error inesperado` })
        }
    } catch (error) {
        loggerDev.error("Error al cambiar la contraseña", error)
        return res.status(400).json({ error: `Error inesperado` })
    }
}


