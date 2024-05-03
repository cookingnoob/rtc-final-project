import express from 'express'
import { getGlobalLists, getUserLists, postNewList } from '../controllers/lists.js'
import { validateToken } from '../middlewares/authJWT.js'

const router = express.Router()
//ver todas las listas globales
router.get('/share', getGlobalLists)

//estas listas tienes que estar con su sesion iniciada
//listas del usuario
router.get('/user', validateToken, getUserLists)
//nueva lista
router.post('/new', validateToken, postNewList)
// editar lista
//eliminar lista

export { router as listsRouter } 