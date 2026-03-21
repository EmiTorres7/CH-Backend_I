import express from "express";
import mongoose from "mongoose";
import productsRouter from "./routes/products.router.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 8080;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
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


