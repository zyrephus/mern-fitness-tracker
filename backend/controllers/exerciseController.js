const Exercise = require('../models/exerciseModel')
const mongoose = require('mongoose')

// Get all exercises
const getExercises = async (req, res) => {
    const user_id = req.user._id

    // Finds all exercises created by the current user and sorts them from latest to first exercise created
    const exercises = await Exercise.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(exercises)
}

// Get a single exercise
const getExercise = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such exercise exists!'})
    }

    const exercise = await Exercise.findById(id)

    if (!exercise) {
        return res.status(404).json({error: 'No such exercise exists!'})
    }

    res.status(200).json(exercise)
}

// Create new exercise
const createExercise = async (req, res) => {
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
        const exercise = await Exercise.create({title, load, reps, sets, user_id})
        res.status(200).json(exercise)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a exercise
const deleteExercise = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such exercise exists!'})
    }

    const exercise = await Exercise.findOneAndDelete({_id: id})

    if (!exercise) {
        return res.status(400).json({error: 'No such exercise exists!'})
    }

    res.status(200).json(exercise)
}

// Update a exercise
const updateExercise = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such exercise exists!'})
    }

    const exercise = await Exercise.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!exercise) {
        return res.status(400).json({error: 'No such exercise exists!'})
    }

    res.status(200).json(exercise)
}

module.exports = {
    getExercises,
    getExercise,
    createExercise,
    deleteExercise,
    updateExercise
}