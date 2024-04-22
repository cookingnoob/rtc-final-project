import { query, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const registerUser = async (req, res, next) => {
    console.log(req.body)
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400).json({ errorMessage: "este usuario ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({data: `se creó una cuenta con el correo ${email}`})
  } catch (error) {
    next(error);
  }
};

export { registerUser };
