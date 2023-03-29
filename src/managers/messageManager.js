import { ManagerMongoose } from "./ManagerMongoose.js"

export const messageManager = new ManagerMongoose("messages", {
    dni: {type: String ,required: true},
    nombre: {type: String ,required: true},
    apellido: {type: String,required: true},
    edad: {type: Number ,required: true}
})