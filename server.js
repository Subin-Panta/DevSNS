const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()

//connect Database
connectDB()

//express Bodyparser Middleware
app.use(cors())
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('Api running'))

//define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.port || 5000
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})
