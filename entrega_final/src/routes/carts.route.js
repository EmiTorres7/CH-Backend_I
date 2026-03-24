import Cart from "../models/cart.model.js";
import Product from "../models/products.model.js";
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

        //verificar que el producto exista
        const product = await Product.findById(pid);
        if (!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

        //verificamos que el carrito exista y obtenemos el carrito
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" })

        //verificar si el producto que quiero insertar existe dentro del carrito
        const productoIndex = cart.products.findIndex((p) => p.product == pid); //en caso que no exista nos devuelve -1
        if (productoIndex !== -1) {
            //incrementar la cantidad del producto en el carrito
            cart.products[productoIndex].quantity += quantity
        } else {
            //si no existe en el carrito, lo agregamos como producto nuevo
            cart.products.push({ product: pid, quantity })
        }
        //estos cambios no se subieron aún a la bdd (son cambios locales). para guardar esos cambios de la variable cart
        const updatedCart = await cart.save();

        //guardar actualizaciones
        //const updatedCart = await Cart.findByIdAndUpdate(cid, { $push: { products: { product: pid, quantity: quantity } } }, { new: //true, runValidators: true });
        res.status(200).json({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al agregar un producto al carrito" })
    }
})

//endpoint para traernos los productos del carrito
cartRouter.get("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await Cart.findById(cid).populate("products.product"); //si no encuentra el id no nos va a devovler nada en la variable cart
        if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" })
        res.status(200).json({ status: "success", payload: cart.products });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al recuperar los productos del carrito" })
    }
})

export default cartRouter;
