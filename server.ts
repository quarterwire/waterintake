import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

const staticPath = path.join(__dirname, 'dist')
app.use(express.static(staticPath))

app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

// Start the server
app.listen(port, () => {
  console.log(`🚀 Express server running on http://localhost:${port}`)
})
