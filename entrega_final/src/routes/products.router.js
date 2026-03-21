import express from "express";
import Product from "../models/products.model.js";

const productsRouter = express.Router()

productsRouter.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200)
            .json({ status: "success", payload: products })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al recuperar los productos" })
    }
})

//endpoint para crear/añadir un producto nuevo
productsRouter.post("/", async(req,res) =>{
    try {
        //toda la data que envío a través de post llega en el objeto de req, dentro de body está toda la info del producto.
        const productData = req.body;
        const newProduct = await Product.create(productData);  //de forma interna va a crear el producto en la colección y me devuelve la inifo de ese producto ya creado (la data que ya había enviado más los datos que cree de forma automática como el id o los campos de creación y edición, todo esto lo capturamos en esat variable). Aquí tenemos el nuevo producto luego de que fue añadido a la bdd
        
        //una vez añadido, enviar la respuesta de mi servidor
        res.status(201).json({status: "success", payload: newProduct}) //acá es product xq voy a agregar la info de ese producto nuevo, en la otra era products xq me traía varios productos.

    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al agregar un producto nuevo"})
    }

})

export default productsRouter;
