import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../src/config/mongodb.js";
import { DatosFuturoPaciente } from "../src/models/DatosFuturoPaciente.js";
import { pacientesService } from "../src/services/pacientes.service.js";



await mongoose.connect(MONGODB_CNX_STR)

const datosFuturoPaciente = new DatosFuturoPaciente({
    nombre: "valentino",
    apellido: "grassi",
    dni: "45481219",
    edad: 19
});
const pacienteRegistrado = await pacientesService.registrar(datosFuturoPaciente)

console.log(pacienteRegistrado)

mongoose.connection.close()