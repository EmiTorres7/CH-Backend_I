import express from 'express';
//import { Router } from 'express';
//const router = Router();

//import ProductManager from './managers/ProductManager.js';
//import CartManager from './managers/CartManager.js';

//creamos la variable que va a manejar todas las rutas relacionadas a las vistas
const viewsRouter = express.Router();

//creamos una instancia de ProductManager y CartManager para poder usar sus metodos en las rutas
//const productManager = new ProductManager('./database/products.json');
//const cartManager = new CartManager('./database/carts.json');

//creamos las rutas para las vistas
viewsRouter.get('/', (req, res) => {
    res.render('home');
});

//hacemos un export default para importar este views router en el app.js y usarlo como middleware para las rutas relacionadas a las vistas.
export default viewsRouter;
