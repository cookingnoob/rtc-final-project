import { check } from "express-validator";

const checkEmailPassword = [
    check("email", "ingresa un correo válido").isEmail(),
    check("password", "la contraseña dene tener al menos 6 caractéres").isLength({min: 6})
        .matches(/[a-z]/).withMessage('la contraseña debe tener al menos una minuscula')
        .matches(/[A-Z]/).withMessage('la contraseña debe tener al menos una mayuscula')
        .matches(/[0-9]/).withMessage('la contraseña debe tener al menos un numero')
]

export {checkEmailPassword}