import Cart from "../models/cart.model.js";
import express from "express";

const cartRouter = express.Router()

//endpoint del carrito
cartRouter.post("/", async (req, res) => {
    try {
        //guardamos en esta variable el carrito que voy a crear
        const cart = await Cart.create({});
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al agregar el carrito" })
    }
})

export default cartRouter;
