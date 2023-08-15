const express = require("express")
const router = express.Router();
const workoutModel = require("../models/workoutModel");
const { createWorkout, getSingleWorkouts, getAllWorkouts, deleteWorkout, updateWorkout } = require("../controllers/workoutControllers");

// Get All Workouts
router.get('/', getAllWorkouts)

// Get single workout
router.get('/:id', getSingleWorkouts)

// Post a new workout
router.post('/', createWorkout);

// Delete a workout
router.delete('/:id', deleteWorkout)

// Update a workout
router.patch('/:id', updateWorkout)

module.exports = router