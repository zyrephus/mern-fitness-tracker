import { ExercisesContext } from '../context/ExerciseContext'
import { useContext } from 'react'

export const useExercisesContext = () => {
    const context = useContext(ExercisesContext)

    if (!context) {
        throw Error('useExercisesContext must be used inside an ExercisesContextProvider.')
    }

    return context
}