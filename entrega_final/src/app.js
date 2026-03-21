import express from "express";
import mongoose from "mongoose";
import Product from "../../../mongoDB/src/models/product.model.js";
import dotenv from "dotenv";
import productsRouter from "./routes/products.router";
dotenv.config();

const app = express();
const PORT = 8080;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOdb_URI)
        console.log("Conectado con MongoDB")
    } catch (error) {
        console.log("Error al conectar con MongoDB: ", error)
    }
}

connectMongoDB();

//Endpoints
app.use("/api/products", productsRouter)


app.listen(PORT, () => {
    console.log(`El servidor está corriendo en ${PORT}`)
})


