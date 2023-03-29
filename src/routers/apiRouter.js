import { json, Router } from "express";
import express from "express";
import { errorHandler } from "../errors/errorHandler.js";
import { routerCarts } from "./routerCarts.js";
import {routerProducts} from "./routerProducts.js"


export const apiRouter = Router();

apiRouter.use(json())
apiRouter.use(express.urlencoded({extended:true}))


apiRouter.use("/products", routerProducts)
apiRouter.use("/carts", routerCarts)
apiRouter.use(errorHandler);
