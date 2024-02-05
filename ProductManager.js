const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data);
    }

    generateId() {
        return this.products.length > 0 ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
    }

    addProduct = (newProduct) => {
        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
            throw new Error("Faltan datos");
        }

        let repetido = this.products.find(product => product.code === newProduct.code);
        if (repetido) {
            throw new Error(`El código ${newProduct.code} ya existe`);
        }
        if (isNaN(Number(newProduct.code))) {
            throw new Error(`El código debe ser un número`);
        }

        const product = {
            id: this.generateId(),
            title: newProduct.title,
            description: newProduct.description,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            code: newProduct.code,
            stock: newProduct.stock
        };

        this.products.push(product);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error(`No existe el producto con el id ${id}`);
        }
        return product;
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error(`No existe el producto con el id ${id}`);
        }

        this.products[index] = { ...this.products[index], ...updatedProduct };
        this.saveProducts();
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error(`No existe el producto con el id ${id}`);
        }

        this.products.splice(index, 1);
        this.saveProducts();
    }
}

const products = new ProductManager('productos.json');

// ************************************
// products.addProduct({
//     title: "producto de prueba",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "1",
//     stock: 25
// });

// console.log(products.getProducts());
// console.log(products.getProductById(3));

// products.updateProduct(3, { price: 20, stock: 150 });
// console.log(products.getProducts());

// products.deleteProduct(7);
// console.log(products.getProducts());






