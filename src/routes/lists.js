import express from 'express'
import { getGlobalLists } from '../controllers/lists.js'

const router = express.Router()

router.get('/share', getGlobalLists)

router

export { router as listsRouter } 