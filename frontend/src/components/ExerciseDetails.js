import { useExercisesContext } from '../hooks/useExercisesContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ExerciseDetails = ({ exercise }) => {
    const { dispatch } = useExercisesContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return 
        }

        const response = await fetch('/api/exercises/' + exercise._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_EXERCISE', payload: json})
        }
    }

    return (
        <div className="exercise-details">
            <h4>{exercise.title}</h4>
            <p><strong>Load (lbs): </strong>{exercise.load}</p>
            <p><strong>Reps: </strong>{exercise.reps}</p>
            <p><strong>Sets: </strong>{exercise.sets}</p>
            <p>{formatDistanceToNow(new Date(exercise.createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default ExerciseDetails