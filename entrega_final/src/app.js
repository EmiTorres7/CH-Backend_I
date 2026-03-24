import express from "express";
import productsRouter from "./routes/products.router.js";
import dotenv from "dotenv";
import connectMongoDB from "./config/mongoose.config.js";
import cartRouter from "./routes/carts.route.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";

//inicializamos las variables de entorno
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8081;

//habilitamos apra poder recibir json. configuración para poder recibir json.
app.use(express.json());

connectMongoDB();

//handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Endpoints
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en ${PORT}`)
})





