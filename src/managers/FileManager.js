
import fs from "fs"
import Product from "../models/Products.js";
import Cart from "../models/Carts.js";

class FileManager {
    constructor() {
        this.products = [];
    }

    async addProduct(elemento){        
        const nuevoProducto = elemento
        const productos = this.products
        const propiedades = productos.map((prod) => {
            return prod.code;
        })

        productos.push(nuevoProducto)
        
        for(let i = 0; i < Product.length; i++){
            if(propiedades.includes(nuevoProducto.code)){
                throw new Error("Ya existe un producto con este código")
            } else{
                console.log("Producto añadido con éxito")
            }
        }
        fs.writeFileSync("./src/database/productos.json", JSON.stringify(productos, null, 2))
        return elemento
    }

    
    getProducts(){
        return this.products;
    }
    
    getProductById(id){ 
        const producto = this.products.find(prod => prod.id === id)
        if (producto != undefined){
            return(producto)
        } else {
            throw new Error("No se encontró producto con ese ID")
        }
    }

    updateProduct(id,nombreCampo,valor){
        const producto = this.products.find(prod => prod.id === id);
        if(producto){ if(nombreCampo && valor){
            for(let i = 0; i < producto.length; i++){
                if(producto.includes(e => producto.e == nombreCampo)){
                    producto.nombreCampo = valor
                } else {throw new Error("No se encontró campo con ese valor")}
            }
        } 
        
        return producto
    } else {throw new Error("No se encontró producto")}
        
    }

    async deleteProduct(id){
        const producto = this.products.findIndex(prod => prod.id === id);
        if(producto){
            this.products.splice(producto, 1)
        } else {
            throw new Error("No se encontro producto con ese ID")
        }

        fs.writeFileSync("./src/database/productos.json", JSON.stringify(this.products, null, 2))
        return this.products[producto]
    }
    
    async leerProductos() {
        try{
            const json = fs.readFileSync("./src/database/productos.json", "utf-8")
            const contenido = JSON.parse(json)
            this.products.push(...contenido)
            console.log(contenido)
        } catch(error) {console.log(error.message)}
    }

}

class CartManager{
    constructor(){
        this.carts = [];
    }

    createCart(id){
        const nuevoProducto = new Cart(id)
        const carritos = this.carts
        carritos.push(nuevoProducto)
        fs.writeFileSync("./src/database/carritos.json", JSON.stringify(carritos, null, 2))
    }

    getCarts(){
        return this.carts;
    }

    getCartById(id){
        const carrito = this.carts.find(c => c.id === id)
        if (carrito != undefined){
            return(carrito)
        } else {
            throw new Error("No se encontró carrito con ese ID")
        }
    }

    writeProduct(){
        const carritos = this.carts
        fs.writeFile("./src/database/carritos.json", JSON.stringify(carritos, null, 2), (err) => {if (err) console.log(err)})
    }
    
    async leerCarritos() {
        try{
            const json = fs.readFileSync("./src/database/carritos.json", "utf-8")
            const contenido = JSON.parse(json)
            this.carts.push(...contenido)
            console.log(contenido)
        } catch(error) {console.log(error.message)}
    }

}



// const prodManager = new FileManager("./database/productos.json")
// const cartManager = new FileManager("./database/carritos.json")

export const fileManager = new FileManager()
export const cartManager = new CartManager()

fileManager.leerProductos()
cartManager.leerCarritos()