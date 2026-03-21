import express from "express"
import mongoose from "mongoose";

const app = express();
const PORT = 8080;

const connectMongoDB = async() => {
    try {
        
    } catch (error) {
        console.log("Error al conectar con MongoDB: ", error)        
    }
}


app.listen(PORT, ()=>{
    console.log(`El servidor está corriendo en ${PORT}`)
})


