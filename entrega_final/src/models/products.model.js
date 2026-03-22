import { kMaxLength } from "buffer";
import mongoose from "mongoose";
import { type } from "os";
import { title } from "process";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 500
    },
    code: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true,
        enum: ["auriculares", "teclados", "mouse"]
    },
    thumbnail: {
        type: String,
        trim: true,
        default: "product.jpg"
    }
}, { timestamps: true }); //que agregue por defecto cada vez que añada un documento de algún producto, agregue los campos de creación y de edición de ese documento

//Indexación - Optimización de consultas: mejora la eficiencia de cómo nos llega esa info
//comprobar que ciertos campos tengan un valor único, en el caso de que exista va a rechazar esa solicitud
//índice de tipo único para el campo title y code
productSchema.index({ title: 1 }, { unique: true });
productSchema.index({ code: 1 }, { unique: true });

//índice para búsqeudas por texto para campo description
productSchema.index({ description: "text" });

//índice para filtrar/ordenar por campos de precio y categoría
productSchema.index({ price: 1 });
productSchema.index({ category: 1 });

//índice compuesto, que filtre por ambos campos a la vez
productSchema.index({ category: 1, price: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;

