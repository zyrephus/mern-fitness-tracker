const express = require('express')
const {
    getExercises,
    getExercise,
    createExercise,
    deleteExercise,
    updateExercise
} = require('../controllers/exerciseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Require auth for all exercise routes
router.use(requireAuth)

// GET all exercises
router.get('/', getExercises)

// Get a single workout
router.get('/:id', getExercise)

// POST a new workout
router.post('/', createExercise)

// DELETE a exercise
router.delete('/:id', deleteExercise)

// UPDATE a exercise
router.patch('/:id', updateExercise)

module.exports = router