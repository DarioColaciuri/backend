import express from 'express';
import { routes } from '../utils.js';
const router = express.Router();
import CartManager from '../managers/CartManager.js';
let rutaCarts = routes.carts;
const carts = new CartManager(rutaCarts);

router.get("/", async (req, res) => {
    try {
        res.json({ carts: await carts.getAllCarts() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const newCart = req.body;
        await carts.addCart(newCart);
        res.json({ message: "Carrito creado correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await carts.getCartById(cartId);
        res.json({ cart });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = parseInt(req.params.pid);
        const quantity = req.body.quantity || 1;
        await carts.addProductToCart(cartId, productId, quantity);
        res.json({ message: "Producto agregado al carrito correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;