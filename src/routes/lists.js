import express from 'express'
import { deleteList, getGlobalLists, getListById, getUserLists, patchEditList, postNewList } from '../controllers/lists.js'
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
//nuevo todo
router.post('new-todo/:id', validateToken)
// editar lista
router.patch('/:id/edit', validateToken, patchEditList)
//eliminar lista
router.delete('/:id/delete', validateToken, deleteList)

export { router as listsRouter } 