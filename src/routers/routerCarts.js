import { Router } from "express";
import { cartPostController } from "../controllers/cartPostController.js";
import { cartManager } from "../managers/cartManager.js";
import  productManager  from "../managers/productManager.js";
import { DatosFuturoCarrito } from "../models/DatosFuturoCarrito.js";


export const routerCarts = Router();
routerCarts.post("/", cartPostController);

routerCarts.get("/", async (req, res, next) => {
    try{
        const carritos = await cartManager.encontrar()
        res.status(201).json(carritos)
    }
    catch(error){
        next(error)
    }
})

routerCarts.get("/:cid", async (req,res,next) => {
    try {
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConIdyPopular(idCarrito)
        res.status(201).json(carrito)
    } catch (error) {
        next(error)
    }
})

routerCarts.post("/:cid/product/:pid", async(req,res,next) => {
    try {
        const idProducto = req.params.pid;
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        const producto = await productManager.encontrarUnoConId(idProducto)
        const quantity = 1
        const productoExiste = await carrito.products.find(c => c.product === idProducto)
        const nuevoCarrito = new DatosFuturoCarrito(producto, quantity)
        if(productoExiste){
            productoExiste.quantity = productoExiste.quantity + 1;
            await cartManager.actualizarUnoPush(idCarrito, productoExiste)
        }else 
        {await cartManager.actualizarUnoPush(idCarrito,nuevoCarrito)}
        res.status(201).json(nuevoCarrito)
    } catch (error) {
        next(error)
    }
})

routerCarts.delete("/:cid/product/:pid", async(req,res,next) => {
    try {
        const idProducto = req.params.pid;
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        const encontrar = carrito.products.find(p => p.product == idProducto)
        console.log(encontrar)
        const carritoNuevo = await cartManager.actualizarUnoPull(idCarrito, encontrar)
        res.status(201).json(carritoNuevo)
    } catch (error) {
        next(error)
    }
})

// routerCarts.put("/:cid/", async(req,res,next) => {
//     try {
//         const idCarrito = req.params.cid;
//         const carrito = await cartManager.encontrarUnoConId(idCarrito)
//         const nuevoCarrito = req.body
//         // carrito.products = nuevoCarrito
//         console.log(carrito)
//         const carritoTerminado = await cartManager.agregarCarrito(idCarrito, nuevoCarrito)
//         // const carritoEliminado = await cartManager.borrarUnoConCódigo(idCarrito)
//         res.status(201).json(carritoTerminado)
//     } catch (error) {
//         next(error)
//     }
// })

routerCarts.put("/:cid/product/:pid", async(req,res,next) => {
    try {
        const idProducto = req.params.pid;
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        const encontrar = carrito.products.find(p => p.product == idProducto)
        await cartManager.actualizarUnoPull(idCarrito, encontrar)
        encontrar.quantity = req.body.quantity
        const carritoNuevo = await cartManager.actualizarUnoPush(idCarrito, encontrar)
        res.status(201).json(encontrar)
    } catch (error) {
        next(error)
    }
})