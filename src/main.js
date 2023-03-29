import express from "express"
import { PORT } from "./config/servidor.js"
import { apiRouter } from "./routers/apiRouter.js"
import mongoose from "mongoose"
import { MONGODB_CNX_STR } from "./config/mongodb.js"
import {engine} from "express-handlebars"
import {Server} from "socket.io"
import routerWeb from "./routers/routerWebs.js";
import  productManager  from "./managers/productManager.js"
import { DatosFuturoProducto } from "./models/DatosFuturoProducto.js"
import { productosService } from "./services/products.service.js"
import { cartManager } from "./managers/cartManager.js"

export const app = express()
const httpServer = app.listen(PORT, () => {console.log(`conectado a ${PORT}`)})

app.engine("handlebars", engine())
app.set("views", "./views")
app.set("view engine", "handlebars")

app.use("/api", apiRouter)
app.use("/", routerWeb)


await mongoose.connect(MONGODB_CNX_STR)


const io = new Server(httpServer)

io.on("connection", socket => {
    console.log("cliente conectado al servidor")
    
    socket.on("newProduct", async prod => {
        const datosFuturoProducto = new DatosFuturoProducto(prod)
        productosService.registrar(datosFuturoProducto)
        io.sockets.emit("actualizar", await productManager.encontrar())
    })
    
    socket.on("refrescar",async () => {
        io.sockets.emit("actualizar", await productManager.encontrar())
    })
    
    socket.on("refrescarCarrito",async () => {
        io.sockets.emit("actualizar", await cartManager.encontrarUnoConId(id))
    })
})

