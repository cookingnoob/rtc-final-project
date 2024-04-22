import express from 'express'
import { registerUser } from '../controllers/user.js'
import { checkEmailPassword } from '../middlewares/validators.js'

const userRouter = express.Router()

userRouter.post("/register", checkEmailPassword, registerUser)

export default userRouter