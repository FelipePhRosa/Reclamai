import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./router"
import path from "path"

dotenv.config()

const server = express()
const PORT = 3000

server.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

server.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
server.use(express.json());
server.use(router)

server.listen(PORT, () => console.log(`Server Listening: ${PORT}`));