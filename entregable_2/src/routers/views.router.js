import express from 'express';
import ProductManager from '../utils/ProductoManager.js';
//import CartManager from './managers/CartManager.js';

//creamos la variable que va a manejar todas las rutas relacionadas a las vistas
const viewsRouter = express.Router();

//creamos una instancia de ProductManager y CartManager para poder usar sus metodos en las rutas
const productManager = new ProductManager('./src/data/products.json');
//const cartManager = new CartManager('./database/carts.json');

//creamos las rutas para las vistas
viewsRouter.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        console.error("Error al obtener los productos para la vista home.", error);
        res.status(500).send({ message: error.message });
    }
});

//hacemos un export default para importar este views router en el app.js y usarlo como middleware para las rutas relacionadas a las vistas.
export default viewsRouter;
