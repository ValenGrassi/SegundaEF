import { Router } from "express";
import { productosPostController } from "../controllers/productosPostController.js";
import  productManager  from "../managers/productManager.js";
import customLabels from "../config/customLabels.js";

export const routerProducts = Router();
routerProducts.post("/", productosPostController);

routerProducts.get("/", async (req,res,next) => {
    try{
        // const productos = await productManager.encontrar()
        let limit = req.query.limit
        if (!req.query.limit){limit = 10}
        console.log(limit)
        let page = req.query.page
        if(!req.query.page){page = 1}
        let query = req.query.query 
        if(!req.query.query){query = {}}
        let sort = req.query.sort
        if(!req.query.sort){sort = ""}


        const criterio = query
        const opciones = {limit: limit, page: page, customLabels: customLabels, sort: {price: sort}}
        const productos = await productManager.paginar(criterio,opciones)
        res.status(201).json(productos)
    }
    catch(error){
        next(error)
    }
})

routerProducts.put("/:code", async (req,res,next) => {
        try{
            const cambio = req.body
            const codigoProducto = req.params.code;
            const producto = productManager.actualizarUnoConCódigo(codigoProducto, cambio)
            res.status(201).json(producto)
        }
        catch(error){
            next(error)
        }
})

routerProducts.delete("/:code", async (req,res,next) => {
    try {
        const codigoProducto = req.params.code;
        const producto = productManager.borrarUnoConCódigo(codigoProducto)
        res.status(201).json(producto)
    } 
    catch (error) {
        next(error)
    }
})