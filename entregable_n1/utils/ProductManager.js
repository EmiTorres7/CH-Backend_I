const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    getProducts = async () => {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            console.error("Error al leer el archivo productos", error);
            return [];
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        return products.find(product => product.id === id);
    }

    addProduct = async (product) => {
        try {
            if (
                !product.title ||
                !product.description ||
                !product.price ||
                !product.thumbnail ||
                !product.code ||
                !product.stock
            ) {
                throw new Error("Uno o más campos están incompletos.");
            }

            const products = await this.getProducts();
            const newProduct = [...products, { ...product, id: products.length + 1 }];
            return newProduct;
        }
        catch (error) {
            console.error("Error al agregar el producto", error);
            return null;
        }
    }
}

module.exports = ProductManager







