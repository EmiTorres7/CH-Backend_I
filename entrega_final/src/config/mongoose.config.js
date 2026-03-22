import mongoose from "mongoose"

//función para conectarnos a mongoDB
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Conectado con MongoDB")
    } catch (error) {
        console.log("Error al conectar con MongoDB: ", error)
    }
}

export default connectMongoDB;

