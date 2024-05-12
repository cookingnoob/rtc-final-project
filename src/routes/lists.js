import express from 'express'
import { deleteList, deleteToDo, getGlobalLists, getListById, getUserLists, patchEditList, patchToDoInfo, postNewList, postNewTodo } from '../controllers/lists.js'
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
router.post('/new-todo/:id', validateToken, postNewTodo)
//patch todo el id es del todo para saber cual todo hay que eliminar
router.patch('/patch-todo/:id', validateToken, patchToDoInfo)
//eliminar todo el id es para eliminar el todo
router.delete('/delete-todo/:id', validateToken, deleteToDo)
export { router as listsRouter } 