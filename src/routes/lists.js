import express from 'express'
import { getGlobalLists } from '../controllers/lists.js'

const router = express.Router()

router.get('/', getGlobalLists)

export { router as listsRouter } 