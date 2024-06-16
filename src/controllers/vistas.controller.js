import { productRepository } from '../services/service.js';
import { productsModel } from '../dao/models/products.model.js';
import cartModel from '../dao/models/carts.model.js';
import __dirname from "../utils.js"
import { generateMockProducts } from '../mocks/mock.js';
import CustomError from '../services/errors/CustomError.js';
import EErrors from '../services/errors/errors-enum.js';
import { usersModel } from '../dao/models/users.model.js';

export const getProducts = async (req, res) => {
    let { pagina, limit, query, sort } = req.query;
    let datoUsuario = req.session.usuario._id
    let usuario = await usersModel.findById(datoUsuario)
    const isAdmin = usuario.rol === 'admin';
    const isUser = usuario.rol === "user"
    const isPremium = usuario.rol === "premium"
    const username = usuario.username
    const userCart = req.session.usuario.cart
    let email = usuario.email

    const cartUser = await cartModel.findById(userCart).populate('products.product', '_id title price description category code stock thumbnail').lean();
    const totalQuantity = cartUser.products.reduce((acc, item) => acc + item.quantity, 0);

    if (!pagina) {
        pagina = 1;
    }

    if (!limit) {
        limit = 6;
    }

    let filter = {};
    if (query && query !== "") {
        filter = { category: query };
    }

    switch (sort) {
        case "asc":
            sort = { "price": 1 };
            break;
        case "desc":
            sort = { "price": -1 };
            break;
        default:
            sort = undefined;
            break;
    }

    try {
        let {
            docs: listadeproductos,
            totalPages,
            prevPage, nextPage,
            page,
            hasPrevPage, hasNextPage } = await productsModel.paginate(filter, { limit: limit, page: pagina, sort: sort, lean: true });

        res.setHeader("Content-Type", "text/html");
        res.status(200).render("home", {
            status: "success",
            payload: listadeproductos,
            usuario,
            email,
            username,
            totalQuantity,
            isPremium,
            userCart,
            isAdmin,
            isUser,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink: page > 1 ? `/?page=${page - 1}` : null,
            nextLink: page < totalPages ? `/?page=${page + 1}` : null,
            listadeproductos
        });

    } catch (error) {
        req.logger.error(error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getCarts = async (req, res) => {
    try {
        let usuario = req.session.usuario
        const isAdmin = usuario.rol === 'admin';
        const carts = await cartModel.find().populate('products.product', '_id title price description category code stock thumbnail').lean();
        res.setHeader("Content-Type", "text/html");
        res.status(200).render("carts", { carts, usuario, isAdmin });

    } catch (error) {
        req.logger.error(error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getCartById = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        let usuario = req.session.usuario
        const isAdmin = usuario.rol === 'admin';
        const cart = await cartModel.findById(cid).populate('products.product', '_id title price description category code stock thumbnail').lean();
        if (!cart) {
            throw new CustomError(EErrors.CART_NOT_FOUND);
        }
        const cartTotal = cart.products.reduce((acc, prod) => acc + prod.product.price * prod.quantity, 0);
        res.setHeader("Content-Type", "text/html");
        res.status(200).render("cartDetail", { cart, cartTotal, usuario, isAdmin });

    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req, res) => {
    try {
        let datoUsuario = req.session.usuario._id;
        let usuario = await usersModel.findById(datoUsuario);
        const isAdmin = usuario.rol === 'admin';
        let email = usuario.email;
        const productId = req.params.pid;
        const userCart = req.session.usuario.cart;
        const product = JSON.parse(JSON.stringify(await productRepository.getProductById(productId)));
        res.setHeader("Content-Type", "text/html");
        res.status(200).render("productDetail", { product, usuario, isAdmin, userCart, email });
    } catch (error) {
        req.logger.error(error);
        res.status(500).send("No se encontro producto");
    }
}

export const realTimeProducts = (req, res) => {
    let usuario = req.session.usuario
    const isAdmin = usuario.rol === 'admin';
    res.render("realTimeProducts", { usuario, isAdmin })
}

export const chat = (req, res) => {
    res.render("chat")
}

export const register = (req, res) => {
    let { error, mensaje } = req.query
    res.status(200).render('register', { error, mensaje })
}

export const login = (req, res) => {
    const port = req.socket.localPort || 8080;
    res.status(200).render('login', { port })
}

export const cart = async (req, res) => {
    let usuario = req.session.usuario;
    const isAdmin = usuario.rol === 'admin';
    const isUser = usuario.rol === "user";
    const cartId = req.session.usuario.cart;
    const userCart = await cartModel.findById(cartId).populate('products.product', '_id title price description category code stock thumbnail').lean();
    const totalQuantity = userCart.products.reduce((acc, item) => acc + item.quantity, 0);
    res.status(200).render('cart', { totalQuantity, userCart, usuario, isAdmin, isUser });
}

export const user = async (req, res) => {
    let datoUsuario = req.session.usuario._id
    let usuario = await usersModel.findById(datoUsuario)
    const isAdmin = usuario.rol === 'admin';
    const isUser = usuario.rol === "user"
    const isPremium = usuario.rol === "premium"
    const cartId = req.session.usuario.cart;
    const rol = usuario.rol
    const username = usuario.username
    const email = usuario.email
    const userCart = await cartModel.findById(cartId).populate('products.product', '_id title price description category code stock thumbnail').lean();
    const totalQuantity = userCart.products.reduce((acc, item) => acc + item.quantity, 0);
    res.status(200).render('user', { totalQuantity, usuario, isPremium, isAdmin, isUser, rol, username, email })
}

export const mock = (req, res) => {
    const mockProducts = generateMockProducts();
    const cartId = req.session.usuario.cart;
    res.status(200).render('mock', {products: mockProducts, cartId});
}

export const forgotPassword = (req, res) => {
    res.status(200).render('forgotPassword')
}

export const resetPassword = (req, res) => {
    const token = req.query.token
    res.status(200).render('resetPassword', {token})
}

export const rol = async (req, res) => {
    let datoUsuario = req.session.usuario._id
    let usuario = await usersModel.findById(datoUsuario)
    let rol = usuario.rol
    let uid = usuario._id
    const isAdmin = usuario.rol === 'admin';
    const isUser = usuario.rol === "user"
    const isPremium = usuario.rol === "premium"
    res.status(200).render('rol', { rol, uid, isAdmin, isUser, isPremium})
}

export const premium = async (req, res) => {
    let datoUsuario = req.session.usuario._id
    let usuario = await usersModel.findById(datoUsuario)
    let rol = usuario.rol
    let uid = usuario._id
    let email = usuario.email
    const isAdmin = usuario.rol === 'admin';
    const isUser = usuario.rol === "user"
    const isPremium = usuario.rol === "premium"
    const productos = await productsModel.find({ owner: email }).lean();
    res.status(200).render('premium', { usuario, productos, rol, uid, isAdmin, isUser, isPremium})
}
