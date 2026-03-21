import express from "express";
import Product from "../models/products.model.js";

const productsRouter = express.Router()

productsRouter.get("/", async (requestAnimationFrame, res) => {
    try {
        res.status(200)
            .json({ status: "success", products: products })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al recuperar los productos" })
    }
})

export default productsRouter;
