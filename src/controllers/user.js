import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import List from "../models/lists.js";
import { signToken } from "../middlewares/jwt.js";

const registerUser = async (req, res, next) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      const error = new Error('este usuario ya está registrado')
      error.status = 400
      next(error)
    }

    const nameExists = await User.findOne({ name: name })
    if (nameExists) {
      const error = new Error('este nombre de usuario ya está registrado')
      error.status = 400
      next(error)
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    const generalList = new List({
      listName: 'General',
      color: '#4EA3F2',
      user: newUser._id,
      global: false,
      ratings: 0,
    })


    await generalList.save()

    const priorityList = new List({
      listName: 'Prioritarios',
      color: '#ff5757',
      user: newUser._id,
      global: false,
      ratings: 0,
    })


    await priorityList.save()

    const payload = { id: newUser._id }
    const token = signToken(payload)

    res.status(201).json({ data: `se creó una cuenta con el correo ${email}`, token })
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      return res.status(400).json({ errorMessage: 'verifica tus credenciales para iniciar sesión' })
    }

    const isPasswordRight = await bcrypt.compare(password, userExists.password)

    if (!isPasswordRight) {
      return res.status(400).json({ errorMessage: 'verifica tus credenciales para iniciar sesión' })
    }

    if (userExists && isPasswordRight) {
      const payload = { id: userExists._id }
      const token = signToken(payload)
      res.status(201).json({ data: `iniciaste sesión`, token })
    }

  } catch (error) {
    next(error)
  }
}
export { registerUser, loginUser };
