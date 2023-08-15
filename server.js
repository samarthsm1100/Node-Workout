const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');
require('dotenv').config();


// express app
const app = express();

// middleware
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next();
})

// routes
app.use('/api/workouts',workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGODB)
.then(() => {
    // listen to request
    console.log("Connected to Database")
    app.listen(process.env.PORT, ()=> {
        console.log("Listening on port",process.env.PORT)
    })
})
.catch((err) => console.log(err))

