import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//import { product } from './managers/productManager.js';
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
app.use(express.static('/public'));
//habilitamos para recibir datos de formularios
app.use(express.urlencoded({ extended: true }));

//endpoints
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


//iniciamos el servidor y escuchamos en el puerto definido
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: http://localhost:${PORT}`);
});














