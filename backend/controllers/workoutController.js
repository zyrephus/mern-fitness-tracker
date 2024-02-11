const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// Get all workouts
const getWorkouts = async (req, res) => {
    // Finds all workouts and sorts them from latest to first workout created
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// Get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout exists!'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({errro: 'No such workout exists!'})
    }

    res.status(200).json(workout)
}

// Create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    // Add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a workout

// Update a workout

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout
}