import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nlpRoutes from './routes/nlp.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/nlp', nlpRoutes)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
