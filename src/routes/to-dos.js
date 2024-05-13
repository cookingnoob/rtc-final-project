import express from "express";
import { validateToken } from "../middlewares/authJWT.js";
import { deleteToDo, patchToDoInfo } from "../controllers/todos.js";


const router = express.Router()

//patch todo el id es del todo para saber cual todo hay que eliminar
router.patch('/edit/:id', validateToken, patchToDoInfo)
//eliminar todo el id es para eliminar el todo
router.delete('/delete/:id', validateToken, deleteToDo)

export { router as todoRouter }