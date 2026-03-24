import express from "express";

//manejador de las rutas para tener todas las funcionalidades para poder crear las rutas
const viewsRouter = express.Router();

viewsRouter.get("/", async(req,res) =>{
    res.render("home");
});

export default viewsRouter;