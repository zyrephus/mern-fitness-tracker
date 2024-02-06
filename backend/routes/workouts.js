const express = require('express')

const router = express.Router()

// GET all workouts
router.get('/', (req, res) => {
    res.json({msg: 'GET all workouts'})
})

// Get a single workout
router.get('/:id', (req, res) => {
    res.json({msg: 'GET a single workout'})
})

// POST a new workout
router.post('/', (req, res) => {
    res.json({mes: 'POST a new workout'})
})

// DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({mes: 'DELETE a workout'})
})

// UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({mes: 'UPDATE a workout'})
})

module.exports = router