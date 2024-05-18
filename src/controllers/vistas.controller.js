// import ProductManager from '../dao/Mongo/productManagerMongo.js';
import { productRepository } from '../services/service.js';
import { productsModel } from '../dao/models/products.model.js';
import cartModel from '../dao/models/carts.model.js';
import __dirname from "../utils.js"

// const products = new ProductManager()

export const getProducts = async (req, res) => {
    let { pagina, limit, query, sort } = req.query;
    let usuario = req.session.usuario
    const isAdmin = usuario.rol === 'admin';
    const isUser = usuario.rol === "user"
    const userCart = req.session.usuario.cart
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
            totalQuantity,
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
        console.error(error);
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
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getCartById = async (req, res) => {
    try {
        const cid = req.params.cid;
        let usuario = req.session.usuario
        const isAdmin = usuario.rol === 'admin';
        const cart = await cartModel.findById(cid).populate('products.product', '_id title price description category code stock thumbnail').lean();
        const cartTotal = cart.products.reduce((acc, prod) => acc + prod.product.price * prod.quantity, 0);
        res.setHeader("Content-Type", "text/html");
        res.status(200).render("cartDetail", { cart, cartTotal, usuario, isAdmin });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getProductById = async (req, res) => {
    try {
        let usuario = req.session.usuario
        const isAdmin = usuario.rol === 'admin';
        const productId = req.params.pid;
        const userCart = req.session.usuario.cart
        const product = JSON.parse(JSON.stringify(await productRepository.getProductById(productId)));
        res.setHeader("Content-Type", "text/html");
        res.status(200).render("productDetail", { product, usuario, isAdmin, userCart });
    } catch (error) {
        console.error(error);
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
    res.status(200).render('login')
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
    let usuario = req.session.usuario
    const isAdmin = usuario.rol === 'admin';
    const isUser = usuario.rol === "user"
    const cartId = req.session.usuario.cart;
    const userCart = await cartModel.findById(cartId).populate('products.product', '_id title price description category code stock thumbnail').lean();
    const totalQuantity = userCart.products.reduce((acc, item) => acc + item.quantity, 0);
    res.status(200).render('user', { totalQuantity, usuario, isAdmin, isUser })
}

