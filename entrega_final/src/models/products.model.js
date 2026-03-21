import { kMaxLength } from "buffer";
import mongoose from "mongoose";
import { type } from "os";

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
}, {timestamps: true}); //que agregue por defecto cada vez que añada un documento de algún producto, agregue los campos de creación y de edición de ese documento

const Product = mongoose.model("Product", productSchema);

export default Product;
