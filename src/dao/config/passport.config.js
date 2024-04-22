import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import { creaHash, validaPassword } from "../../utils.js"
import { UsuariosManagerMongo } from '../controllers/Mongo/userManagerMongo.js';
const usuariosManager = new UsuariosManagerMongo()

export const initializePassport = () => {

    passport.use(
        "github",
        new github.Strategy(
            {
                clientID: "Iv1.3cd733c63b4ae695",
                clientSecret: "540ff05939c045349abba31ffb38c7813412de81",
                callbackURL: "http://localhost:8080/api/sessions/callbackGithub"
            },
            async function (accessToken, refreshToken, profile, done) {
                try {

                    let username = profile._json.name
                    let email = profile._json.email
                    let usuario = await usuariosManager.getBy({ email })

                    if (!usuario) {
                        usuario = await usuariosManager.create({
                            username, email,
                            profileGithub: profile
                        })
                    }
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "register",
        new local.Strategy(
            {
                usernameField: "email",
                passReqToCallback: true
            },
            async function (req, username, password, done) {
                try {
                    let { username, email } = req.body
                    if (!username || !email) {
                        return done(null, false)
                    }

                    let existe = await usuariosManager.getBy({ email })
                    if (existe) {
                        return done(null, false)
                    }

                    let rol = 'user';
                    if (email === 'admincoder@coder.com') {
                        rol = 'admin';
                    }

                    password = creaHash(password)
                    let nuevoUsuario = await usuariosManager.create({ username, email, password, rol })
                    return done(null, nuevoUsuario)

                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField: "email"
            },
            async (username, password, done) => {
                try {
                    console.log({ username })
                    let usuario = await usuariosManager.getBy({ email: username })
                    if (!usuario) {
                        return done(null, false)
                    }

                    if (!validaPassword(usuario, password)) {
                        return done(null, false)
                    }

                    return done(null, usuario)

                } catch (error) {
                    return done(error)
                }
            }
        )
    )


    passport.serializeUser((usuario, done) => {
        return done(null, usuario._id)
    })

    passport.deserializeUser(async (id, done) => {
        let usuario = await usuariosManager.getBy({ _id: id })
        return done(null, usuario)
    })

}



