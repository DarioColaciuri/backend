const express = require("express");
const app = express();
const PORT = 8080;
const ProductManager = require("./ProductManager");
const products = new ProductManager('productos.json');

app.get("/", (req, res) => {
    res.send("Pagina principal");
})

app.get("/products", async (req, res) => {
    try {
        let limit = req.query.limit;
        let productList = limit ? (await products.getProducts()).slice(0, limit) : await products.getProducts();
        res.json({ products: productList });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        let productId = parseInt(req.params.id);
        let product = await products.getProductById(productId);
        res.json({ product });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});