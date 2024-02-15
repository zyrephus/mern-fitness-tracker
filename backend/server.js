require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const exerciseRoutes = require('./routes/exercises')
const userRoutes = require('./routes/user')

// Express app
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/exercises', exerciseRoutes)
app.use('/api/user', userRoutes)

// Connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to database and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })