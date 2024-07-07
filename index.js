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
// const localMongoURI = 'mongodb://127.0.0.1:27017/urlProj'

// connecting MongoDB
connectMongoDB(mongoURI)
// .then(() => console.log('Mongo is connected'))

// middleware
app.use(express.json())
app.use(cors({
    origin: 'https://url-changer.vercel.app',
    allowedHeaders: 'Content-Type',
}))
app.use(cookieParser())

app.options('*', cors()); // Handle preflight requests for all routes
app.options('/user/login', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://url-changer.vercel.app')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.sendStatus(200)
})

// routes
app.use('/user', userRoutes)
app.use('/', checkSessionsIds, urlRoutes)

// run the server
// app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
module.exports = app