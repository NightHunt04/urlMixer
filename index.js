const express = require('express')

// to connect to MongoDB
const { connectMongoDB } = require('./connect')

// routes
const urlRoutes = require('./routes/url')

const app = express()
// const PORT = 8000

// connecting MongoDB
connectMongoDB(import.meta.env.MONGOOSE_URI)
.then(() => console.log('MongoDB connected!'))

// middleware
app.use(express.json())

// routes
app.use('/url', urlRoutes)

// run the server
// app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
module.exports = app