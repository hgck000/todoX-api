import express from 'express'
import taskRoute from './routes/tasksRouters.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 5001

const app = express()

// middlewares
app.use(express.json())
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({origin: 'http://localhost:5173'}))
}

app.use("/api/tasks", taskRoute)

// if (process.env.NODE_ENV === 'production')

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
