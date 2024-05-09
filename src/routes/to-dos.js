import express from "express";
import { validateToken } from "../middlewares/authJWT.js";


const router = express.Router()

//el usuario tiene que estar con su sesion iniciada
//todos los to-do de la lista (si la lista es global no es necesario que el usuario inicie sesion)
router.post('/new', validateToken)
//todos los to-do con la etiqueta done
//nuevo todo
//editar todo
//eliminar todo

export { router as todoRouter }