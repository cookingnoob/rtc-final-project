import { query } from "express-validator"
import User from "../models/user.js"

const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email, password} = req.body;

        
    } catch (error) {
        next(error)
    }
}

export {registerUser}