import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pollRoutes from "./routes/poll.routes.js"

dotenv.config()

const app = express()
const PORT = 3000

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())

app.use("/api", pollRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
