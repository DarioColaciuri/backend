import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/controllers/Mongo/userManagerMongo.js';
import { creaHash, validaPassword } from '../utils.js';
export const router = Router()
import passport from "passport";

let usuariosManager = new UsuariosManagerMongo()

router.post('/register', passport.authenticate("register", { failureRedirect: "/api/sessions/failedregister" }), async (req, res) => {

    let { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.redirect("/register?error=Faltan datos")
    }

    try {
        res.setHeader('Content-Type', 'application/json');
        res.redirect("http://localhost:8080/")
    } catch (error) {
        return res.status(400).json({ error: `Error inseperado` })
    }
})

router.get("/failedregister", (req, res) => {
    res.send("Registro fallido");
})

router.post('/login', passport.authenticate("login", { failureRedirect: "/api/sessions/faillogin" }), async (req, res) => {

    let { email, password } = req.body
    if (!email || !password) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Faltan datos` })
    }

    let usuario = await usuariosManager.getBy({ email })
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
})

router.get("/faillogin", async (req, res) => {
    res.send("Fallo login");
})


router.get('/logout', (req, res) => {
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
});


router.get('/github', passport.authenticate("github", {}), (req, res) => { })

router.get('/callbackGithub', passport.authenticate("github", { failureRedirect: "/api/sessions/errorGitHub" }), (req, res) => {
    req.session.usuario = req.user
    return res.redirect("http://localhost:8080/products")
})

router.get("/errorGitHub", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json(
        {
            error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle: `Fallo al autenticar con GitHub`
        }
    )

})

router.get("/current", (req, res) => {
    if (req.session.usuario) {
        res.setHeader("Content-Type", "application/json");
        return res.status(200).json(req.session.usuario);
    } else {
        res.setHeader("Content-Type", "application/json");
        return res.status(401).json({ error: "No hay usuario logueado" });
    }
});

