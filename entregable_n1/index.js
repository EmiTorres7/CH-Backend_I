const express = require('express');
const app = express();
const PORT = 8080;

const productManager = require('./utils/ProductManager');
const product = new productManager('./database/products.json');

const CartManager = require('./utils/CartManager');
const cart = new CartManager('./database/carts.json');

app.use(express.json());


// Endpoint para obtener los productos
app.get('/api/products', async (req, res) => {
    const result = await product.getProducts();
    res
    .status(result.status)
    .json(result.status === 200 ? result.data : result.message);
});

app.get('/api/products/:id', async (req, res) => {
    const result = await product.getProductById(req.params.id);
    res
    .status(result.status)
    .json(result.status === 200 ? result.data : result.message);
});

// Endopoint para agregar un producto al carrito
app.post('/api/products', async (req, res) => {
    const result = await product.addProduct(req.body);
    res
    .status(result.status)
    .json(result.status === 200 ? result.data : result.message);
});

// Endpoint para actualizar un producto
app.put('/api/products/:id', async (req, res) => {
    const result = await product.updateProduct(req.params.id, req.body);
    res
    .status(result.status)
    .json(result.status === 200 ? result.data : result.message);
});


// Endpoint para eliminar un producto
app.delete('/api/products/:id', async (req, res) => {
    const result = await product.deleteProduct(req.params.id);
    res
    .status(result.status)
    .json(result.status === 200 ? result.data : result.message);
});



// Endpoint para crear un carrito
app.post('/api/carts', async (req, res) => {
    const result = await cart.createCart(); 


    

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});








