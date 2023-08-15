const workoutModel = require('../models/workoutModel')
const mongoose = require('mongoose')

// Get all workouts
const getAllWorkouts = async(req,res) => {
    const workoutResult = await workoutModel.find({}).sort({createdAt: -1})
    res.status(200).json(workoutResult)
}

// Get single workouts
const getSingleWorkouts = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such workouts'})
    }

    const workoutResult = await workoutModel.findById(id).sort({createdAt: -1})
    if(!workoutResult) {
        res.status(404).json({error : 'No such workout exists'})
    }
    res.status(200).json(workoutResult)
}

// Create a new workout
const createWorkout = async(req,res) => {
    const {title, load, reps} = req.body;

    try {
        const newWorkout = await workoutModel.create({title, load, reps});
        res.status(200).json(newWorkout);
    } catch (error) {
        res.status(400).json({error : error.message})
    }   
}

// Delete a workout
const deleteWorkout = async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No such workout"})
    }

    try {
        const currWorkout = await workoutModel.findOneAndDelete({_id : id})
        
        if(!currWorkout) {
            res.status(404).json({error : 'No such workout exists'})
        }

        res.status(200).json(currWorkout);

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

// Update a workout
const updateWorkout = async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No such workout"})
    }

    try {
        const currWorkout = await workoutModel.findOneAndUpdate({_id : id}, {...req.body})
        
        if(!currWorkout) {
            res.status(404).json({error : 'No such workout exists'})
        }

        res.status(200).json(currWorkout);

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

module.exports = {createWorkout, getSingleWorkouts, getAllWorkouts, deleteWorkout, updateWorkout }