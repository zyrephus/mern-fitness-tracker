const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// Get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id

    // Finds all workouts created by the current user and sorts them from latest to first workout created
    const workouts = await Workout.find({ user_id }).sort({createdAt: -1})

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
        return res.status(404).json({error: 'No such workout exists!'})
    }

    res.status(200).json(workout)
}

// Create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps, sets} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(!sets) {
        emptyFields.push('sets')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // Add doc to db
    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, sets, user_id})
        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout exists!'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(400).json({error: 'No such workout exists!'})
    }

    res.status(200).json(workout)
}

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout exists!'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({error: 'No such workout exists!'})
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}