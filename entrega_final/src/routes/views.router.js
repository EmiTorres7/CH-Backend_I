import express, { text } from "express";
import Product from  "../models/products.model.js";

//manejador de las rutas para tener todas las funcionalidades para poder crear las rutas
const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res) => {
    try {
        //tapturar los queryparams
        const { limit=10, page=1 } = req.query;

        //guardar la data que nos llegue de la consulta del await con el modelo de porducto
        const data = await Product.paginate({ }, {limit, page, lean:true});
        const products = data.docs;
        delete data.docs;

        //links
        const links = [];

        for(let i = 1; i <= data.totalPages; i++) {
            links.push({text:i, link:`?limit=${limit}&page=${i}` });
        }

        //renderizar mostrar la página
        res.render("home", { products, links });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al mostrar la página" })
    }
});

export default viewsRouter;