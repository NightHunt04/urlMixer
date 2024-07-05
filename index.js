require('dotenv').config()

const express = require('express')
const cors = require('cors')

// to connect to MongoDB
const { connectMongoDB } = require('./connect')

// routes
const urlRoutes = require('./routes/url')

const app = express()
// const PORT = 8000

const mongoURI = process.env.MONGOOSE_URI

// connecting MongoDB
connectMongoDB(mongoURI)
.then(() => console.log('Mongo is connected'))

// middleware
app.use(express.json())
app.use(cors())

// routes
app.use('/url', urlRoutes)

// run the server
// app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
module.exports = app