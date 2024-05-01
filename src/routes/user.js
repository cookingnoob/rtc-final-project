import express from 'express'
import { loginUser, registerUser } from '../controllers/user.js'
import { checkEmailPassword } from '../middlewares/validators.js'

const router = express.Router()

router.post("/register", checkEmailPassword, registerUser)

router.post('/login', loginUser)

export { router as userRouter }
