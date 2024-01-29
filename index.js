class ProductManager {
    constructor() {
        this.products = []
        this.productId = 1
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Faltan datos")
        } 
        let repetido = this.products.find(product => product.code === code)
        if (repetido) {
            throw new Error(`El código ${code} ya existe`)
        }
        const product = { id: this.productId++, title, description, price, thumbnail, code, stock }
        this.products.push(product)
    }

    getProducts() {
        return this.products
    }

    getProductsById(id) {
        let product = this.products.find(product => product.id === id)
        if (!product) {
            throw new Error(`No existe el producto con el id ${id}`)
        }
        return product
    }
}


const products = new ProductManager()
products.addProduct("a", "abc", 10, "foto1", "1", 100)
products.addProduct("b", "dfg", 11, "foto2", "2", 200)
products.addProduct("c", "hij", 12, "foto3", "3", 300)
products.addProduct("d", "klm", 13, "foto4", "4", 400)

console.log(products.getProducts())
console.log(products.getProductsById(1))





