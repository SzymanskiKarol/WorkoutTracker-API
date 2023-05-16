require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express()

// middlewares
// jeśli request ma body to automatycznie express.json() zamienia je w json i dołącza do request object
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests (zaczyna przyjmować requesty dopiero po połączeinu z bazą)
        app.listen(process.env.PORT, () => {
            console.log('connected to db and server started on port:', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })



