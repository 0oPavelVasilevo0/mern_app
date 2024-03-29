require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const port = process.env.PORT || 4000

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors({
    origin: 'https://mern-app-client-jade.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(port, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    //     app.listen(process.env.PORT, () => { 
    //    console.log('connected to db & listening on port', process.env.PORT)
    //     })
    })
    .catch((error) => {
        console.log(error)
    })