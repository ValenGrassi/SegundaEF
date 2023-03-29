import { cartManager } from "../managers/cartManager.js";

class CartService{
    async registrar(datosFuturoCarrito){
        const carritoRegistrado = await cartManager.guardar(datosFuturoCarrito);
        return carritoRegistrado;
    }
}

export const cartService = new CartService()