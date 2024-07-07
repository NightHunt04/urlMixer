require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// to connect to MongoDB
const { connectMongoDB } = require('./connect')

// middleware to check session id
const { checkSessionsIds } = require('./middlewares/auth')

// routes
const urlRoutes = require('./routes/url')
const userRoutes = require('./routes/user')

const app = express()
// const PORT = 8000

const mongoURI = process.env.MONGOOSE_URI
const localMongoURI = 'mongodb://127.0.0.1:27017/urlProj'

// connecting MongoDB
connectMongoDB(mongoURI)
.then(() => console.log('Mongo is connected'))

// middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// routes
app.use('/user', userRoutes)
app.use('/', checkSessionsIds, urlRoutes)

// run the server
// app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
module.exports = app