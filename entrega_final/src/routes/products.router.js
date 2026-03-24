import express from "express";
import Product from "../models/products.model.js";

const productsRouter = express.Router()

//endpoint para traer los productos
productsRouter.get("/", async (req, res) => {
    try {
        const data = await Product.paginate({}, { limit: 2, page: 1 });
        const products = data.docs;
        delete data.docs;
        res.status(200).json({ status: "success", payload: products, ...data })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al recuperar los productos" })
    }
})

//endpoint para crear/añadir un producto nuevo
productsRouter.post("/", async (req, res) => {
    try {
        //toda la data que envío a través de post llega en el objeto de req, dentro de body está toda la info del producto.
        const productData = req.body;
        const newProduct = await Product.create(productData);  //de forma interna va a crear el producto en la colección y me devuelve la inifo de ese producto ya creado (la data que ya había enviado más los datos que cree de forma automática como el id o los campos de creación y edición, todo esto lo capturamos en esat variable). Aquí tenemos el nuevo producto luego de que fue añadido a la bdd

        //una vez añadido, enviar la respuesta de mi servidor
        res.status(201).json({ status: "success", payload: newProduct }) //acá es product xq voy a agregar la info de ese producto nuevo, en la otra era products xq me traía varios productos.

    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al agregar un producto nuevo", error })
    }
})

//endpoint para editar la información de un producto
productsRouter.put("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid; //capturamos el id del producto que quiero editar
        //capturamos las actualizaciones, necesitamos el objeto con las actualizaciones que nos mandan a través del body
        const updateData = req.body;

        //guardar los datos del producto que fue modificado
        const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, { new: true, runValidators: true });
        if (!updatedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        res.status(200).json({ status: "success", payload: updatedProduct });

    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al editar un producto", error })
    }
})

//endpoint para eliminar un producto
productsRouter.delete("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const deletedProduct = await Product.findByIdAndDelete(pid);
        if (!deletedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        res.status(200).json({ status: "succes", payload: deletedProduct });

    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al eliminar un producto", error })
    }
})

export default productsRouter;
