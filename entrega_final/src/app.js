import express from "express";
import productsRouter from "./routes/products.router.js";
import dotenv from "dotenv";
dotenv.config();
import connectMongoDB from "./config/mongoose.config.js";

const app = express();
const PORT = 8080;

//habilitamos apra poder recibir json. configuración para poder recibir json.
app.use(express.json());

connectMongoDB();

//Endpoints
app.use("/api/products", productsRouter)




app.listen(PORT, () => {
    console.log(`El servidor está corriendo en ${PORT}`)
})


