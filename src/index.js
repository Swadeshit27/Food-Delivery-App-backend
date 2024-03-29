import express from 'express';
import dotenv from 'dotenv'
import cors from "cors"
import { connectDB } from './db/index.js';

dotenv.config()
const app = express();
const port = process.env.PORT

import Auth from "./routes/userRoute.js"

// configure middlewares
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cors())


// db connection
connectDB();
app.get('/', (req, res) => { res.status(200).json("hello nice to meet you") })
app.use("/auth", Auth)

app.listen(port, () => console.log('listening on port ' + port)); 