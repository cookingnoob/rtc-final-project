import express from 'express'
import { deleteList, getGlobalLists, getListById, getUserLists, patchEditList, postNewList, addNewToDoToList } from '../controllers/lists.js'
import { validateToken } from '../middlewares/authJWT.js'

const router = express.Router()
//ver todas las listas globales
router.get('/share', getGlobalLists)

//estas listas tienes que estar con su sesion iniciada
//listas del usuario
router.get('/user', validateToken, getUserLists)
//listas por id
router.get('/:id', validateToken, getListById)
//nueva lista
router.post('/new', validateToken, postNewList)
// editar lista
router.patch('/edit/:id', validateToken, patchEditList)
//eliminar lista
router.delete('/delete/:id', validateToken, deleteList)

//nuevo todo el id es de la lista para saber en donde va el todo
router.post('/new-todo/:id', validateToken, addNewToDoToList)

export { router as listsRouter } 