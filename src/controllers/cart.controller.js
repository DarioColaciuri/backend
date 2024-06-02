import CartModel from "../dao/models/carts.model.js"
import { cartRepository, productRepository } from "../services/service.js";
import CustomError from "../services/errors/CustomError.js"
import EErrors from "../services/errors/errors-enum.js";

export const getCarts = async (req, res) => {
    try {
        res.json({ carts: await CartManager.getCarts() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createCart = async (req, res) => {
    try {
        let newCart = await cartRepository.createCart();
        res.json(newCart);
    } catch (error) {
        req.logger.error("Error al crear nuevo carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const getCartById = async (req, res, next) => {
    let cartId = req.params.cid;

    try {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new CustomError(EErrors.CART_NOT_FOUND, { cartId });
        }
        const productsInCart = cart.products.map(item => ({
            product: item.product.toObject(),
            quantity: item.quantity
        }));
        res.json({ cart });
    } catch (error) {
        next(error);
    }
}

export const addProductToCart = async (req, res, next) => {
    try {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    const productToAddCart = await productRepository.getProductById(productId);
    let quantity = req.body.quantity || 1;

    if (!productToAddCart) {
        throw new CustomError(EErrors.PRODUCT_NOT_FOUND, { productId });
    }

        const updateCart = await cartRepository.addProductToCart(cartId, productId, quantity);
        res.json(updateCart.products);
    } catch (error) {
        next(error);
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        let cartId = req.params.cid;
        let productId = req.params.pid;
        const updateCart = await cartRepository.deleteProductFromCart(cartId, productId);
        res.json({
            status: "success",
            message: "Producto eliminado del carrito correctamente",
            updateCart
        });
    } catch (error) {
        req.logger.error('Error al eliminar el producto del carrito en cart.router', error);
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor',
        });
    }
}

export const updateCart = async (req, res) => {
    let cartId = req.params.cid;
    let updatedProducts = req.body;
    try {
        let updatedCart = await cartRepository.updateCart(cartId, updatedProducts);
        res.json(updatedCart);
    } catch (error) {
        req.logger.error('Error al actualizar el carrito en cart.router', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
}

export const updateProductQuantity = async (req, res) => {
    try {
        let cartId = req.params.cid;
        let productId = req.params.pid;
        const newQuantity = req.body.quantity;
        let updatedCart = await cartRepository.updateProductQuantity(cartId, productId, newQuantity);
        res.json({
            status: "success",
            message: "Cantidad del producto actualizada correctamente",
            updatedCart,
        });
    } catch (error) {
        req.logger.error('Error al actualizar la cantidad del producto en el carrito desde cart.router', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
}

export const emptyCart = async (req, res) => {
    try {
        let cartId = req.params.cid;
        let updatedCart = await cartRepository.emptyCart(cartId);
        res.json({
            status: 'success',
            message: 'Todos los productos del carrito fueron eliminados correctamente',
            updatedCart,
        });
    } catch (error) {
        req.logger.error('Error al vaciar el carrito desde cart router', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
}


