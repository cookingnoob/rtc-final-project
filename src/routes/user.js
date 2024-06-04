import express from 'express'
import { loginUser, registerUser } from '../controllers/user.js'
import { checkEmailPassword } from '../middlewares/validators.js'
import { validateToken } from '../middlewares/authJWT.js'

const router = express.Router()

router.post("/register", checkEmailPassword, registerUser)

router.post('/login', loginUser)

router.post('/valid', validateToken)

//editar informacion de usuario

//eliminar usuario

export { router as userRouter }
