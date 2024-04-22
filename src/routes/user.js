import express from 'express'
import { loginUser, registerUser } from '../controllers/user.js'
import { checkEmailPassword } from '../middlewares/validators.js'

const userRouter = express.Router()

userRouter.post("/register", checkEmailPassword, registerUser)

userRouter.post('/login', loginUser)

export default userRouter