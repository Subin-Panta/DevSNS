const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const path = require('path')
const app = express()

//connect Database
connectDB()

// for cross origin reference
app.use(cors())
//express Bodyparser Middleware
app.use(express.json({ extended: false }))

//define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	//set static folder
	const publicPath = path.join(__dirname, client/', 'build')
	app.use(express.static(publicPath))
	app.get('*', (req, res) => {
		res.sendFile(path.join(publicPath, 'index.html'))
	})
}
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`server running on ${PORT}`)
})
