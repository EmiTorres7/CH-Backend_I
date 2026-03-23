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

//endpoint para agregar un producto al carrito
cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        //definir los valores para manipular el contenido, recibir/capturar el id del carrito (cid) y el id (pid) del producto de la url
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        //guardar actualizaciones
        const updatedCart = await Cart.findByIdAndUpdate(cid, { $push: { products: { product: pid, quantity: quantity } } }, { new: true, runValidators: true });
        res.status(200).json({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al agregar un producto al carrito" })
    }
})

//endpoint para traernos los productos del carrito
cartRouter.get("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await Cart.findById(cid); //si no encuentra el id no nos va a devovler nada en la variable cart
        if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" })
        res.status(200).json({ status: "success", payload: cart.products });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al recuperar los productos del carrito" })
    }
})

export default cartRouter;
