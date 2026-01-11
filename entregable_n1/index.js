const express = require('express');
const app = express();
const PORT = 8080;

const productManager = require('./utils/ProductManager');
const product = new productManager('./database/products.json');


app.get('/api/products', async (req, res) => {
    const result = await product.getProducts();
    res.status(200).json(result);
});

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});








