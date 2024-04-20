import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const app = express()

app.use('/', (req, res) => {
    res.send('<h1>Sí funciona</h1>')
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`escuchando solicitudes de ${PORT}`)
})
