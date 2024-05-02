import jwt from 'jsonwebtoken'

const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '1h' })
  return token
}

const verifyToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_TOKEN)
  return payload
}

export { signToken, verifyToken }