import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import { userRouter } from "./routes/user.js";
import connectToDB from "./config/connectDB.js";
import { listsRouter } from "./routes/lists.js";
import { todoRouter } from "./routes/to-dos.js";


//CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

connectToDB();

//ROUTES
app.use("/user", userRouter);
app.use('/lists', listsRouter)
app.use('/todos', todoRouter)

app.use((req, res, next) => {
  const error = new Error("No encontramos lo que buscabas")
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  console.error(err)
  if (err.status) {
    res.status(err.status).json({ error: err.message })
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ error: 'Validación fallida', error: err.message })
  } else if (err.code && err.code === 11000) {
    res.status(409).json({ error: 'La informacion se está duplicando' })
  } else {
    res.status(500).json({ error: 'Error interno en el servidor' })
  }
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`corriendo en localhost:${PORT}`);
});