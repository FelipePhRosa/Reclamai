import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./router"

dotenv.config()

const server = express()
const PORT = 3000

server.use(cors({
    origin: "http://localhost:5173"
}));

server.use(express.json());
server.use(router)

server.listen(PORT, () => console.log(`Server Listening: ${PORT}`));