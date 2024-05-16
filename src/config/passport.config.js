import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import { creaHash, validaPassword } from "../utils.js"
// import CartManager from '../dao/Mongo/cartManagerMongo.js';
// import  UsuariosManagerMongo from '../dao/Mongo/userManagerMongo.js';
// const usuariosManager = new UsuariosManagerMongo()
import { config } from "../config/config.js"
import { userRepository, cartRepository } from "../services/service.js";


export const initializePassport = () => {

    passport.use(
        "github",
        new github.Strategy(
            {
                clientID: config.CLIENT_ID,
                clientSecret: config.CLIENT_SECRET,
                callbackURL: config.CALLBACK_URL
            },
            async function (accessToken, refreshToken, profile, done) {
                try {

                    let username = profile._json.name
                    let email = profile._json.email
                    let usuario = await userRepository.getBy({ email })

                    if (!usuario) {
                        usuario = await userRepository.create({
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

                    let existe = await userRepository.getBy({ email })
                    if (existe) {
                        return done(null, false)
                    }

                    let rol = 'user';
                    if (email === 'admincoder@coder.com') {
                        rol = 'admin';
                    }

                    const newCart = await cartRepository.createCart();
                    const cartId = newCart._id.toString();

                    password = creaHash(password)
                    let nuevoUsuario = await userRepository.create({
                        username,
                        email,
                        password,
                        first__name: req.body.first__name,
                        last__name: req.body.last__name,
                        age: req.body.age,
                        cart: cartId,
                        rol })
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
                    let usuario = await userRepository.getBy({ email: username })
                    console.log(usuario)
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
        let usuario = await userRepository.getBy({ _id: id })
        return done(null, usuario)
    })

}



