import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http';
import ProductManager from './utils/ProductoManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//import { cart } from './managers/cartManager.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//puerto a nuestro servidor
const PORT = 8080;

//habilitamos apra poder recibir json
app.use(express.json());
//habilitamos la carpeta public para archivos estaticos
app.use(express.static('public'));
//habilitamos para recibir datos de formularios
app.use(express.urlencoded({ extended: true }));

//endpoints
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


//WEBSOCKETS
const productManager = new ProductManager('./src/data/products.json');
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.on('newProduct', async (productData) => {
        try {
            const newProduct = await productManager.addProduct(productData);
            console.log('Nuevo producto agregado:', newProduct);
            io.emit('productAdded', newProduct.data); // Emitir a todos los clientes conectados
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    });
});



//iniciamos el servidor y escuchamos en el puerto definido
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: http://localhost:${PORT}`);
});















