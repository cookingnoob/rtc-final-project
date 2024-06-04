import jwt from 'jsonwebtoken'
import { verifyToken } from './jwt.js'

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      const error = new Error('inicia sesion o crea una cuenta')
      error.status = 401
      next(error)
    }
    const [, token] = authorization.split(' ')
    if (!token) {
      const error = new Error('inicia sesion o crea una cuenta')
      error.status = 401
      next(error)
    }
    const validToken = verifyToken(token)
    req.user = validToken
    next()
  } catch (error) {
    next(error)
  }
}
export { validateToken }