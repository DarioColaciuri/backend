import express from 'express';
import { routes } from '../utils.js';
const router = express.Router();
import ProductManager from '../managers/ProductManager.js';

const rutaProductos = routes.products;
const products = new ProductManager(rutaProductos);

router.get("/", async (req, res) => {
    try {
        let limit = req.query.limit;
        let productList = limit ? (await products.getProducts()).slice(0, limit) : await products.getProducts();
        res.json({ products: productList });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:pid", async (req, res) => {
    try {
        let productId = parseInt(req.params.pid);
        let product = await products.getProductById(productId);
        res.json({ product });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        await products.addProduct(newProduct);
        res.status(201).json({ message: "Producto creado correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedProduct = req.body;
        await products.updateProduct(productId, updatedProduct);
        res.json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        await products.deleteProduct(productId);
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;