import express from 'express';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http';

//import { product } from './managers/productManager.js';
//import { cart } from './managers/cartManager.js';
//import { __dirname } from './utils.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', '/src/views');

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














